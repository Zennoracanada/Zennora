-- Zennora Core MVP schema
-- PostgreSQL

create extension if not exists pgcrypto;

create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text not null,
  country_code text not null default 'CA',
  currency_code text not null default 'CAD',
  timezone text not null default 'America/Vancouver',
  default_language text not null default 'en',
  status text not null default 'active' check (status in ('active','paused','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tenant_settings (
  tenant_id uuid primary key references tenants(id) on delete cascade,
  greeting text,
  fallback_message text,
  booking_url text,
  contact_email text,
  notification_email text,
  system_instructions text,
  allowed_topics jsonb not null default '[]'::jsonb,
  handoff_rules jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  source_type text not null check (source_type in ('website','faq','document','manual')),
  source_url text,
  title text not null,
  content text not null,
  content_hash text,
  status text not null default 'active' check (status in ('active','inactive','failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_knowledge_documents_tenant on knowledge_documents(tenant_id);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  visitor_id text,
  channel text not null default 'web',
  status text not null default 'open' check (status in ('open','closed','handoff')),
  locale text,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create index if not exists idx_conversations_tenant on conversations(tenant_id, started_at desc);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null check (role in ('user','assistant','system','tool')),
  content text not null,
  model text,
  input_tokens integer,
  output_tokens integer,
  created_at timestamptz not null default now()
);

create index if not exists idx_messages_conversation on messages(conversation_id, created_at);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  conversation_id uuid references conversations(id) on delete set null,
  name text,
  email text,
  phone text,
  service_interest text,
  preferred_time text,
  notes text,
  source text not null default 'zennora_chat',
  status text not null default 'new' check (status in ('new','contacted','qualified','closed','spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_leads_tenant on leads(tenant_id, created_at desc);

create table if not exists usage_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  conversation_id uuid references conversations(id) on delete set null,
  event_type text not null,
  units numeric not null default 1,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_usage_tenant_time on usage_events(tenant_id, created_at desc);
