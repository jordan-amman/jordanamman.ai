# Terraform Infra

Terraform is the single source of truth for AWS infrastructure in this repo.

## Remote State (Recommended)

1. Bootstrap an S3 state bucket:

```bash
cd ../state-bootstrap
terraform init
terraform apply -var state_bucket_name="YOUR_UNIQUE_BUCKET_NAME"
```

2. Create or update `backend.hcl` in `infra/terraform`:

```bash
cd ../terraform
copy con backend.hcl
```

Paste values like:

```hcl
bucket  = "YOUR_UNIQUE_BUCKET_NAME"
key     = "jordanamman-ai/prod/terraform.tfstate"
region  = "us-east-1"
encrypt = true
```

3. Initialize infra stack with remote state:

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
- Built static site export (`apps/web/out`) when `enable_static_site=true`

## Deploy

```bash
cd ../../
npm run build:api
npm run build:web
cd infra/terraform
terraform init
terraform plan
terraform apply
```

Custom domain deployment example:

```bash
copy terraform.tfvars.example terraform.tfvars
# edit placeholders, especially route53_zone_id if the hosted zone already exists
terraform plan -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

If remote state is configured, always run init with backend config once per clone or config change:

```bash
terraform init -reconfigure -backend-config=backend.hcl
```

Enable static site resources:

```bash
cd ../../
npm run build:web
cd infra/terraform
terraform plan -var enable_static_site=true
terraform apply -var enable_static_site=true
```

For an existing Route 53 hosted zone such as `jordanamman.ai`, use:

```hcl
enable_static_site        = true
enable_custom_domain      = true
create_public_hosted_zone = false
route53_zone_id           = "Z1234567890ABC"
domain_name               = "jordanamman.ai"
```

Terraform will then:

- Request and validate the ACM certificate in `us-east-1`
- Create the CloudFront distribution
- Upload the static export from `apps/web/out` into S3
- Create apex and `www` Route 53 alias records to CloudFront
- Optionally create `api.jordanamman.ai` for the HTTP API

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

1. If the hosted zone already exists in Route 53, keep `create_public_hosted_zone=false` and do not create a second zone.
2. In the registrar, confirm the domain uses the four Route 53 name servers shown on that hosted zone.
3. Wait for DNS propagation, then verify records resolve.

## Cost Notes

- Baseline deploy is serverless/pay-per-use.
- Keep `enable_static_site=false` if you want to delay CloudFront costs.
- DynamoDB uses `PAY_PER_REQUEST` for low idle spend.
