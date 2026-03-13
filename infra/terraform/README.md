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
- Optional custom domain stack (Route 53 + ACM in `us-east-1`)

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

Custom domain deployment example:

```bash
copy terraform.tfvars.example terraform.tfvars
# edit placeholders
terraform plan -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
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

## Custom Domain Notes

- CloudFront requires ACM certificates in `us-east-1`.
- This stack provisions ACM in `us-east-1` via provider alias when `enable_custom_domain=true` and `enable_static_site=true`.
- If `create_public_hosted_zone=true`, Terraform creates the Route 53 zone and outputs name servers.
- If you already have a zone, set `create_public_hosted_zone=false` and provide `route53_zone_id`.

### DNS Records Created By Terraform

When enabled, Terraform creates:

- `A` alias: `jordanamman.ai` -> CloudFront
- `AAAA` alias: `jordanamman.ai` -> CloudFront
- `A` alias: `www.jordanamman.ai` -> CloudFront (if `create_www_record=true`)
- `AAAA` alias: `www.jordanamman.ai` -> CloudFront (if `create_www_record=true`)
- `CNAME`: `api.jordanamman.ai` -> API Gateway endpoint (if `create_api_record=true`)

### Squarespace -> Route 53 Nameserver Cutover

If the domain is registered at Squarespace and the hosted zone is in Route 53:

1. Create/apply Terraform with `create_public_hosted_zone=true`.
2. Copy `hosted_zone_name_servers` output values.
3. Update nameservers in Squarespace to those Route 53 NS values.
4. Wait for DNS propagation, then verify records resolve.

## Cost Notes

- Baseline deploy is serverless/pay-per-use.
- Keep `enable_static_site=false` if you want to delay CloudFront costs.
- DynamoDB uses `PAY_PER_REQUEST` for low idle spend.
