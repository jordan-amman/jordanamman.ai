output "api_base_url" {
  description = "Base URL for HTTP API routes."
  value       = aws_apigatewayv2_api.http_api.api_endpoint
}

output "contact_table_name" {
  description = "DynamoDB table storing contact requests."
  value       = aws_dynamodb_table.contact_requests.name
}

output "site_bucket_name" {
  description = "S3 bucket for static site assets (if enabled)."
  value       = var.enable_static_site ? aws_s3_bucket.site[0].bucket : null
}

output "cloudfront_domain_name" {
  description = "CloudFront domain for static site (if enabled)."
  value       = var.enable_static_site ? aws_cloudfront_distribution.site[0].domain_name : null
}

output "hosted_zone_id" {
  description = "Route 53 hosted zone ID used for custom domain records."
  value = var.enable_custom_domain ? (
    var.create_public_hosted_zone ? aws_route53_zone.public[0].zone_id : data.aws_route53_zone.existing[0].zone_id
  ) : null
}

output "hosted_zone_name_servers" {
  description = "Route 53 name servers (only when creating a new public hosted zone)."
  value       = var.enable_custom_domain && var.create_public_hosted_zone ? aws_route53_zone.public[0].name_servers : null
}

output "site_certificate_arn" {
  description = "ACM certificate ARN in us-east-1 for CloudFront (if custom domain is enabled)."
  value       = var.enable_static_site && var.enable_custom_domain ? aws_acm_certificate_validation.site[0].certificate_arn : null
}

output "website_fqdn" {
  description = "Primary website domain when custom domain is enabled."
  value       = var.enable_static_site && var.enable_custom_domain ? var.domain_name : null
}

output "website_www_fqdn" {
  description = "WWW website domain when create_www_record is enabled."
  value       = var.enable_static_site && var.enable_custom_domain && var.create_www_record ? "www.${var.domain_name}" : null
}

output "api_fqdn" {
  description = "API CNAME domain when create_api_record is enabled."
  value       = var.enable_custom_domain && var.create_api_record ? "${var.api_subdomain}.${var.domain_name}" : null
}
