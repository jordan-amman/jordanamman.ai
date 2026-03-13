# jordanamman.ai

AI systems portfolio platform for showcasing production-minded projects:

- RAG systems
- Agent workflows
- LLM evaluation experiments
- AI infrastructure writeups
- Hire/contact funnel

This repo is optimized for a low-cost AWS footprint while still demonstrating enterprise architecture decisions.

## Monorepo Structure

```text
jordanamman.ai/
├── apps/
│   ├── web/                 # Next.js portfolio frontend
│   └── api/                 # Node.js Lambda handlers (deployed via Terraform)
├── packages/
│   └── shared/              # Shared types/constants
├── services/
│   ├── rag-pipeline/        # RAG ingestion/query design notes and stubs
│   └── agents/              # Agent architecture notes and stubs
├── docs/
│   ├── architecture/        # AWS architecture and cost model
│   └── roadmap/             # Portfolio project roadmap
└── experiments/             # Fast iteration area for model/eval notebooks/scripts
```

## Quick Start

1. Install dependencies from repo root:

```bash
npm install
```

2. Run the frontend:

```bash
npm run dev:web
```

Local app URL: `http://localhost:3000` (or next available port).

3. Build the Lambda API package:

```bash
npm run build:api
```

## Deploy Infra With Terraform

From repo root:

```bash
npm run build:api
cd infra/terraform
terraform init
terraform plan
terraform apply
```

### Configure Remote State (S3 + DynamoDB)

Bootstrap shared state resources first:

```bash
cd infra/state-bootstrap
terraform init
terraform apply -var state_bucket_name="YOUR_UNIQUE_BUCKET_NAME"
```

Then configure infra backend:

```bash
cd ../terraform
copy backend.hcl.example backend.hcl
# edit backend.hcl with bucket/table values
terraform init -reconfigure -backend-config=backend.hcl
terraform plan
terraform apply
```

Use `-var enable_static_site=true` when you want Terraform to also provision S3 + CloudFront for static hosting.

## CI/CD

GitHub Actions workflow is configured at `.github/workflows/ci.yml` and runs:

- gitleaks secret scan
- Node install + typecheck + web build + API build
- Terraform `fmt`, `init -backend=false`, and `validate` for both infra stacks

Why this is the default now:

- Public repo means GitHub Actions is typically free for this workflow shape
- Faster setup and easier contributor visibility than full CodeBuild/CodePipeline upfront

When to consider AWS CodeBuild/CodePipeline later:

- strict AWS IAM-only control plane requirements
- private networking and VPC-bound build execution
- centralized enterprise compliance controls in AWS

## Secret Scanning

Current protection layers:

- CI scan on `push` and `pull_request` via gitleaks in GitHub Actions
- Local pre-commit scan (optional but recommended)

Enable local pre-commit hook:

```bash
git config core.hooksPath .githooks
```

Install local gitleaks binary (Windows):

```bash
winget install Gitleaks.Gitleaks
```

Run manual secret scan anytime:

```bash
npm run scan:secrets
```

## Deployment Direction (Cost-First)

- Frontend: Next.js static export or ISR via CloudFront + S3
- API: API Gateway HTTP API + Lambda (pay-per-use)
- Contact capture: DynamoDB on-demand + SES notification
- RAG prototype: S3 + scheduled embedding job + lightweight vector store path

See `docs/architecture/aws-reference-architecture.md` for full details.

## Phase Plan

1. Phase 1: Portfolio + contact API + one flagship RAG demo
2. Phase 2: Agent project demo + eval dashboard
3. Phase 3: Multi-tenant capability, observability, and deeper infra writeups
