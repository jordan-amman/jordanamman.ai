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
