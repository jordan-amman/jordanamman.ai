locals {
  name_prefix = "${var.project_name}-${var.environment}"

  tags = merge(
    {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
    },
    var.common_tags
  )

  hosted_zone_id = var.enable_custom_domain ? (
    var.create_public_hosted_zone ? aws_route53_zone.public[0].zone_id : data.aws_route53_zone.existing[0].zone_id
  ) : null

  site_build_dir = abspath("${path.module}/${var.site_build_dir}")
  site_files     = var.enable_static_site ? fileset(local.site_build_dir, "**") : []

  mime_types = {
    css   = "text/css; charset=utf-8"
    gif   = "image/gif"
    html  = "text/html; charset=utf-8"
    ico   = "image/x-icon"
    jpeg  = "image/jpeg"
    jpg   = "image/jpeg"
    js    = "application/javascript; charset=utf-8"
    json  = "application/json; charset=utf-8"
    map   = "application/json; charset=utf-8"
    png   = "image/png"
    svg   = "image/svg+xml"
    txt   = "text/plain; charset=utf-8"
    webp  = "image/webp"
    woff  = "font/woff"
    woff2 = "font/woff2"
    xml   = "application/xml; charset=utf-8"
  }
}

data "aws_caller_identity" "current" {}

resource "aws_route53_zone" "public" {
  count = var.enable_custom_domain && var.create_public_hosted_zone ? 1 : 0

  name = var.domain_name
  tags = local.tags
}

data "aws_route53_zone" "existing" {
  count = var.enable_custom_domain && !var.create_public_hosted_zone ? 1 : 0

  zone_id      = var.route53_zone_id
  private_zone = false
}

data "archive_file" "api_bundle" {
  type        = "zip"
  source_dir  = var.api_bundle_source_dir
  output_path = "${path.module}/.artifacts/api-bundle.zip"
}

resource "aws_dynamodb_table" "contact_requests" {
  name         = "${local.name_prefix}-contact-requests"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = local.tags
}

resource "aws_iam_role" "lambda_exec" {
  name = "${local.name_prefix}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = local.tags
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "${local.name_prefix}-lambda-policy"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:*"
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:GetItem"
        ]
        Resource = aws_dynamodb_table.contact_requests.arn
      },
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "arn:aws:ses:${var.aws_region}:${data.aws_caller_identity.current.account_id}:identity/${var.domain_name}"
      }
    ]
  })
}

resource "aws_lambda_function" "health" {
  function_name    = "${local.name_prefix}-health"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "nodejs20.x"
  handler          = "handlers/health.handler"
  filename         = data.archive_file.api_bundle.output_path
  source_code_hash = data.archive_file.api_bundle.output_base64sha256
  memory_size      = var.lambda_memory_size
  timeout          = var.lambda_timeout_seconds

  environment {
    variables = {
      CONTACT_TABLE_NAME = aws_dynamodb_table.contact_requests.name
    }
  }

  tags = local.tags
}

resource "aws_lambda_function" "contact" {
  function_name    = "${local.name_prefix}-contact"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "nodejs20.x"
  handler          = "handlers/contact.handler"
  filename         = data.archive_file.api_bundle.output_path
  source_code_hash = data.archive_file.api_bundle.output_base64sha256
  memory_size      = var.lambda_memory_size
  timeout          = var.lambda_timeout_seconds

  environment {
    variables = {
      CONTACT_TABLE_NAME = aws_dynamodb_table.contact_requests.name
      SES_FROM_EMAIL     = "hello@${var.domain_name}"
      NOTIFICATION_EMAIL = "hello@${var.domain_name}"
    }
  }

  tags = local.tags
}

resource "aws_apigatewayv2_api" "http_api" {
  name          = "${local.name_prefix}-http-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_origins = ["*"]
    allow_headers = ["content-type"]
    max_age       = 300
  }

  tags = local.tags
}

resource "aws_apigatewayv2_integration" "health" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = aws_lambda_function.health.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_integration" "contact" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = aws_lambda_function.contact.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "health" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /health"
  target    = "integrations/${aws_apigatewayv2_integration.health.id}"
}

resource "aws_apigatewayv2_route" "contact" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 20
    throttling_rate_limit  = 10
  }

  tags = local.tags
}

resource "aws_lambda_permission" "allow_apigw_health" {
  statement_id  = "AllowInvokeFromHttpApiHealth"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.health.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "allow_apigw_contact" {
  statement_id  = "AllowInvokeFromHttpApiContact"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

resource "aws_s3_bucket" "site" {
  count  = var.enable_static_site ? 1 : 0
  bucket = "${local.name_prefix}-site"

  tags = local.tags
}

resource "aws_s3_bucket_public_access_block" "site" {
  count  = var.enable_static_site ? 1 : 0
  bucket = aws_s3_bucket.site[0].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_identity" "site" {
  count   = var.enable_static_site ? 1 : 0
  comment = "${local.name_prefix}-oai"
}

resource "aws_cloudfront_function" "site_rewrite" {
  count   = var.enable_static_site ? 1 : 0
  name    = "${local.name_prefix}-site-rewrite"
  runtime = "cloudfront-js-1.0"
  publish = true
  comment = "Rewrite clean URLs to exported index.html assets."

  code = <<-EOF
  function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (uri === "/") {
      request.uri = "/index.html";
      return request;
    }

    if (uri.endsWith("/")) {
      request.uri += "index.html";
      return request;
    }

    if (!uri.includes(".")) {
      request.uri += "/index.html";
    }

    return request;
  }
  EOF
}

data "aws_iam_policy_document" "site_bucket_policy" {
  count = var.enable_static_site ? 1 : 0

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site[0].arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.site[0].iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  count  = var.enable_static_site ? 1 : 0
  bucket = aws_s3_bucket.site[0].id
  policy = data.aws_iam_policy_document.site_bucket_policy[0].json
}

resource "aws_s3_object" "site_assets" {
  for_each = var.enable_static_site ? { for file in local.site_files : file => file } : {}

  bucket = aws_s3_bucket.site[0].id
  key    = each.value
  source = "${local.site_build_dir}/${each.value}"
  etag   = filemd5("${local.site_build_dir}/${each.value}")

  content_type = lookup(local.mime_types, lower(element(reverse(split(".", each.value)), 0)), null)
  cache_control = endswith(each.value, ".html") ? "public, max-age=0, must-revalidate" : (
    startswith(each.value, "_next/") ? "public, max-age=31536000, immutable" : "public, max-age=86400"
  )

  depends_on = [aws_s3_bucket_public_access_block.site]
}

resource "aws_cloudfront_distribution" "site" {
  count = var.enable_static_site ? 1 : 0

  enabled             = true
  default_root_object = "index.html"
  aliases = var.enable_custom_domain ? (
    var.create_www_record ? [var.domain_name, "www.${var.domain_name}"] : [var.domain_name]
  ) : []

  origin {
    domain_name = aws_s3_bucket.site[0].bucket_regional_domain_name
    origin_id   = "site-s3-origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.site[0].cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    target_origin_id       = "site-s3-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 31536000

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.site_rewrite[0].arn
    }

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 0
  }

  dynamic "viewer_certificate" {
    for_each = var.enable_custom_domain ? [1] : []

    content {
      acm_certificate_arn      = aws_acm_certificate_validation.site[0].certificate_arn
      ssl_support_method       = "sni-only"
      minimum_protocol_version = "TLSv1.2_2021"
    }
  }

  dynamic "viewer_certificate" {
    for_each = var.enable_custom_domain ? [] : [1]

    content {
      cloudfront_default_certificate = true
    }
  }

  tags = local.tags

  depends_on = [aws_s3_object.site_assets]
}

resource "aws_acm_certificate" "site" {
  count    = var.enable_static_site && var.enable_custom_domain ? 1 : 0
  provider = aws.us_east_1

  domain_name       = var.domain_name
  validation_method = "DNS"
  subject_alternative_names = var.create_www_record ? [
    "www.${var.domain_name}"
  ] : []

  lifecycle {
    create_before_destroy = true
  }

  tags = local.tags
}

resource "aws_route53_record" "cert_validation" {
  for_each = var.enable_static_site && var.enable_custom_domain ? {
    for dvo in aws_acm_certificate.site[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  } : {}

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = local.hosted_zone_id
}

resource "aws_acm_certificate_validation" "site" {
  count    = var.enable_static_site && var.enable_custom_domain ? 1 : 0
  provider = aws.us_east_1

  certificate_arn         = aws_acm_certificate.site[0].arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

resource "aws_route53_record" "site_apex_a" {
  count = var.enable_static_site && var.enable_custom_domain ? 1 : 0

  zone_id = local.hosted_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site[0].domain_name
    zone_id                = aws_cloudfront_distribution.site[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_apex_aaaa" {
  count = var.enable_static_site && var.enable_custom_domain ? 1 : 0

  zone_id = local.hosted_zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site[0].domain_name
    zone_id                = aws_cloudfront_distribution.site[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_www_a" {
  count = var.enable_static_site && var.enable_custom_domain && var.create_www_record ? 1 : 0

  zone_id = local.hosted_zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site[0].domain_name
    zone_id                = aws_cloudfront_distribution.site[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_www_aaaa" {
  count = var.enable_static_site && var.enable_custom_domain && var.create_www_record ? 1 : 0

  zone_id = local.hosted_zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site[0].domain_name
    zone_id                = aws_cloudfront_distribution.site[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "api_cname" {
  count = var.enable_custom_domain && var.create_api_record ? 1 : 0

  zone_id = local.hosted_zone_id
  name    = "${var.api_subdomain}.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_apigatewayv2_domain_name.api[0].domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api[0].domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

# ── API Gateway custom domain (proper TLS for api.jordanamman.ai) ──────────────

resource "aws_acm_certificate" "api" {
  count             = var.enable_custom_domain && var.create_api_record ? 1 : 0
  domain_name       = "${var.api_subdomain}.${var.domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "api_cert_validation" {
  for_each = var.enable_custom_domain && var.create_api_record ? {
    for dvo in aws_acm_certificate.api[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  } : {}

  zone_id = local.hosted_zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "api" {
  count                   = var.enable_custom_domain && var.create_api_record ? 1 : 0
  certificate_arn         = aws_acm_certificate.api[0].arn
  validation_record_fqdns = [for record in aws_route53_record.api_cert_validation : record.fqdn]
}

resource "aws_apigatewayv2_domain_name" "api" {
  count       = var.enable_custom_domain && var.create_api_record ? 1 : 0
  domain_name = "${var.api_subdomain}.${var.domain_name}"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate_validation.api[0].certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  tags = local.tags
}

resource "aws_apigatewayv2_api_mapping" "api" {
  count       = var.enable_custom_domain && var.create_api_record ? 1 : 0
  api_id      = aws_apigatewayv2_api.http_api.id
  domain_name = aws_apigatewayv2_domain_name.api[0].id
  stage       = aws_apigatewayv2_stage.default.id
}

