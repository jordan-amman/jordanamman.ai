# API (Lambda Handlers)

This package contains TypeScript Lambda handlers used by the Terraform stack.

## Build

```bash
npm run build --workspace @jordan/api
```

Build output goes to `apps/api/dist` and is zipped by Terraform using the `archive` provider.

## Handlers

- `handlers/health.handler` -> `GET /health`
- `handlers/contact.handler` -> `POST /contact`

## Deploy

Use the Terraform stack at `infra/terraform`.
