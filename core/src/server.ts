import Fastify from 'fastify';
import cors from '@fastify/cors';
import { Pool } from 'pg';

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;

app.get('/health', async () => ({
  ok: true,
  service: 'zennora-core',
  version: '0.1.0'
}));

app.get('/v1/tenants/:tenantId/config', async (request, reply) => {
  if (!pool) return reply.code(503).send({ error: 'DATABASE_URL is not configured' });

  const { tenantId } = request.params as { tenantId: string };
  const result = await pool.query(
    `select t.id, t.name, t.industry, t.country_code, t.currency_code, t.timezone,
            t.default_language, ts.greeting, ts.fallback_message, ts.booking_url
       from tenants t
       left join tenant_settings ts on ts.tenant_id = t.id
      where t.id = $1 and t.status = 'active'`,
    [tenantId]
  );

  if (result.rowCount === 0) return reply.code(404).send({ error: 'Tenant not found' });
  return result.rows[0];
});

app.post('/v1/chat', async (request, reply) => {
  const body = request.body as {
    tenantId?: string;
    conversationId?: string;
    message?: string;
  };

  if (!body.tenantId || !body.message?.trim()) {
    return reply.code(400).send({ error: 'tenantId and message are required' });
  }

  // AI provider and RAG adapter will be connected in the next implementation step.
  return {
    conversationId: body.conversationId ?? null,
    reply: 'Zennora Core is connected. The AI response engine is the next module to be enabled.',
    handoff: false
  };
});

app.post('/v1/leads', async (request, reply) => {
  if (!pool) return reply.code(503).send({ error: 'DATABASE_URL is not configured' });

  const body = request.body as {
    tenantId?: string;
    conversationId?: string;
    name?: string;
    email?: string;
    phone?: string;
    serviceInterest?: string;
    preferredTime?: string;
    notes?: string;
  };

  if (!body.tenantId) return reply.code(400).send({ error: 'tenantId is required' });

  const result = await pool.query(
    `insert into leads
      (tenant_id, conversation_id, name, email, phone, service_interest, preferred_time, notes)
     values ($1,$2,$3,$4,$5,$6,$7,$8)
     returning id, created_at`,
    [
      body.tenantId,
      body.conversationId ?? null,
      body.name ?? null,
      body.email ?? null,
      body.phone ?? null,
      body.serviceInterest ?? null,
      body.preferredTime ?? null,
      body.notes ?? null
    ]
  );

  return reply.code(201).send(result.rows[0]);
});

const port = Number(process.env.PORT ?? 3000);
await app.listen({ port, host: '0.0.0.0' });
