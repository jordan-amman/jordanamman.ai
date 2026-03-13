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
