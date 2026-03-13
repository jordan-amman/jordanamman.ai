variable "aws_region" {
  description = "AWS region for deployment."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project slug used for resource names."
  type        = string
  default     = "jordanamman-ai"
}

variable "environment" {
  description = "Environment name used in tags and names."
  type        = string
  default     = "dev"
}

variable "common_tags" {
  description = "Additional tags to apply to resources."
  type        = map(string)
  default     = {}
}

variable "lambda_memory_size" {
  description = "Lambda memory in MB."
  type        = number
  default     = 256
}

variable "lambda_timeout_seconds" {
  description = "Lambda timeout in seconds."
  type        = number
  default     = 10
}

variable "api_bundle_source_dir" {
  description = "Path to the built API dist directory."
  type        = string
  default     = "../../apps/api/dist"
}

variable "enable_static_site" {
  description = "Whether to deploy S3 + CloudFront static site resources."
  type        = bool
  default     = false
}

variable "enable_custom_domain" {
  description = "Whether to configure Route 53 + ACM for custom domain on CloudFront."
  type        = bool
  default     = false
}

variable "domain_name" {
  description = "Root domain name for website and records (for example, jordanamman.ai)."
  type        = string
  default     = "jordanamman.ai"
}

variable "create_public_hosted_zone" {
  description = "Create a new public Route 53 hosted zone for domain_name."
  type        = bool
  default     = false
}

variable "route53_zone_id" {
  description = "Existing public Route 53 hosted zone ID. Required when create_public_hosted_zone=false and enable_custom_domain=true."
  type        = string
  default     = ""
}

variable "create_www_record" {
  description = "Create www alias records for CloudFront."
  type        = bool
  default     = true
}

variable "create_api_record" {
  description = "Create api subdomain CNAME to API Gateway endpoint."
  type        = bool
  default     = true
}

variable "api_subdomain" {
  description = "Subdomain label for API record."
  type        = string
  default     = "api"
}
