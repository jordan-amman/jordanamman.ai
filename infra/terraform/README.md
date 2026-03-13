# Terraform Infra

Terraform is the single source of truth for AWS infrastructure in this repo.

## Remote State (Recommended)

1. Bootstrap a state bucket + lock table:

```bash
cd ../state-bootstrap
terraform init
terraform apply -var state_bucket_name="YOUR_UNIQUE_BUCKET_NAME"
```

2. Create a backend config from example:

```bash
cd ../terraform
copy backend.hcl.example backend.hcl
```

3. Edit `backend.hcl` with your bucket/table values.

4. Initialize infra stack with remote state:

```bash
terraform init -reconfigure -backend-config=backend.hcl
```

## What It Deploys

- API Gateway HTTP API
- Lambda functions (`health`, `contact`)
- DynamoDB on-demand table (contact requests)
- Optional static site stack (S3 + CloudFront)

## Prereqs

- Terraform `>= 1.6`
- AWS credentials configured in your shell
- Built API bundle (`apps/api/dist`)

## Deploy

```bash
cd ../../
npm run build:api
cd infra/terraform
terraform init
terraform plan
terraform apply
```

If remote state is configured, always run init with backend config once per clone or config change:

```bash
terraform init -reconfigure -backend-config=backend.hcl
```

Enable static site resources:

```bash
terraform plan -var enable_static_site=true
terraform apply -var enable_static_site=true
```

## Cost Notes

- Baseline deploy is serverless/pay-per-use.
- Keep `enable_static_site=false` if you want to delay CloudFront costs.
- DynamoDB uses `PAY_PER_REQUEST` for low idle spend.
