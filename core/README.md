# Zennora Core

Proprietary multi-tenant AI receptionist backend for Zennora.

## Goal

One Zennora engine serves many businesses while keeping each clinic/business completely isolated by `tenant_id`.

The first MVP supports:

- Tenant configuration
- AI chat endpoint
- Knowledge retrieval interface
- Lead capture
- Conversation/message persistence
- Usage tracking
- Human handoff
- Canada/India localization (currency, timezone, language)

## Architecture

```text
Website widget
     |
     v
Zennora API
     |
     +-- Tenant config
     +-- Knowledge retrieval
     +-- AI provider
     +-- Lead capture
     +-- Notifications
     +-- Usage metering
     |
     v
PostgreSQL
```

## Planned production stack

- TypeScript + Node.js
- Fastify API
- PostgreSQL
- Provider-neutral AI adapter
- Vector search/RAG layer
- Hosted widget on `app.zennora.ca`
- Admin dashboard

## Tenant isolation

Every tenant-owned table contains `tenant_id`. Production queries must scope data by authenticated tenant context. Never expose a cross-tenant query through a public endpoint.

## MVP API

- `GET /health`
- `POST /v1/chat`
- `POST /v1/leads`
- `GET /v1/tenants/:tenantId/config`

The current implementation is a foundation only; production authentication, rate limiting, provider credentials and deployment must be added before handling real customer data.
