variable "aws_region" {
  description = "AWS region for Terraform state resources."
  type        = string
  default     = "us-east-1"
}

variable "state_bucket_name" {
  description = "Globally unique S3 bucket name for Terraform state."
  type        = string
}

variable "lock_table_name" {
  description = "DynamoDB table name for Terraform state locks."
  type        = string
  default     = "terraform-state-locks"
}

variable "common_tags" {
  description = "Tags applied to state resources."
  type        = map(string)
  default     = {}
}
