# AWS Reference Architecture (Cost-Efficient Enterprise Pattern)

## Goal

Build `jordanamman.ai` as a public AI portfolio platform that demonstrates principal-level architecture thinking while keeping baseline monthly cost low.

## High-Level Architecture

```text
Users
  -> CloudFront
     -> S3 (static Next.js export) or Next.js host
  -> API Gateway HTTP API
     -> Lambda (contact, health, project metadata)
     -> DynamoDB (contact + project telemetry)
     -> S3 (artifacts, docs, datasets)

RAG/Agent Jobs (event-driven)
  -> EventBridge Scheduler
  -> Lambda (ingest, chunk, embed, eval)
  -> Vector store (phase-based: OpenSearch Serverless or managed external)

Observability
  -> CloudWatch Logs + metrics + alarms
```

## Why This Design

- Pay-per-use first: API Gateway HTTP + Lambda + DynamoDB on-demand avoids idle compute.
- Controlled complexity: keeps architecture interview-ready while practical for solo operation.
- Evolvable: paths for ECS/Fargate and Bedrock are clear if load or complexity increases.

## Cost Baseline (Prototype/Portfolio Traffic)

Assumptions: low public traffic, a few demos, and occasional ingestion jobs.

- CloudFront + S3 static hosting: low single-digit to low double-digit USD
- API Gateway + Lambda + DynamoDB on-demand: low single-digit USD (often near free-tier range)
- CloudWatch logs/alarms: low single-digit USD if retention is trimmed
- Optional vector store: biggest variable (delay until needed)

Expected baseline: approximately `10-35 USD/month` without always-on vector DB.

## Cost Controls

- Default to static generation for content pages.
- Keep Lambdas at 256 MB and short timeouts; profile before increasing.
- Set log retention (7-14 days) and remove noisy debug logs.
- Use DynamoDB TTL for transient contact/enrichment records.
- Schedule ingestion/evaluation jobs during low-frequency windows.
- Introduce caching (CloudFront and application-level) before scaling compute.

## Security and Governance

- Use AWS WAF only when traffic justifies it.
- Add rate limits on API Gateway routes.
- Keep secrets in AWS Secrets Manager or SSM Parameter Store.
- Tag resources by environment and project for cost attribution.

## Delivery Stages

1. Stage 1: Static web + contact API + one RAG demo page.
2. Stage 2: Add ingestion Lambda and vector retrieval API.
3. Stage 3: Add agent workflow orchestration and evaluation pipelines.
