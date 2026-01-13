# AI Answering Service - Technical Specification & Product Requirements Document

**Version:** 1.0
**Date:** January 12, 2026
**Author:** Nicholas Horton (Data Scientist)
**Status:** MVP Ready for Development

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture](#2-system-architecture)
3. [Technical Stack Details](#3-technical-stack-details)
4. [Database Schema](#4-database-schema)
5. [API Design](#5-api-design)
6. [Feature Specifications](#6-feature-specifications)
7. [Implementation Roadmap](#7-implementation-roadmap)
8. [Deployment Strategy](#8-deployment-strategy)
9. [Security and Compliance](#9-security-and-compliance)
10. [Cost Projections](#10-cost-projections)
11. [Risk Assessment](#11-risk-assessment)
12. [Testing and Quality Assurance](#12-testing-and-quality-assurance)

---

## 1. Executive Summary

### 1.1 Project Overview

**AI Answering Service** is a multi-tenant SaaS platform that provides 24/7 AI-powered phone answering services for small service businesses (HVAC, garage door repair, plumbing, locksmiths, etc.). The platform leverages conversational AI to answer calls, qualify leads, capture information, and route qualified prospects to business owners.

**Target Market:** Small service businesses with 200-500 monthly calls requiring after-hours coverage and lead qualification.

**Founder Background:** Nicholas Horton brings data science expertise and JavaScript development experience, enabling rapid MVP development with a strong technical foundation.

### 1.2 Business Objectives

**Primary Objectives:**
- Launch MVP in 2-4 weeks with core call handling and lead capture functionality
- Acquire 30-40 clients within 6 months
- Reach $500K annual recurring revenue (ARR) by month 6
- Maintain 80%+ gross margins after infrastructure costs
- Achieve 90%+ client retention rate through exceptional service quality

**Success Metrics:**
- **Call Answer Rate:** 99%+ of incoming calls answered within 3 rings
- **Lead Quality Score:** 85%+ of captured leads meet client qualification criteria
- **Call Completion Rate:** 95%+ of calls successfully processed without technical failures
- **Client Satisfaction (NPS):** 50+ Net Promoter Score
- **System Uptime:** 99.5%+ availability (max 3.6 hours downtime/month)

### 1.3 Revenue Model

**Pricing Structure:**
- **Setup Fee:** $2,000 per client (one-time)
- **Monthly Subscription:** $497/month (includes 300 calls)
- **Performance Bonus:** $50 per qualified lead delivered
- **Overage Pricing:** $1.50 per call beyond 300/month

**Revenue Projections:**
| Month | Clients | Setup Fees | Recurring | Est. Bonuses | Total Revenue |
|-------|---------|------------|-----------|--------------|---------------|
| 1-2   | 5       | $10,000    | $2,485    | $1,250       | $13,735       |
| 3     | 15      | $20,000    | $7,455    | $3,750       | $31,205       |
| 6     | 35      | $40,000    | $17,395   | $8,750       | $66,145       |
| 12    | 60      | $50,000    | $29,820   | $15,000      | $94,820       |

**Assumptions:**
- 5 clients in first 2 months, 10 additional by month 3, 20 by month 6
- Average 5 qualified leads per client per month (conservative)
- 90% retention rate

### 1.4 Key Differentiators

1. **Niche Focus:** Specialized for service businesses with custom qualification workflows per industry
2. **Performance-Based Pricing:** Bonus structure aligns incentives with client success
3. **Rapid Setup:** 24-48 hour onboarding vs. weeks for competitors
4. **Transparent Pricing:** All-inclusive pricing with no hidden costs
5. **Full Ownership:** Built on open standards, no vendor lock-in

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────┐         ┌──────────────────┐                  │
│  │  Service Business│         │  Admin Dashboard │                  │
│  │  Owner Dashboard │         │  (Nicholas)      │                  │
│  │  (React UI)      │         │  (React UI)      │                  │
│  └────────┬─────────┘         └────────┬─────────┘                  │
│           │                            │                             │
└───────────┼────────────────────────────┼─────────────────────────────┘
            │                            │
            │         HTTPS/WSS          │
            │                            │
┌───────────▼────────────────────────────▼─────────────────────────────┐
│                      APPLICATION LAYER                                │
│                    (Next.js 15 App Router)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    API Routes (Serverless)                    │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │  │
│  │  │ Auth Routes  │  │ Webhook      │  │ Client Dashboard │   │  │
│  │  │ (Clerk)      │  │ Handlers     │  │ API              │   │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Server Components                          │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │  │
│  │  │ Multi-Tenant │  │ Lead         │  │ Analytics        │   │  │
│  │  │ Context      │  │ Management   │  │ Engine           │   │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
└───────────┬─────────────────────────────────────────────────────────┘
            │
            │         PostgreSQL Protocol
            │
┌───────────▼─────────────────────────────────────────────────────────┐
│                       DATA LAYER                                      │
│                    (Supabase PostgreSQL)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              Row-Level Security (RLS) Policies                │  │
│  │    ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │    │ Tenants      │  │ Calls        │  │ Leads           │  │  │
│  │    │ (clients)    │  │ (per tenant) │  │ (per tenant)    │  │  │
│  │    └──────────────┘  └──────────────┘  └─────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Realtime Subscriptions                     │  │
│  │           (for live call updates & notifications)             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      VOICE LAYER                                      │
│                      (Retell AI)                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐     │
│  │ Phone Numbers│───▶│ AI Voice     │───▶│ Webhook Events   │     │
│  │ (per client) │    │ Agents       │    │ (to Next.js API) │     │
│  │              │    │ (GPT-4)      │    │                  │     │
│  └──────────────┘    └──────────────┘    └──────────────────┘     │
│                                                                       │
│  Features: Sub-second latency, natural conversations,               │
│           qualification workflows, lead capture                      │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    INTEGRATION LAYER                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐     │
│  │ Email        │    │ SMS          │    │ CRM Webhooks     │     │
│  │ (Resend)     │    │ (Twilio)     │    │ (Make.com/Zapier)│     │
│  └──────────────┘    └──────────────┘    └──────────────────┘     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Multi-Tenant Isolation Strategy

**Strategy:** Shared Database with Row-Level Security (RLS)

This approach provides the optimal balance of simplicity, security, and cost-effectiveness for 30-60 clients.

**Why This Strategy:**

1. **Cost Efficiency:** Single database instance serves all tenants ($25-50/month vs. $25/client for separate databases)
2. **Operational Simplicity:** One schema to manage, one set of migrations, centralized backups
3. **Database-Level Security:** PostgreSQL RLS enforces isolation at the database level, not application level
4. **Proven Pattern:** Successfully used by companies serving thousands of tenants (e.g., [Multi-Tenant Applications with RLS on Supabase](https://www.antstack.com/blog/multi-tenant-applications-with-rls-on-supabase-postgress/))
5. **Performance:** With proper indexing, supports hundreds of concurrent users per tenant

**Implementation Details:**

```sql
-- Example RLS Policy for calls table
CREATE POLICY "Users can only access their tenant's calls"
ON calls
FOR ALL
USING (
  tenant_id = (
    SELECT tenant_id FROM user_profiles
    WHERE user_id = auth.uid()
  )
);

-- Indexes for performance
CREATE INDEX idx_calls_tenant_id ON calls(tenant_id);
CREATE INDEX idx_calls_tenant_created ON calls(tenant_id, created_at DESC);
```

**Alternative Strategies Considered:**

| Strategy | Pros | Cons | Verdict |
|----------|------|------|---------|
| **Separate Databases** | Maximum isolation | $25-50/client, complex management | Overkill for MVP |
| **Separate Schemas** | Good isolation | Complex migrations, higher overhead | Unnecessary complexity |
| **App-Level Filtering** | Simple to implement | Easy to introduce bugs, no DB-level security | Too risky |
| **Shared Tables + RLS** ✅ | Best balance | Requires careful policy design | **Chosen approach** |

### 2.3 Data Flow Diagrams

#### 2.3.1 Inbound Call Flow

```
┌──────────┐
│  Caller  │
└────┬─────┘
     │
     │ 1. Dials client's phone number
     ▼
┌─────────────────┐
│   Retell AI     │
│  (Phone System) │
└────┬────────────┘
     │
     │ 2. Routes to AI agent for that tenant
     ▼
┌─────────────────┐
│  AI Voice Agent │ ──────┐
│   (GPT-4 based) │       │ 3. Executes qualification workflow
└────┬────────────┘       │    (configured per tenant)
     │                    │
     │                    │
     ▼                    ▼
┌──────────────────────────────┐
│  Qualification Questions     │
│  - Service type needed       │
│  - Location/address          │
│  - Urgency (emergency?)      │
│  - Contact information       │
│  - Best time to call back    │
└──────────┬───────────────────┘
           │
           │ 4. Webhook POST to Next.js API
           │    /api/webhooks/retell/call-ended
           ▼
┌─────────────────────────────┐
│  Next.js API Route          │
│  - Validates webhook        │
│  - Extracts call data       │
│  - Determines tenant_id     │
└──────────┬──────────────────┘
           │
           │ 5. Store in database
           ▼
┌─────────────────────────────┐
│  Supabase PostgreSQL        │
│  - calls table              │
│  - leads table (if qualified)│
│  - RLS enforces tenant_id   │
└──────────┬──────────────────┘
           │
           │ 6. Trigger notifications
           ▼
┌─────────────────────────────────────┐
│  Notification Service               │
│  - Email to client (qualified lead) │
│  - SMS to client (emergency)        │
│  - Webhook to CRM (if configured)   │
└─────────────────────────────────────┘
```

#### 2.3.2 Dashboard Access Flow

```
┌──────────────┐
│ Business     │
│ Owner        │
└──────┬───────┘
       │
       │ 1. Login via Clerk
       ▼
┌──────────────────┐
│  Clerk Auth      │
│  - OAuth/Email   │
│  - Returns JWT   │
└──────┬───────────┘
       │
       │ 2. JWT includes tenant_id in custom claims
       ▼
┌──────────────────────────────┐
│  Next.js Server Component    │
│  - Validates JWT             │
│  - Extracts tenant_id        │
│  - Sets RLS context          │
└──────┬───────────────────────┘
       │
       │ 3. Query with automatic tenant filtering
       ▼
┌──────────────────────────────┐
│  Supabase Client             │
│  - RLS automatically filters │
│    WHERE tenant_id = <jwt>   │
└──────┬───────────────────────┘
       │
       │ 4. Returns only tenant's data
       ▼
┌──────────────────────────────┐
│  Dashboard UI                │
│  - Call history              │
│  - Lead list                 │
│  - Analytics                 │
└──────────────────────────────┘
```

### 2.4 Component Breakdown

**Frontend Components:**
- **Dashboard App** (Next.js App Router pages)
  - `/dashboard` - Call history and analytics
  - `/leads` - Lead management
  - `/settings` - Client configuration
  - `/admin` (Nicholas only) - Multi-tenant management

**Backend Services:**
- **API Routes** (Next.js serverless functions)
  - `/api/webhooks/retell/*` - Retell AI webhook handlers
  - `/api/leads/*` - Lead management endpoints
  - `/api/analytics/*` - Analytics data endpoints
  - `/api/admin/*` - Administrative endpoints

**External Services:**
- **Retell AI** - Voice platform
- **Supabase** - Database and auth
- **Clerk** - User authentication
- **Resend** - Transactional email
- **Twilio** (optional) - SMS notifications
- **Make.com/Zapier** (optional) - CRM integrations

---

## 3. Technical Stack Details

### 3.1 Technology Selection Matrix

| Category | Technology | Version | Justification | Alternative Considered |
|----------|-----------|---------|---------------|------------------------|
| **Frontend Framework** | Next.js | 15+ | App Router for RSC, built-in API routes, excellent Vercel deployment, matches JS skills | Remix (more complex), Astro (less dynamic) |
| **Voice Platform** | Retell AI | Latest | $0.07/min all-inclusive, transparent pricing, <800ms latency, GPT-4 integration | Vapi ($0.30+/min), Bland AI ($0.12/min), Custom Twilio+OpenAI |
| **Database** | Supabase (PostgreSQL) | Latest | Built-in RLS, realtime subscriptions, generous free tier, simple auth | PlanetScale (MySQL, less RLS support), Neon (newer, less proven) |
| **Hosting** | Vercel | Latest | Zero-config Next.js deployment, edge functions, great DX | Railway (if bandwidth costs spike), Fly.io (more complex) |
| **Authentication** | Clerk | Latest | Organization support, JWT customization, great UI components | Auth.js (more setup), Supabase Auth (less flexible) |
| **Email** | Resend | Latest | Simple API, React Email templates, affordable | SendGrid (complex pricing), AWS SES (more setup) |
| **SMS** | Twilio | Latest | Industry standard, reliable | AWS SNS (less features) |
| **Monitoring** | Sentry | Latest | Error tracking, performance monitoring | LogRocket (expensive), Datadog (overkill) |

### 3.2 Detailed Technology Justification

#### 3.2.1 Voice Platform: Retell AI

**Why Retell AI over alternatives:**

1. **Transparent Pricing:** $0.07/minute all-inclusive (LLM, TTS, STT, telephony)
   - Vapi: $0.30+/minute (4-5x more expensive with complex pricing)
   - Bland AI: $0.12/minute (still 70% more expensive)
   - Custom Twilio+OpenAI: Similar cost but weeks more development time

2. **Performance:** <800ms response latency, natural conversations
   - Critical for customer experience
   - Pre-integrated GPT-4 with optimized prompting

3. **Developer Experience:**
   - Simple webhook integration
   - Custom agent configuration via API
   - No complex telephony knowledge required

4. **Features for MVP:**
   - Custom qualification workflows
   - Call recording and transcription included
   - Multi-language support (future expansion)

**Cost Analysis:**
- 50 clients × 350 calls/month × 5 min avg = 87,500 minutes/month
- 87,500 × $0.07 = **$6,125/month** voice costs
- With $497/client = $24,850 revenue
- Voice cost is **24.6% of revenue** (healthy margin)

**Integration Pattern:**
```typescript
// Webhook handler receives call events
POST /api/webhooks/retell/call-ended
{
  "call_id": "uuid",
  "agent_id": "uuid",
  "transcript": "...",
  "recording_url": "...",
  "metadata": {
    "tenant_id": "client-123",
    "qualification_data": {...}
  }
}
```

#### 3.2.2 Backend: Next.js 15 App Router

**Why Next.js 15 over alternatives:**

1. **Server Components:** Fetch data on server, eliminate loading states for dashboards
   - Perfect for multi-tenant dashboards with tenant-specific data
   - Better security (API keys never sent to client)

2. **Built-in API Routes:** No separate backend needed
   - Serverless by default on Vercel
   - Auto-scaling
   - TypeScript end-to-end

3. **JavaScript Full-Stack:** Matches Nicholas's skill set
   - Faster development than learning Python/FastAPI
   - Massive ecosystem (npm packages)
   - Great hiring pool if needed later

4. **Proven for SaaS:** Used by Vercel's own platforms, Cal.com, and many multi-tenant SaaS products

**Architecture Pattern (2026 Best Practices):**
```
/app
  /(auth)
    /login/page.tsx
    /signup/page.tsx
  /(dashboard)
    /dashboard/page.tsx      # Server Component - fetches calls
    /leads/page.tsx          # Server Component - fetches leads
    /settings/page.tsx
  /api
    /webhooks/retell/[...path]/route.ts
    /leads/[leadId]/route.ts
  /admin
    /tenants/page.tsx        # Admin only
```

**Benefits of App Router:**
- **Automatic code splitting** - Only load what's needed
- **Streaming SSR** - Progressive page loading
- **Server actions** - Forms without API routes
- **Layouts** - Shared UI between routes

Reference: [Next.js Architecture in 2026](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)

#### 3.2.3 Database: Supabase (PostgreSQL)

**Why Supabase over alternatives:**

1. **Row-Level Security (RLS):** Database-enforced multi-tenancy
   - Security at the data layer (can't be bypassed)
   - [Official RLS documentation](https://supabase.com/docs/guides/database/postgres/row-level-security)
   - Proven pattern for multi-tenant SaaS

2. **Realtime Subscriptions:** Live updates for dashboards
   - See new calls appear instantly
   - WebSocket-based, efficient

3. **Generous Free Tier:**
   - 500MB database (enough for MVP)
   - Upgrade to $25/month Pro for production
   - No surprise billing

4. **Developer Experience:**
   - Auto-generated TypeScript types from schema
   - Migrations via SQL or UI
   - Built-in auth (though we're using Clerk for more features)

**RLS Performance Best Practices (2026):**
```sql
-- Store tenant_id in JWT custom claims (faster than subqueries)
CREATE POLICY "tenant_isolation" ON calls
FOR ALL USING (
  tenant_id = (current_setting('app.current_tenant')::uuid)
);

-- Always index tenant_id
CREATE INDEX idx_calls_tenant_id ON calls(tenant_id);
CREATE INDEX idx_calls_tenant_created ON calls(tenant_id, created_at DESC);
```

Reference: [Best Practices for Supabase](https://www.leanware.co/insights/supabase-best-practices)

#### 3.2.4 Authentication: Clerk

**Why Clerk over alternatives:**

1. **Organization Support:** Built-in multi-tenant organization structure
   - Each client is an "organization"
   - Role-based access (owner, admin, viewer)
   - Invitation system built-in

2. **JWT Customization:** Add tenant_id to JWT claims
   - Simplifies RLS policies
   - No extra database lookups

3. **UI Components:** Pre-built, customizable
   - `<SignIn />`, `<UserButton />`, `<OrganizationSwitcher />`
   - Saves weeks of UI development

4. **Developer Experience:**
   - Webhook events for user lifecycle
   - Excellent Next.js integration
   - Good documentation

**Alternative Comparison:**
- **Auth.js (NextAuth):** Free but requires more setup, no organizations out-of-box
- **Supabase Auth:** Good but less flexible for multi-tenant, no organization concept
- **Clerk:** $25/month for production, best DX, organization support

### 3.3 Infrastructure Costs at Scale

**Month 1-2 (MVP - 5 clients):**
| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Pro | $20 |
| Supabase | Pro | $25 |
| Clerk | Pro | $25 |
| Retell AI | Usage | ~$440 (5 clients × 350 calls × 5 min × $0.07) |
| Resend | Free | $0 |
| Sentry | Developer | $26 |
| **Total** | | **~$536** |

**Month 3-6 (Growth - 30 clients):**
| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Pro | $20 (may need Team at $50) |
| Supabase | Pro | $25 (may need Team at $599 if >8GB) |
| Clerk | Pro | $25 + overages (~$50 total) |
| Retell AI | Usage | ~$3,675 (30 clients × 350 calls × 5 min × $0.07) |
| Resend | Starter | $20 |
| Twilio SMS | Usage | ~$50 |
| Sentry | Team | $26 |
| **Total** | | **~$3,866** |

**Month 6+ (Scale - 60 clients):**
| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Team | $50 |
| Supabase | Team | $599 (for >8GB, high-availability) |
| Clerk | Pro + overages | ~$100 |
| Retell AI | Usage | ~$7,350 (60 clients × 350 calls × 5 min × $0.07) |
| Resend | Pro | $80 |
| Twilio SMS | Usage | ~$100 |
| Sentry | Team | $26 |
| **Total** | | **~$8,305** |

**Revenue vs. Infrastructure Cost:**
| Stage | Clients | Monthly Revenue | Infrastructure | Margin |
|-------|---------|-----------------|----------------|--------|
| MVP | 5 | $2,485 | $536 | 78% |
| Growth | 30 | $14,910 | $3,866 | 74% |
| Scale | 60 | $29,820 | $8,305 | 72% |

**Key Insights:**
- Retell AI voice costs dominate at scale (70-90% of infrastructure)
- Still maintain 70%+ gross margins
- Database costs manageable even at 60 clients with shared table approach
- Can optimize further by negotiating bulk pricing with Retell AI at scale

---

## 4. Database Schema

### 4.1 Schema Overview

**Design Principles:**
1. **Tenant Isolation:** Every table with tenant-specific data has `tenant_id`
2. **Performance:** Composite indexes on `(tenant_id, created_at)` for common queries
3. **Audit Trail:** `created_at`, `updated_at` on all tables
4. **Soft Deletes:** `deleted_at` for important data (calls, leads)
5. **JSON Flexibility:** Use JSONB for variable data (qualification answers, metadata)

### 4.2 Core Tables

#### 4.2.1 Tenants Table

```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Business Information
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL, -- 'hvac', 'plumbing', 'garage_door', 'locksmith'
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,

  -- Configuration
  retell_agent_id TEXT UNIQUE, -- Retell AI agent ID
  retell_phone_number TEXT UNIQUE, -- Assigned phone number
  qualification_workflow JSONB NOT NULL DEFAULT '{}', -- Custom questions per tenant

  -- Subscription
  subscription_status TEXT NOT NULL DEFAULT 'trial', -- 'trial', 'active', 'suspended', 'cancelled'
  subscription_tier TEXT DEFAULT 'standard', -- 'standard', 'premium' (future)
  monthly_call_limit INTEGER DEFAULT 300,

  -- Billing
  stripe_customer_id TEXT UNIQUE,
  setup_fee_paid BOOLEAN DEFAULT false,
  monthly_rate_cents INTEGER DEFAULT 49700, -- $497

  -- Integrations
  crm_webhook_url TEXT, -- For lead delivery
  notification_email TEXT[], -- Multiple email recipients
  notification_sms TEXT[], -- Multiple SMS recipients

  -- Settings
  business_hours JSONB, -- Operating hours for context
  emergency_keywords TEXT[], -- Words that trigger urgent routing
  timezone TEXT DEFAULT 'America/Los_Angeles',

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,

  -- Indexes
  CONSTRAINT valid_subscription_status CHECK (
    subscription_status IN ('trial', 'active', 'suspended', 'cancelled')
  )
);

-- Indexes
CREATE INDEX idx_tenants_subscription_status ON tenants(subscription_status);
CREATE INDEX idx_tenants_created_at ON tenants(created_at DESC);

-- RLS Policies
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tenant"
ON tenants FOR SELECT
USING (
  id = (SELECT tenant_id FROM user_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can view all tenants"
ON tenants FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);
```

#### 4.2.2 User Profiles Table

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE, -- Clerk user ID
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,

  -- User Info
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'owner', -- 'owner', 'admin', 'viewer', 'system_admin'

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_login_at TIMESTAMPTZ,

  CONSTRAINT valid_role CHECK (
    role IN ('owner', 'admin', 'viewer', 'system_admin')
  )
);

-- Indexes
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_tenant_id ON user_profiles(tenant_id);

-- RLS Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON user_profiles FOR SELECT
USING (user_id = auth.uid());
```

#### 4.2.3 Calls Table

```sql
CREATE TABLE calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Call Identification
  retell_call_id TEXT UNIQUE NOT NULL, -- Retell AI call ID
  call_status TEXT NOT NULL, -- 'completed', 'failed', 'abandoned', 'voicemail'

  -- Call Details
  caller_phone TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,

  -- AI Processing
  transcript TEXT, -- Full conversation transcript
  summary TEXT, -- AI-generated call summary
  sentiment TEXT, -- 'positive', 'neutral', 'negative'

  -- Qualification
  is_qualified BOOLEAN DEFAULT false,
  qualification_score INTEGER, -- 0-100
  qualification_data JSONB, -- Answers to qualification questions

  -- Lead Association
  lead_id UUID REFERENCES leads(id),

  -- Media
  recording_url TEXT, -- Retell AI recording URL

  -- Cost Tracking
  cost_cents INTEGER, -- Actual cost of call

  -- Metadata
  metadata JSONB DEFAULT '{}', -- Additional data from Retell
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,

  CONSTRAINT valid_call_status CHECK (
    call_status IN ('completed', 'failed', 'abandoned', 'voicemail')
  ),
  CONSTRAINT valid_sentiment CHECK (
    sentiment IN ('positive', 'neutral', 'negative', NULL)
  )
);

-- Indexes for performance
CREATE INDEX idx_calls_tenant_id ON calls(tenant_id);
CREATE INDEX idx_calls_tenant_created ON calls(tenant_id, created_at DESC);
CREATE INDEX idx_calls_tenant_status ON calls(tenant_id, call_status);
CREATE INDEX idx_calls_lead_id ON calls(lead_id);
CREATE INDEX idx_calls_qualified ON calls(tenant_id, is_qualified, created_at DESC);

-- RLS Policies
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their tenant's calls"
ON calls FOR SELECT
USING (
  tenant_id = (
    SELECT tenant_id FROM user_profiles
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all calls"
ON calls FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_id = auth.uid()
    AND role = 'system_admin'
  )
);
```

#### 4.2.4 Leads Table

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Lead Source
  source_call_id UUID REFERENCES calls(id),
  source TEXT DEFAULT 'phone', -- 'phone', 'web', 'manual'

  -- Contact Information
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,

  -- Service Details
  service_type TEXT, -- e.g., 'ac_repair', 'water_heater', 'garage_door_spring'
  service_description TEXT, -- Customer's description of issue
  urgency TEXT, -- 'emergency', 'urgent', 'routine', 'scheduled'
  preferred_contact_time TEXT, -- e.g., 'morning', 'afternoon', 'evening'

  -- Qualification
  qualification_score INTEGER, -- 0-100
  qualification_notes JSONB, -- Structured answers

  -- Lead Status
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'lost'
  disposition TEXT, -- 'quote_sent', 'scheduled', 'not_interested', etc.
  assigned_to TEXT, -- For future team assignment

  -- Value Tracking
  estimated_value_cents INTEGER, -- Estimated job value
  actual_value_cents INTEGER, -- If converted

  -- Follow-up
  follow_up_date DATE,
  follow_up_notes TEXT,

  -- CRM Integration
  external_crm_id TEXT, -- ID in client's CRM
  synced_to_crm_at TIMESTAMPTZ,

  -- Performance Bonus Tracking
  bonus_eligible BOOLEAN DEFAULT true,
  bonus_paid BOOLEAN DEFAULT false,
  bonus_amount_cents INTEGER DEFAULT 5000, -- $50

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,

  CONSTRAINT valid_status CHECK (
    status IN ('new', 'contacted', 'qualified', 'converted', 'lost')
  ),
  CONSTRAINT valid_urgency CHECK (
    urgency IN ('emergency', 'urgent', 'routine', 'scheduled', NULL)
  )
);

-- Indexes
CREATE INDEX idx_leads_tenant_id ON leads(tenant_id);
CREATE INDEX idx_leads_tenant_created ON leads(tenant_id, created_at DESC);
CREATE INDEX idx_leads_tenant_status ON leads(tenant_id, status);
CREATE INDEX idx_leads_tenant_urgency ON leads(tenant_id, urgency, created_at DESC);
CREATE INDEX idx_leads_bonus_eligible ON leads(tenant_id, bonus_eligible, bonus_paid);

-- RLS Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their tenant's leads"
ON leads FOR SELECT
USING (
  tenant_id = (
    SELECT tenant_id FROM user_profiles
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their tenant's leads"
ON leads FOR UPDATE
USING (
  tenant_id = (
    SELECT tenant_id FROM user_profiles
    WHERE user_id = auth.uid()
  )
);
```

#### 4.2.5 Analytics Tables (Materialized View)

```sql
-- Materialized view for fast dashboard queries
CREATE MATERIALIZED VIEW tenant_analytics AS
SELECT
  t.id AS tenant_id,
  t.business_name,

  -- Call Metrics
  COUNT(DISTINCT c.id) AS total_calls,
  COUNT(DISTINCT c.id) FILTER (WHERE c.call_status = 'completed') AS completed_calls,
  COUNT(DISTINCT c.id) FILTER (WHERE c.is_qualified = true) AS qualified_calls,
  AVG(c.duration_seconds) FILTER (WHERE c.call_status = 'completed') AS avg_call_duration,
  SUM(c.cost_cents) AS total_call_cost_cents,

  -- Lead Metrics
  COUNT(DISTINCT l.id) AS total_leads,
  COUNT(DISTINCT l.id) FILTER (WHERE l.status = 'converted') AS converted_leads,
  AVG(l.qualification_score) AS avg_qualification_score,
  SUM(l.actual_value_cents) AS total_revenue_cents,

  -- Bonus Metrics
  COUNT(DISTINCT l.id) FILTER (WHERE l.bonus_eligible AND NOT l.bonus_paid) AS pending_bonuses,
  SUM(l.bonus_amount_cents) FILTER (WHERE l.bonus_eligible AND l.bonus_paid) AS total_bonuses_paid_cents,

  -- Time Ranges (last 30 days)
  COUNT(DISTINCT c.id) FILTER (
    WHERE c.created_at >= now() - interval '30 days'
  ) AS calls_last_30_days,
  COUNT(DISTINCT l.id) FILTER (
    WHERE l.created_at >= now() - interval '30 days'
  ) AS leads_last_30_days,

  -- Updated timestamp
  now() AS last_refreshed
FROM tenants t
LEFT JOIN calls c ON c.tenant_id = t.id AND c.deleted_at IS NULL
LEFT JOIN leads l ON l.tenant_id = t.id AND l.deleted_at IS NULL
WHERE t.deleted_at IS NULL
GROUP BY t.id, t.business_name;

-- Index on materialized view
CREATE UNIQUE INDEX idx_tenant_analytics_tenant_id ON tenant_analytics(tenant_id);

-- Refresh schedule (run every hour via cron job or edge function)
-- REFRESH MATERIALIZED VIEW CONCURRENTLY tenant_analytics;
```

### 4.3 Database Functions and Triggers

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calls_updated_at
  BEFORE UPDATE ON calls
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create lead from qualified call
CREATE OR REPLACE FUNCTION create_lead_from_qualified_call()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_qualified = true AND NEW.lead_id IS NULL THEN
    INSERT INTO leads (
      tenant_id,
      source_call_id,
      full_name,
      phone,
      email,
      service_type,
      service_description,
      urgency,
      qualification_score,
      qualification_notes,
      status
    ) VALUES (
      NEW.tenant_id,
      NEW.id,
      COALESCE((NEW.qualification_data->>'name')::TEXT, 'Unknown'),
      NEW.caller_phone,
      (NEW.qualification_data->>'email')::TEXT,
      (NEW.qualification_data->>'service_type')::TEXT,
      (NEW.qualification_data->>'description')::TEXT,
      (NEW.qualification_data->>'urgency')::TEXT,
      NEW.qualification_score,
      NEW.qualification_data,
      'new'
    )
    RETURNING id INTO NEW.lead_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_create_lead_from_call
  BEFORE INSERT OR UPDATE ON calls
  FOR EACH ROW
  EXECUTE FUNCTION create_lead_from_qualified_call();
```

### 4.4 Seed Data for Development

```sql
-- Insert test tenant
INSERT INTO tenants (
  id,
  business_name,
  business_type,
  owner_name,
  email,
  phone,
  qualification_workflow,
  subscription_status
) VALUES (
  'test-tenant-uuid-1234',
  'ABC HVAC Services',
  'hvac',
  'John Smith',
  'john@abchvac.com',
  '+14155551234',
  '{
    "questions": [
      {"id": "service_type", "text": "What type of service do you need?", "type": "choice", "options": ["AC Repair", "Heating Repair", "Installation", "Maintenance"]},
      {"id": "urgency", "text": "How urgent is this?", "type": "choice", "options": ["Emergency - No heat/AC", "Urgent - Within 24hrs", "Routine - This week"]},
      {"id": "description", "text": "Can you briefly describe the issue?", "type": "text"},
      {"id": "address", "text": "What is the service address?", "type": "text"},
      {"id": "name", "text": "What is your name?", "type": "text"},
      {"id": "email", "text": "What is your email address?", "type": "email"}
    ],
    "qualification_logic": {
      "min_score": 60,
      "scoring": {
        "urgency_emergency": 100,
        "urgency_urgent": 80,
        "urgency_routine": 60,
        "has_address": 20,
        "has_contact_info": 20
      }
    }
  }',
  'active'
);

-- Insert test user
INSERT INTO user_profiles (
  user_id,
  tenant_id,
  email,
  full_name,
  role
) VALUES (
  'clerk-user-test-123',
  'test-tenant-uuid-1234',
  'john@abchvac.com',
  'John Smith',
  'owner'
);
```

---

## 5. API Design

### 5.1 API Architecture Overview

**API Strategy:**
- **REST-like endpoints** for CRUD operations (leads, tenants)
- **Webhook endpoints** for Retell AI events (POST only)
- **Server Actions** for form submissions (Next.js 15 feature)
- **Type-safe** with TypeScript and Zod validation

**Authentication:**
- Clerk JWT tokens in Authorization header
- Webhook endpoints use signature verification
- Rate limiting via Vercel edge config

### 5.2 Webhook Endpoints (Retell AI → Next.js)

#### 5.2.1 Call Started Webhook

```typescript
// app/api/webhooks/retell/call-started/route.ts

POST /api/webhooks/retell/call-started

Request Headers:
  X-Retell-Signature: <hmac_signature>
  Content-Type: application/json

Request Body:
{
  "event": "call_started",
  "call_id": "call_abc123",
  "agent_id": "agent_xyz789",
  "from_number": "+14155551234",
  "to_number": "+14155556789", // Client's business number
  "started_at": "2026-01-12T10:30:00Z",
  "metadata": {
    "tenant_id": "uuid-here"
  }
}

Response (200 OK):
{
  "success": true,
  "call_id": "internal-uuid"
}

Implementation:
- Verify webhook signature (security)
- Extract tenant_id from metadata
- Create call record with status 'in_progress'
- Return success
```

#### 5.2.2 Call Ended Webhook (Primary)

```typescript
// app/api/webhooks/retell/call-ended/route.ts

POST /api/webhooks/retell/call-ended

Request Headers:
  X-Retell-Signature: <hmac_signature>
  Content-Type: application/json

Request Body:
{
  "event": "call_ended",
  "call_id": "call_abc123",
  "agent_id": "agent_xyz789",
  "from_number": "+14155551234",
  "to_number": "+14155556789",
  "started_at": "2026-01-12T10:30:00Z",
  "ended_at": "2026-01-12T10:35:30Z",
  "duration_seconds": 330,
  "call_status": "completed", // or 'failed', 'abandoned'
  "transcript": "AI: Thank you for calling ABC HVAC...\nCaller: My AC is not working...",
  "recording_url": "https://retell.ai/recordings/...",
  "sentiment": "neutral",
  "metadata": {
    "tenant_id": "uuid-here"
  },
  "custom_data": {
    "qualification_data": {
      "service_type": "AC Repair",
      "urgency": "Emergency - No heat/AC",
      "description": "AC unit making loud noise and not cooling",
      "address": "123 Main St, San Francisco, CA 94102",
      "name": "Jane Doe",
      "email": "jane@example.com"
    },
    "qualification_score": 100
  }
}

Response (200 OK):
{
  "success": true,
  "call_id": "internal-uuid",
  "lead_created": true,
  "lead_id": "lead-uuid"
}

Implementation Logic:
1. Verify webhook signature
2. Extract tenant_id and validate tenant exists
3. Upsert call record:
   - Update if call_started already created it
   - Insert if this is first event (some flows skip call_started)
4. Calculate qualification score from custom_data
5. If qualified (score >= threshold):
   - Auto-create lead (via trigger or explicit insert)
   - Send notifications:
     * Email to client
     * SMS if emergency
     * Webhook to CRM if configured
6. Update analytics (could be async job)
7. Return success with lead_id
```

#### 5.2.3 Webhook Signature Verification

```typescript
// lib/webhooks/verify-retell-signature.ts

import { createHmac } from 'crypto';

export function verifyRetellSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = createHmac('sha256', secret);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');

  return signature === expectedSignature;
}

// Usage in route handler
const rawBody = await request.text();
const signature = request.headers.get('X-Retell-Signature');

if (!verifyRetellSignature(rawBody, signature, process.env.RETELL_WEBHOOK_SECRET!)) {
  return new Response('Invalid signature', { status: 401 });
}
```

### 5.3 REST API Endpoints (Dashboard → Next.js)

#### 5.3.1 Authentication Pattern

All API endpoints require Clerk JWT authentication:

```typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/webhooks/retell/(.*)"], // Webhooks are public but verified
});

// In API routes
import { auth } from "@clerk/nextjs";

export async function GET(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Get tenant_id from user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('tenant_id')
    .eq('user_id', userId)
    .single();

  // RLS will automatically filter by tenant_id
}
```

#### 5.3.2 Leads API

```typescript
// app/api/leads/route.ts

// List leads (with pagination, filtering)
GET /api/leads?status=new&page=1&limit=20

Response (200 OK):
{
  "leads": [
    {
      "id": "uuid",
      "full_name": "Jane Doe",
      "phone": "+14155551234",
      "email": "jane@example.com",
      "service_type": "AC Repair",
      "urgency": "emergency",
      "status": "new",
      "qualification_score": 100,
      "created_at": "2026-01-12T10:35:00Z",
      "source_call": {
        "id": "call-uuid",
        "duration_seconds": 330
      }
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}

// Create lead (manual entry)
POST /api/leads

Request Body:
{
  "full_name": "John Smith",
  "phone": "+14155559999",
  "email": "john@example.com",
  "service_type": "Heating Repair",
  "urgency": "routine",
  "service_description": "Annual maintenance",
  "source": "manual"
}

Response (201 Created):
{
  "id": "uuid",
  "full_name": "John Smith",
  "status": "new",
  "created_at": "2026-01-12T11:00:00Z"
}

// Update lead status
PATCH /api/leads/[leadId]

Request Body:
{
  "status": "contacted",
  "disposition": "quote_sent",
  "follow_up_date": "2026-01-15",
  "follow_up_notes": "Sent $500 quote for heating repair"
}

Response (200 OK):
{
  "id": "uuid",
  "status": "contacted",
  "updated_at": "2026-01-12T11:05:00Z"
}
```

#### 5.3.3 Calls API

```typescript
// app/api/calls/route.ts

// List calls (with filtering)
GET /api/calls?status=completed&qualified=true&from=2026-01-01&to=2026-01-31

Response (200 OK):
{
  "calls": [
    {
      "id": "uuid",
      "caller_phone": "+14155551234",
      "duration_seconds": 330,
      "call_status": "completed",
      "is_qualified": true,
      "qualification_score": 100,
      "started_at": "2026-01-12T10:30:00Z",
      "ended_at": "2026-01-12T10:35:30Z",
      "recording_url": "https://...",
      "lead": {
        "id": "lead-uuid",
        "full_name": "Jane Doe",
        "status": "new"
      }
    }
  ],
  "stats": {
    "total_calls": 150,
    "qualified_calls": 45,
    "total_duration_minutes": 825,
    "average_duration_seconds": 330
  }
}

// Get single call with transcript
GET /api/calls/[callId]

Response (200 OK):
{
  "id": "uuid",
  "caller_phone": "+14155551234",
  "duration_seconds": 330,
  "transcript": "AI: Thank you for calling...\nCaller: My AC is broken...",
  "summary": "Customer called about broken AC unit. Emergency repair needed.",
  "qualification_data": {
    "service_type": "AC Repair",
    "urgency": "Emergency",
    // ...
  },
  "recording_url": "https://...",
  "created_at": "2026-01-12T10:30:00Z"
}
```

#### 5.3.4 Analytics API

```typescript
// app/api/analytics/overview/route.ts

GET /api/analytics/overview?period=30d

Response (200 OK):
{
  "period": {
    "from": "2025-12-13",
    "to": "2026-01-12"
  },
  "metrics": {
    "total_calls": 350,
    "completed_calls": 330,
    "qualified_calls": 105,
    "total_leads": 105,
    "conversion_rate": 0.30,
    "average_call_duration_seconds": 285,
    "total_call_cost_cents": 4155,
    "estimated_lead_value_cents": 52500
  },
  "trends": {
    "calls_by_day": [
      {"date": "2025-12-13", "calls": 12, "qualified": 4},
      {"date": "2025-12-14", "calls": 10, "qualified": 3},
      // ...
    ],
    "calls_by_hour": [
      {"hour": 0, "calls": 2},
      {"hour": 1, "calls": 1},
      // ...
      {"hour": 9, "calls": 35},
      // ...
    ]
  },
  "top_service_types": [
    {"service_type": "AC Repair", "count": 45},
    {"service_type": "Heating Repair", "count": 30},
    {"service_type": "Maintenance", "count": 20}
  ]
}
```

#### 5.3.5 Admin API (Nicholas Only)

```typescript
// app/api/admin/tenants/route.ts

// List all tenants (admin only)
GET /api/admin/tenants

Authorization: Clerk JWT with role='system_admin'

Response (200 OK):
{
  "tenants": [
    {
      "id": "uuid",
      "business_name": "ABC HVAC",
      "subscription_status": "active",
      "calls_this_month": 350,
      "qualified_leads_this_month": 105,
      "revenue_this_month_cents": 49700,
      "cost_this_month_cents": 4155,
      "margin_percent": 91.6,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "summary": {
    "total_tenants": 35,
    "active_tenants": 30,
    "trial_tenants": 5,
    "total_calls_this_month": 10500,
    "total_revenue_this_month_cents": 149100,
    "total_costs_this_month_cents": 12425
  }
}

// Create tenant (onboarding)
POST /api/admin/tenants

Request Body:
{
  "business_name": "XYZ Plumbing",
  "business_type": "plumbing",
  "owner_name": "Sarah Johnson",
  "email": "sarah@xyzplumbing.com",
  "phone": "+14155557777",
  "qualification_workflow": { /* custom config */ }
}

Response (201 Created):
{
  "id": "uuid",
  "business_name": "XYZ Plumbing",
  "subscription_status": "trial",
  "retell_agent_id": null, // Will be provisioned next
  "retell_phone_number": null,
  "onboarding_steps": {
    "tenant_created": true,
    "retell_agent_provisioned": false,
    "phone_number_assigned": false,
    "owner_invited": false
  }
}

// Provision Retell AI agent for tenant
POST /api/admin/tenants/[tenantId]/provision-retell

Response (200 OK):
{
  "retell_agent_id": "agent_xyz789",
  "retell_phone_number": "+14155558888",
  "status": "provisioned"
}
```

### 5.4 Type Definitions (TypeScript)

```typescript
// types/api.ts

// Zod schemas for validation
import { z } from 'zod';

export const CreateLeadSchema = z.object({
  full_name: z.string().min(1).max(255),
  phone: z.string().regex(/^\+1\d{10}$/),
  email: z.string().email().optional(),
  service_type: z.string().min(1),
  urgency: z.enum(['emergency', 'urgent', 'routine', 'scheduled']).optional(),
  service_description: z.string().optional(),
  source: z.enum(['phone', 'web', 'manual']).default('manual'),
});

export const UpdateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).optional(),
  disposition: z.string().optional(),
  follow_up_date: z.string().date().optional(),
  follow_up_notes: z.string().optional(),
  estimated_value_cents: z.number().int().positive().optional(),
  actual_value_cents: z.number().int().positive().optional(),
});

export const RetellWebhookSchema = z.object({
  event: z.enum(['call_started', 'call_ended']),
  call_id: z.string(),
  agent_id: z.string(),
  from_number: z.string(),
  to_number: z.string(),
  started_at: z.string().datetime(),
  ended_at: z.string().datetime().optional(),
  duration_seconds: z.number().int().optional(),
  call_status: z.enum(['completed', 'failed', 'abandoned']).optional(),
  transcript: z.string().optional(),
  recording_url: z.string().url().optional(),
  metadata: z.object({
    tenant_id: z.string().uuid(),
  }),
  custom_data: z.object({
    qualification_data: z.record(z.any()).optional(),
    qualification_score: z.number().int().min(0).max(100).optional(),
  }).optional(),
});

// Usage in API route
export async function POST(request: Request) {
  const body = await request.json();

  // Validate with Zod
  const result = CreateLeadSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { error: 'Validation failed', details: result.error.issues },
      { status: 400 }
    );
  }

  const lead = result.data;
  // ... proceed with validated data
}
```

---

## 6. Feature Specifications

### 6.1 MVP Features (Weeks 1-4)

**MVP Definition:** Minimum set of features to onboard first 5 clients and deliver value.

#### 6.1.1 Feature: Multi-Tenant Call Handling

**User Story:** As a service business owner, I want my customers' calls to be answered 24/7 by an AI that asks relevant questions, so I never miss a lead.

**Acceptance Criteria:**
- [ ] Each client has a dedicated phone number that routes to their custom AI agent
- [ ] AI agent answers within 3 rings (sub-10 second response)
- [ ] AI follows client-specific qualification workflow (custom questions per business type)
- [ ] AI captures caller's name, phone, service type, urgency, and description
- [ ] AI handles voicemail gracefully if caller hangs up mid-conversation
- [ ] Call recordings are stored securely and accessible to client
- [ ] Call transcripts are generated automatically
- [ ] System handles 10 concurrent calls without degradation

**Technical Implementation:**
1. **Retell AI Agent Configuration:**
   - Create agent via Retell API for each new tenant
   - Assign phone number from Retell's pool
   - Configure agent with tenant's `qualification_workflow` JSON
   - Set webhook URL to `/api/webhooks/retell/call-ended`

2. **Webhook Processing:**
   - Validate webhook signature (security)
   - Parse call data and qualification responses
   - Store call record in `calls` table with tenant isolation
   - Calculate qualification score based on tenant's scoring logic
   - Trigger lead creation if qualified

3. **Qualification Workflow Engine:**
```typescript
// lib/qualification/score-call.ts

interface QualificationWorkflow {
  questions: Question[];
  qualification_logic: {
    min_score: number;
    scoring: Record<string, number>;
  };
}

function calculateQualificationScore(
  workflow: QualificationWorkflow,
  answers: Record<string, any>
): number {
  let score = 0;

  // Example scoring logic
  if (answers.urgency === 'Emergency - No heat/AC') {
    score += workflow.qualification_logic.scoring.urgency_emergency;
  }

  if (answers.address) {
    score += workflow.qualification_logic.scoring.has_address;
  }

  // ... more scoring rules

  return Math.min(score, 100);
}
```

**Testing Checklist:**
- [ ] Place test call to each business type (HVAC, plumbing, garage door, locksmith)
- [ ] Verify AI asks correct questions for each business type
- [ ] Confirm call appears in dashboard within 30 seconds of completion
- [ ] Verify recording and transcript are accessible
- [ ] Test concurrent calls (simulate 5 simultaneous calls)
- [ ] Verify tenant isolation (Client A can't see Client B's calls)

**Success Metrics:**
- 99%+ call answer rate
- <10 second answer time
- 95%+ call completion rate (no technical failures)
- <5% customer complaints about AI interaction

---

#### 6.1.2 Feature: Lead Capture and Qualification

**User Story:** As a service business owner, I want qualified leads delivered to my email immediately, so I can follow up quickly and close more jobs.

**Acceptance Criteria:**
- [ ] System automatically creates lead record when call qualifies (score >= threshold)
- [ ] Lead includes all captured information (name, phone, email, service type, description, urgency)
- [ ] Client receives email notification within 1 minute of qualified call ending
- [ ] Email includes lead details, call summary, and link to recording
- [ ] Emergency/urgent leads trigger SMS notification to client
- [ ] Client can configure multiple email/SMS recipients
- [ ] Lead appears in dashboard instantly via realtime subscription

**Email Template:**
```
Subject: 🔥 New Qualified Lead - [Service Type] - [Urgency]

Hi [Owner Name],

You just received a qualified lead!

📞 LEAD DETAILS
Name: Jane Doe
Phone: (415) 555-1234
Email: jane@example.com

🔧 SERVICE REQUEST
Type: AC Repair
Urgency: Emergency - No heat/AC
Description: "AC unit making loud noise and not cooling"
Address: 123 Main St, San Francisco, CA 94102

⏰ CALL INFO
Call Time: Jan 12, 2026 at 10:35 AM PST
Duration: 5 minutes 30 seconds
Qualification Score: 100/100

🎧 LISTEN TO CALL
[Listen to Recording] [Read Transcript]

💼 NEXT STEPS
1. Call Jane back ASAP at (415) 555-1234
2. Reference this is about their AC emergency
3. Update lead status in your dashboard

[View in Dashboard]

---
AI Answering Service
Never miss another lead
```

**Technical Implementation:**
1. **Lead Auto-Creation (Database Trigger):**
   - Trigger on `calls` table fires when `is_qualified = true`
   - Extracts data from `qualification_data` JSONB
   - Inserts into `leads` table
   - Updates `calls.lead_id` with new lead ID

2. **Notification Service:**
```typescript
// lib/notifications/send-lead-notification.ts

async function sendLeadNotification(lead: Lead, call: Call) {
  const tenant = await getTenant(lead.tenant_id);

  // Email notification
  await resend.emails.send({
    from: 'leads@aiansweringservice.com',
    to: tenant.notification_email,
    subject: `🔥 New ${lead.urgency === 'emergency' ? 'EMERGENCY' : ''} Lead - ${lead.service_type}`,
    react: LeadNotificationEmail({ lead, call, tenant }),
  });

  // SMS if emergency
  if (lead.urgency === 'emergency' && tenant.notification_sms) {
    await twilio.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: tenant.notification_sms[0],
      body: `EMERGENCY LEAD: ${lead.full_name} needs ${lead.service_type}. Call ${lead.phone} ASAP.`,
    });
  }

  // Webhook to CRM if configured
  if (tenant.crm_webhook_url) {
    await fetch(tenant.crm_webhook_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead, call }),
    });
  }
}
```

**Testing Checklist:**
- [ ] Trigger qualified call and verify lead created in database
- [ ] Confirm email received within 1 minute
- [ ] Verify email contains all lead details
- [ ] Test emergency SMS notification
- [ ] Verify realtime update in dashboard (lead appears without refresh)
- [ ] Test with multiple email recipients
- [ ] Verify tenant isolation (Client A doesn't receive Client B's leads)

**Success Metrics:**
- 100% of qualified calls create lead records
- <1 minute notification delivery time
- 85%+ lead quality score (client confirms lead is relevant)
- 90%+ client follow-up rate (clients contact leads within 24 hours)

---

#### 6.1.3 Feature: Client Dashboard

**User Story:** As a service business owner, I want to view my call history and leads in one place, so I can track performance and follow up with prospects.

**Acceptance Criteria:**
- [ ] Dashboard displays list of recent calls (last 30 days)
- [ ] Each call shows: date/time, caller phone, duration, status, qualification score
- [ ] User can filter calls by status (all, qualified, unqualified)
- [ ] User can search calls by phone number or date range
- [ ] User can click call to view transcript and play recording
- [ ] Dashboard displays list of leads with status badges
- [ ] User can update lead status (new → contacted → qualified → converted/lost)
- [ ] Dashboard shows key metrics: total calls, qualified calls, conversion rate
- [ ] Dashboard updates in real-time when new call/lead arrives (no refresh needed)
- [ ] Dashboard is mobile-responsive

**Dashboard Layout (Desktop):**
```
┌─────────────────────────────────────────────────────────────┐
│  ABC HVAC Services                    [Settings] [Logout]   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📊 METRICS (Last 30 Days)                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ 350        │  │ 105        │  │ 30%        │            │
│  │ Total Calls│  │ Qual. Leads│  │ Conv. Rate │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                               │
│  📞 RECENT CALLS                         [Filter ▼] [Search]│
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Jan 12, 10:35 AM  (415) 555-1234  5:30  ✅ Qualified  │  │
│  │ Jan 12, 9:20 AM   (650) 555-9876  2:15  ❌ Unqualified│  │
│  │ Jan 11, 5:45 PM   (408) 555-4444  7:00  ✅ Qualified  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
│  💼 ACTIVE LEADS                         [Filter ▼] [+ New] │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 🔥 Jane Doe       AC Repair      Emergency    [New]   │  │
│  │ 📞 (415) 555-1234 | Jan 12, 10:35 AM                  │  │
│  │ [Contact] [View Call] [Update Status ▼]              │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ 🔧 Bob Smith      Heating Repair  Routine   [Contacted]│ │
│  │ 📞 (408) 555-4444 | Jan 11, 5:45 PM                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Technical Implementation:**

1. **Dashboard Page (Server Component):**
```typescript
// app/dashboard/page.tsx

export default async function DashboardPage() {
  const { userId } = auth();
  const tenantId = await getTenantIdForUser(userId);

  // Fetch initial data server-side (fast, no loading state)
  const [calls, leads, metrics] = await Promise.all([
    supabase
      .from('calls')
      .select('*, lead:leads(*)')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('leads')
      .select('*')
      .eq('tenant_id', tenantId)
      .in('status', ['new', 'contacted'])
      .order('created_at', { ascending: false }),
    supabase
      .from('tenant_analytics')
      .select('*')
      .eq('tenant_id', tenantId)
      .single(),
  ]);

  return (
    <DashboardLayout>
      <MetricsCards metrics={metrics.data} />
      <CallsTable initialCalls={calls.data} tenantId={tenantId} />
      <LeadsTable initialLeads={leads.data} tenantId={tenantId} />
    </DashboardLayout>
  );
}
```

2. **Real-Time Updates (Client Component):**
```typescript
// components/CallsTable.tsx
'use client';

export function CallsTable({ initialCalls, tenantId }) {
  const [calls, setCalls] = useState(initialCalls);

  useEffect(() => {
    // Subscribe to realtime updates
    const channel = supabase
      .channel('calls')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'calls',
          filter: `tenant_id=eq.${tenantId}`,
        },
        (payload) => {
          setCalls((prev) => [payload.new, ...prev]);
          // Show toast notification
          toast.success('New call received!');
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [tenantId]);

  return (
    <table>
      {/* Render calls */}
    </table>
  );
}
```

3. **Call Detail Modal:**
```typescript
// components/CallDetailModal.tsx

function CallDetailModal({ call }) {
  return (
    <Dialog>
      <div>
        <h2>Call Details</h2>
        <p>From: {call.caller_phone}</p>
        <p>Duration: {formatDuration(call.duration_seconds)}</p>
        <p>Status: {call.call_status}</p>

        <h3>Transcript</h3>
        <pre>{call.transcript}</pre>

        <h3>Recording</h3>
        <audio src={call.recording_url} controls />

        {call.lead && (
          <div>
            <h3>Associated Lead</h3>
            <Link href={`/leads/${call.lead.id}`}>
              View Lead: {call.lead.full_name}
            </Link>
          </div>
        )}
      </div>
    </Dialog>
  );
}
```

**Testing Checklist:**
- [ ] Dashboard loads within 2 seconds on desktop
- [ ] Dashboard loads within 3 seconds on mobile
- [ ] Metrics display correctly (match database counts)
- [ ] Calls list shows most recent first
- [ ] Filter by status works (qualified/unqualified)
- [ ] Search by phone number works
- [ ] Click call opens modal with transcript and recording
- [ ] Recording plays without errors
- [ ] Real-time update works (simulate new call, verify it appears without refresh)
- [ ] Lead status update persists to database
- [ ] Mobile responsive (test on iPhone and Android)

**Success Metrics:**
- <2 second dashboard load time
- 90%+ users access dashboard at least weekly
- <5% support tickets about dashboard bugs
- 80%+ of leads have status updated by client

---

#### 6.1.4 Feature: Simple Admin Panel (Nicholas Only)

**User Story:** As the platform admin (Nicholas), I want to view all tenants and their metrics in one place, so I can monitor platform health and revenue.

**Acceptance Criteria:**
- [ ] Admin panel accessible only to Nicholas (role='system_admin')
- [ ] List all tenants with key metrics (calls, leads, revenue this month)
- [ ] View individual tenant details (call history, leads, configuration)
- [ ] Create new tenant (onboarding workflow)
- [ ] Suspend/reactivate tenant accounts
- [ ] View platform-wide metrics (total calls, revenue, costs, margin)
- [ ] Export tenant data to CSV for billing

**Admin Dashboard Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  AI Answering Service - Admin Panel        [Nicholas ▼]     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📊 PLATFORM METRICS (This Month)                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ 35      │ │ 10,500  │ │ $14,910 │ │ 72%     │          │
│  │ Tenants │ │ Calls   │ │ Revenue │ │ Margin  │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                               │
│  🏢 TENANTS                         [+ New Tenant] [Export]  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ ABC HVAC        Active   350 calls  105 leads  $497   │  │
│  │ XYZ Plumbing    Active   280 calls   84 leads  $497   │  │
│  │ 123 Garage Door Trial     45 calls   12 leads    $0   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Technical Implementation:**
```typescript
// app/admin/page.tsx

export default async function AdminPage() {
  const { userId } = auth();

  // Check if user is system admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', userId)
    .single();

  if (profile?.role !== 'system_admin') {
    redirect('/dashboard'); // Regular users can't access
  }

  // Fetch all tenants (RLS policy allows system_admin to see all)
  const { data: tenants } = await supabase
    .from('tenant_analytics')
    .select('*')
    .order('business_name');

  return <AdminDashboard tenants={tenants} />;
}
```

**Testing Checklist:**
- [ ] Nicholas can access admin panel
- [ ] Non-admin users redirected to dashboard
- [ ] All tenant metrics display correctly
- [ ] Create new tenant flow works end-to-end
- [ ] Export CSV contains accurate data

---

#### 6.1.5 Feature: Basic CRM Integration (Email/Webhook)

**User Story:** As a service business owner, I want qualified leads sent to my CRM automatically, so I don't have to manually enter data.

**Acceptance Criteria:**
- [ ] Client can configure webhook URL in settings
- [ ] System POSTs lead data to webhook URL when qualified call ends
- [ ] Webhook payload includes all lead fields (name, phone, email, service type, etc.)
- [ ] System retries webhook up to 3 times on failure
- [ ] Client can test webhook with sample data
- [ ] Alternative: If no webhook, send lead via email (already in 6.1.2)

**Webhook Payload:**
```json
POST {client_crm_webhook_url}

Headers:
  Content-Type: application/json
  X-AI-Answering-Service-Signature: <hmac_signature>

Body:
{
  "event": "lead.created",
  "lead": {
    "id": "uuid",
    "full_name": "Jane Doe",
    "phone": "+14155551234",
    "email": "jane@example.com",
    "service_type": "AC Repair",
    "urgency": "emergency",
    "service_description": "AC unit making loud noise and not cooling",
    "address": "123 Main St, San Francisco, CA 94102",
    "created_at": "2026-01-12T10:35:00Z"
  },
  "call": {
    "id": "uuid",
    "duration_seconds": 330,
    "recording_url": "https://...",
    "transcript": "..."
  }
}
```

**Technical Implementation:**
```typescript
// lib/integrations/send-to-crm.ts

async function sendLeadToCRM(lead: Lead, call: Call, webhookUrl: string) {
  const payload = {
    event: 'lead.created',
    lead,
    call,
  };

  const signature = createHmac('sha256', process.env.WEBHOOK_SECRET!)
    .update(JSON.stringify(payload))
    .digest('hex');

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AI-Answering-Service-Signature': signature,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (response.ok) {
        console.log('Lead sent to CRM successfully');
        return;
      }

      attempts++;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        // Log error and notify admin
        console.error('Failed to send lead to CRM after 3 attempts', error);
      }
    }
  }
}
```

**Testing Checklist:**
- [ ] Configure test webhook URL (e.g., webhook.site)
- [ ] Trigger qualified call and verify webhook received
- [ ] Verify webhook payload contains all fields
- [ ] Test signature verification
- [ ] Test retry logic (simulate webhook failure)
- [ ] Verify Make.com/Zapier integration works with webhook

---

### 6.2 Post-MVP Features (V2 - Months 2-3)

#### 6.2.1 Advanced CRM Integrations

**Direct integrations with popular CRMs:**
- Salesforce
- HubSpot
- Zoho CRM
- ServiceTitan (HVAC-specific)
- Jobber (field service)

**Implementation:** OAuth connections, native API integrations

---

#### 6.2.2 Appointment Booking

**Feature:** AI can schedule appointments directly in client's calendar.

**Requirements:**
- Google Calendar integration
- Outlook Calendar integration
- Calendar availability checking
- Automated confirmation emails/SMS
- Rescheduling support

---

#### 6.2.3 Real-Time Call Monitoring

**Feature:** Clients can listen to live calls in progress.

**Requirements:**
- WebSocket-based live audio streaming
- Call controls (mute, transfer, take over)
- Queue view (see waiting calls)

---

#### 6.2.4 Advanced Analytics

**Features:**
- Call sentiment analysis over time
- Conversion funnel visualization
- ROI calculator (lead value vs. service cost)
- Call heat maps (best times to call back)
- Competitor mention tracking

---

#### 6.2.5 White-Label Capabilities

**Feature:** Agencies can resell the service under their brand.

**Requirements:**
- Custom domains
- Custom branding (logo, colors)
- Multi-organization hierarchy
- Reseller billing and commission tracking

---

## 7. Implementation Roadmap

### 7.1 Week-by-Week MVP Plan (4 Weeks)

**Goal:** Launch MVP with 5 paying clients by end of Week 4.

---

#### Week 1: Foundation & Infrastructure

**Days 1-2: Project Setup**
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Set up Git repository (private)
- [ ] Configure ESLint, Prettier, TypeScript strict mode
- [ ] Install core dependencies (Supabase, Clerk, Tailwind CSS, shadcn/ui)
- [ ] Set up Vercel project (dev, staging, prod environments)
- [ ] Configure environment variables (.env.local, Vercel)

**Days 3-4: Database & Authentication**
- [ ] Create Supabase project (choose nearest region)
- [ ] Implement database schema (tenants, calls, leads, user_profiles)
- [ ] Set up RLS policies
- [ ] Create database triggers and functions
- [ ] Test RLS with sample data
- [ ] Integrate Clerk authentication
- [ ] Configure Clerk organizations and roles
- [ ] Add tenant_id to JWT custom claims
- [ ] Create auth middleware

**Days 5-7: Retell AI Integration**
- [ ] Create Retell AI account
- [ ] Test Retell API (create agent, assign phone number)
- [ ] Implement webhook endpoints (/api/webhooks/retell/*)
- [ ] Implement webhook signature verification
- [ ] Test end-to-end call flow (call phone number → webhook received)
- [ ] Implement qualification scoring logic
- [ ] Test with sample qualification workflows

**Deliverable:** Working backend that receives calls and stores them in database with tenant isolation.

---

#### Week 2: Core Features (Call Handling & Lead Capture)

**Days 1-2: Call Processing Pipeline**
- [ ] Implement call webhook handler (parse, validate, store)
- [ ] Implement lead auto-creation (trigger or explicit)
- [ ] Test qualification scoring with various workflows
- [ ] Implement call transcript parsing
- [ ] Test with 10+ sample calls across different business types

**Days 3-4: Notification System**
- [ ] Set up Resend for email notifications
- [ ] Create email templates (React Email)
- [ ] Implement email notification service
- [ ] Test email delivery
- [ ] Set up Twilio for SMS (optional for MVP)
- [ ] Implement emergency SMS notifications
- [ ] Test SMS delivery

**Days 5-7: Webhook to CRM**
- [ ] Implement CRM webhook service (POST to client URL)
- [ ] Add retry logic
- [ ] Add signature verification
- [ ] Test with webhook.site
- [ ] Test with Make.com/Zapier
- [ ] Document webhook integration for clients

**Deliverable:** Complete call handling pipeline that captures leads and sends notifications.

---

#### Week 3: Dashboard & UI

**Days 1-2: Dashboard Layout**
- [ ] Design dashboard UI (Figma or sketch)
- [ ] Set up shadcn/ui components
- [ ] Implement dashboard layout (header, sidebar, main area)
- [ ] Implement navigation
- [ ] Add user menu (Clerk UserButton)
- [ ] Make responsive for mobile

**Days 3-4: Calls View**
- [ ] Implement calls table (sortable, filterable)
- [ ] Add call detail modal (transcript, recording player)
- [ ] Implement search functionality
- [ ] Add date range filter
- [ ] Implement real-time updates (Supabase subscriptions)
- [ ] Test with sample data (50+ calls)

**Days 5-6: Leads View**
- [ ] Implement leads table
- [ ] Add lead detail view
- [ ] Implement status update (dropdown, persist to DB)
- [ ] Add manual lead creation form
- [ ] Implement real-time updates
- [ ] Test with sample data (30+ leads)

**Day 7: Metrics & Analytics**
- [ ] Implement metrics cards (total calls, qualified, conversion rate)
- [ ] Add simple charts (calls over time)
- [ ] Test metrics calculation accuracy

**Deliverable:** Fully functional client dashboard with calls and leads management.

---

#### Week 4: Admin Panel, Testing & Launch Prep

**Days 1-2: Admin Panel**
- [ ] Implement admin dashboard (tenants list, platform metrics)
- [ ] Add tenant creation flow
- [ ] Implement Retell agent provisioning via API
- [ ] Test onboarding workflow end-to-end
- [ ] Add export to CSV functionality

**Days 3-4: End-to-End Testing**
- [ ] Test full onboarding flow (create tenant → provision Retell → invite owner)
- [ ] Test full call flow (call → webhook → lead → notification)
- [ ] Test multi-tenant isolation (can Client A see Client B's data?)
- [ ] Test concurrent calls (5+ simultaneous)
- [ ] Test edge cases (voicemail, abandoned calls, failed webhooks)
- [ ] Performance test (dashboard load time, API response times)
- [ ] Security audit (RLS policies, auth checks, input validation)

**Days 5-6: Documentation & Launch Prep**
- [ ] Write client onboarding docs (how to use dashboard)
- [ ] Write API documentation (for CRM webhook integration)
- [ ] Create demo video (record call, show lead in dashboard)
- [ ] Set up monitoring (Sentry for errors, Vercel Analytics)
- [ ] Set up uptime monitoring (BetterUptime or UptimeRobot)
- [ ] Configure production environment variables
- [ ] Deploy to production

**Day 7: Launch & First Client**
- [ ] Onboard first test client (friend's business or own test business)
- [ ] Monitor first real calls
- [ ] Fix any issues discovered
- [ ] Gather feedback
- [ ] Prepare for sales outreach

**Deliverable:** Production-ready MVP deployed and tested with first client.

---

### 7.2 Critical Path Items

**These items block progress if delayed:**

1. **Retell AI Integration (Week 1):**
   - Without working Retell integration, no calls can be processed
   - **Mitigation:** Test Retell API on Day 1 of project, have backup plan (Bland AI) if issues

2. **Database RLS Policies (Week 1):**
   - Incorrect RLS can lead to data leaks between tenants
   - **Mitigation:** Write tests for RLS, manually verify tenant isolation

3. **Webhook Processing (Week 2):**
   - If webhooks fail silently, leads are lost
   - **Mitigation:** Implement retry logic, monitor webhook failures, set up alerts

4. **Real-Time Updates (Week 3):**
   - Not critical for MVP but significantly improves UX
   - **Mitigation:** Can defer to post-MVP if time-constrained

---

### 7.3 Post-MVP Roadmap (Months 2-6)

**Month 2:**
- Advanced analytics (conversion funnel, ROI calculator)
- Appointment booking integration (Google Calendar)
- Native CRM integrations (Salesforce, HubSpot)
- Improved AI training (fine-tune prompts based on call data)

**Month 3:**
- Real-time call monitoring (live audio streaming)
- Call transfer capabilities (AI → human handoff)
- Multi-language support (Spanish initially)
- Mobile app (React Native or PWA)

**Month 4-6:**
- White-label capabilities
- API for third-party integrations
- Advanced AI features (sentiment analysis, call coaching)
- Enterprise features (SSO, custom contracts)

---

## 8. Deployment Strategy

### 8.1 Environment Setup

**Three environments:**

| Environment | Purpose | URL Pattern | Deployment Trigger |
|-------------|---------|-------------|-------------------|
| **Development** | Local testing | localhost:3000 | Manual (npm run dev) |
| **Staging** | Pre-production testing | staging.aiansweringservice.com | Push to `staging` branch |
| **Production** | Live clients | app.aiansweringservice.com | Push to `main` branch |

### 8.2 Vercel Deployment Configuration

**vercel.json:**
```json
{
  "buildCommand": "next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sfo1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY": "@clerk-publishable-key",
    "CLERK_SECRET_KEY": "@clerk-secret-key",
    "RETELL_API_KEY": "@retell-api-key",
    "RETELL_WEBHOOK_SECRET": "@retell-webhook-secret",
    "RESEND_API_KEY": "@resend-api-key",
    "TWILIO_ACCOUNT_SID": "@twilio-account-sid",
    "TWILIO_AUTH_TOKEN": "@twilio-auth-token"
  }
}
```

### 8.3 CI/CD Pipeline

**Using GitHub Actions:**

```yaml
# .github/workflows/deploy.yml

name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run type check
        run: npm run type-check

      - name: Run linter
        run: npm run lint

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Deployment Workflow:**
1. Developer pushes to `staging` branch
2. Vercel auto-deploys to staging.aiansweringservice.com
3. Run manual testing on staging
4. Merge `staging` → `main` (via PR with review)
5. GitHub Action runs tests
6. If tests pass, deploy to production
7. Verify production deployment (smoke test)

### 8.4 Database Migrations

**Using Supabase CLI:**

```bash
# Create migration
supabase migration new add_new_feature

# Apply locally
supabase db reset

# Apply to staging
supabase db push --db-url $STAGING_DATABASE_URL

# Apply to production (after staging verification)
supabase db push --db-url $PRODUCTION_DATABASE_URL
```

**Migration Strategy:**
- Always test migrations on staging first
- Use transactions for multi-step migrations
- Keep migrations backward-compatible when possible
- Document breaking changes in CHANGELOG.md

### 8.5 Monitoring and Alerting

**Sentry (Error Tracking):**
```typescript
// sentry.client.config.ts

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
  tracesSampleRate: 1.0,

  // Don't send errors from development
  enabled: process.env.NODE_ENV === 'production',

  // Ignore specific errors
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
  ],
});
```

**BetterUptime (Uptime Monitoring):**
- Monitor main app URL (app.aiansweringservice.com)
- Monitor API endpoint (/api/health)
- Monitor Retell webhook endpoint
- Alert via email/SMS if down for >2 minutes

**Vercel Analytics:**
- Track page views
- Monitor Core Web Vitals
- Track custom events (lead_created, call_received)

**Custom Health Check Endpoint:**
```typescript
// app/api/health/route.ts

export async function GET() {
  try {
    // Check database connection
    const { error } = await supabase
      .from('tenants')
      .select('count')
      .limit(1);

    if (error) throw error;

    // Check Retell API
    const retellResponse = await fetch('https://api.retellai.com/health', {
      headers: { Authorization: `Bearer ${process.env.RETELL_API_KEY}` },
    });

    if (!retellResponse.ok) throw new Error('Retell API unhealthy');

    return Response.json({ status: 'healthy' });
  } catch (error) {
    return Response.json({ status: 'unhealthy', error: error.message }, { status: 500 });
  }
}
```

### 8.6 Backup and Disaster Recovery

**Database Backups (Supabase):**
- **Automatic:** Daily backups (Supabase Pro plan)
- **Retention:** 7 days
- **Manual:** Weekly snapshot via `pg_dump`
- **Storage:** AWS S3 (encrypted)

**Disaster Recovery Plan:**

| Scenario | RTO (Recovery Time) | RPO (Data Loss) | Procedure |
|----------|---------------------|-----------------|-----------|
| **Database corruption** | 1 hour | <24 hours | Restore from Supabase backup |
| **Vercel outage** | 2 hours | 0 | Deploy to Railway/Fly.io |
| **Retell AI outage** | 4 hours | 0 | Switch to Bland AI (requires code change) |
| **Complete data loss** | 4 hours | <7 days | Restore from S3 backup |

**Backup Script:**
```bash
#!/bin/bash
# backup-db.sh

DATE=$(date +%Y-%m-%d)
pg_dump $DATABASE_URL | gzip > backups/db-$DATE.sql.gz

# Upload to S3
aws s3 cp backups/db-$DATE.sql.gz s3://ai-answering-service-backups/

# Keep last 30 days locally
find backups/ -mtime +30 -delete
```

---

## 9. Security and Compliance

### 9.1 Data Encryption

**In-Transit:**
- All API requests over HTTPS (TLS 1.3)
- WebSocket connections over WSS
- Database connections over SSL

**At-Rest:**
- Supabase encrypts all data at rest (AES-256)
- Retell AI recordings encrypted in storage
- Environment variables encrypted in Vercel

### 9.2 Multi-Tenant Isolation

**Database Level:**
- Row-Level Security (RLS) enforced on all tenant-specific tables
- JWT custom claims include tenant_id
- No application-level filtering (defense in depth)

**RLS Policy Example:**
```sql
-- Prevent tenant data leakage
CREATE POLICY "tenant_isolation" ON calls
FOR ALL USING (
  tenant_id = (
    SELECT tenant_id FROM user_profiles
    WHERE user_id = auth.uid()
  )
);
```

**Application Level:**
- Clerk organizations provide additional isolation
- Admin routes check role='system_admin'
- API routes extract tenant_id from JWT, never from request params

### 9.3 Authentication and Authorization

**Authentication (Clerk):**
- Multi-factor authentication (MFA) available for clients
- Session timeout: 7 days
- Token refresh: automatic
- Password requirements: 12+ chars, uppercase, lowercase, number, special

**Authorization Levels:**

| Role | Permissions |
|------|------------|
| **system_admin** (Nicholas) | Full access to all tenants, admin panel, platform metrics |
| **owner** | Full access to their tenant's data, settings, billing |
| **admin** | Read/write access to their tenant's calls/leads, no settings |
| **viewer** | Read-only access to their tenant's calls/leads |

### 9.4 API Security

**Webhook Signature Verification:**
```typescript
// Prevent unauthorized webhook posts
const signature = request.headers.get('X-Retell-Signature');
if (!verifySignature(rawBody, signature, RETELL_WEBHOOK_SECRET)) {
  return new Response('Unauthorized', { status: 401 });
}
```

**Rate Limiting (Vercel Edge Config):**
```typescript
// Prevent API abuse
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
});

const { success } = await ratelimit.limit(userId);
if (!success) {
  return new Response('Rate limit exceeded', { status: 429 });
}
```

**Input Validation (Zod):**
```typescript
// Prevent injection attacks
const result = CreateLeadSchema.safeParse(request.body);
if (!result.success) {
  return Response.json({ error: 'Invalid input' }, { status: 400 });
}
```

### 9.5 Call Recording Storage

**Compliance Considerations:**
- **Two-party consent:** AI announces recording at start of call
- **Retention policy:** Recordings kept for 90 days, then deleted
- **Access control:** Only tenant and system admin can access
- **Download restrictions:** Recordings watermarked with tenant ID

**Implementation:**
```typescript
// Delete recordings after 90 days (cron job)
export async function cleanupOldRecordings() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90);

  const { data: oldCalls } = await supabase
    .from('calls')
    .select('id, recording_url')
    .lt('created_at', cutoff.toISOString());

  for (const call of oldCalls) {
    // Delete from Retell AI storage
    await retellApi.deleteRecording(call.recording_url);

    // Update database
    await supabase
      .from('calls')
      .update({ recording_url: null })
      .eq('id', call.id);
  }
}
```

### 9.6 GDPR and Compliance

**Data Subject Rights:**
- **Right to Access:** Clients can export all their data via dashboard
- **Right to Deletion:** Soft delete (set deleted_at) for 30 days, then hard delete
- **Right to Portability:** Export to CSV/JSON
- **Right to Rectification:** Clients can update lead information

**Privacy Policy Requirements:**
- Disclose Retell AI as subprocessor
- Explain call recording and transcription
- Detail data retention periods
- Provide contact for data requests (privacy@aiansweringservice.com)

**CCPA Compliance (California):**
- "Do Not Sell My Personal Information" link
- Opt-out of marketing communications
- Disclosure of data shared with third parties (Retell AI, Twilio)

### 9.7 Security Checklist

**Pre-Launch:**
- [ ] All environment variables stored securely (Vercel secrets)
- [ ] No hardcoded secrets in code
- [ ] RLS policies tested and verified
- [ ] Webhook signatures verified
- [ ] Rate limiting implemented
- [ ] Input validation on all API routes
- [ ] HTTPS enforced (no HTTP)
- [ ] CORS configured correctly
- [ ] Security headers set (CSP, X-Frame-Options, etc.)
- [ ] Dependency audit (npm audit)
- [ ] Sentry error tracking configured
- [ ] Admin routes protected (role check)

**Security Headers (next.config.js):**
```javascript
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 10. Cost Projections

### 10.1 Infrastructure Costs by Client Count

**Assumptions:**
- Each client receives 350 calls/month
- Average call duration: 5 minutes
- 30% qualification rate (105 qualified leads per client)
- 60% of clients use SMS notifications

#### 10 Clients (Month 2-3)

| Service | Calculation | Monthly Cost |
|---------|-------------|--------------|
| **Retell AI** | 10 × 350 calls × 5 min × $0.07/min | $1,225 |
| Vercel | Pro plan | $20 |
| Supabase | Pro plan | $25 |
| Clerk | Pro + 10 orgs | $35 |
| Resend | Free tier (10k emails) | $0 |
| Twilio SMS | 6 clients × 105 SMS × $0.0075 | $47 |
| Sentry | Developer plan | $26 |
| BetterUptime | Free tier | $0 |
| **Total** | | **$1,378** |

**Revenue:** 10 × $497 = $4,970
**Gross Margin:** ($4,970 - $1,378) / $4,970 = **72.3%**

---

#### 30 Clients (Month 6 Target)

| Service | Calculation | Monthly Cost |
|---------|-------------|--------------|
| **Retell AI** | 30 × 350 calls × 5 min × $0.07/min | $3,675 |
| Vercel | Team plan | $50 |
| Supabase | Pro plan (still fits) | $25 |
| Clerk | Pro + 30 orgs | $75 |
| Resend | Starter (50k emails) | $20 |
| Twilio SMS | 18 clients × 105 SMS × $0.0075 | $142 |
| Sentry | Team plan | $26 |
| BetterUptime | Basic ($20) | $20 |
| **Total** | | **$4,033** |

**Revenue:** 30 × $497 = $14,910
**Gross Margin:** ($14,910 - $4,033) / $14,910 = **73.0%**

---

#### 60 Clients (Month 12 Target)

| Service | Calculation | Monthly Cost |
|---------|-------------|--------------|
| **Retell AI** | 60 × 350 calls × 5 min × $0.07/min | $7,350 |
| Vercel | Team plan | $50 |
| Supabase | **Team plan** ($599 for >8GB) | $599 |
| Clerk | Pro + 60 orgs | $125 |
| Resend | Pro (100k emails) | $80 |
| Twilio SMS | 36 clients × 105 SMS × $0.0075 | $283 |
| Sentry | Team plan | $26 |
| BetterUptime | Basic | $20 |
| **Total** | | **$8,533** |

**Revenue:** 60 × $497 = $29,820
**Gross Margin:** ($29,820 - $8,533) / $29,820 = **71.4%**

---

### 10.2 Break-Even Analysis

**Fixed Costs (Monthly):**
- Nicholas's time: $0 (sweat equity initially)
- Tools/subscriptions: ~$200/month (minimum infrastructure)

**Variable Costs per Client:**
- Retell AI voice: ~$122.50/month (350 calls × 5 min × $0.07)
- Other infrastructure: ~$15/month (prorated)
- **Total variable cost per client:** ~$137.50

**Break-Even Calculation:**
- Revenue per client: $497/month
- Variable cost per client: $137.50/month
- **Contribution margin:** $359.50/client
- Fixed costs: $200/month
- **Break-even:** $200 / $359.50 = **1 client**

**Conclusion:** Break-even achieved with first paying client. Every additional client is highly profitable.

### 10.3 Revenue Projections (6 Month Plan)

**Assumptions:**
- Setup fee: $2,000/client (one-time)
- Monthly subscription: $497/client
- Performance bonus: $50/lead × 5 leads/client = $250/month
- Client acquisition: 5 in months 1-2, 10 in month 3, 5 per month thereafter
- 90% retention rate (1 churn per 10 clients per month)

| Month | New Clients | Total Active | Setup Fees | Recurring | Bonuses | Total Revenue | Total Costs | Net Profit |
|-------|-------------|--------------|------------|-----------|---------|---------------|-------------|------------|
| 1 | 3 | 3 | $6,000 | $1,491 | $750 | $8,241 | $636 | $7,605 |
| 2 | 2 | 5 | $4,000 | $2,485 | $1,250 | $7,735 | $1,378 | $6,357 |
| 3 | 10 | 15 | $20,000 | $7,455 | $3,750 | $31,205 | $2,666 | $28,539 |
| 4 | 5 | 20 | $10,000 | $9,940 | $5,000 | $24,940 | $3,288 | $21,652 |
| 5 | 5 | 24 | $10,000 | $11,928 | $6,000 | $27,928 | $3,599 | $24,329 |
| 6 | 6 | 30 | $12,000 | $14,910 | $7,500 | $34,410 | $4,033 | $30,377 |
| **Total** | **31** | **30** | **$62,000** | **$48,209** | **$24,250** | **$134,459** | **$15,600** | **$118,859** |

**6-Month Totals:**
- **Total Revenue:** $134,459
- **Total Costs:** $15,600
- **Net Profit:** $118,859
- **Effective Margin:** 88.4%

**Notes:**
- Setup fees drive early profitability
- Recurring revenue builds to $14,910/month by month 6
- Performance bonuses add ~$250/client/month
- 1 client churned in month 5 (conservative estimate)

### 10.4 Unit Economics

**Per Client (Monthly):**
- Revenue: $497 (subscription) + $250 (avg bonuses) = **$747**
- Cost: $137.50 (infrastructure)
- Contribution Margin: **$609.50** (81.6%)

**Customer Lifetime Value (LTV):**
- Average client lifetime: 18 months (conservative)
- LTV = $747/month × 18 months = **$13,446**
- Setup fee: $2,000
- **Total LTV: $15,446**

**Customer Acquisition Cost (CAC):**
- Assuming $500 average CAC (ads, sales calls, setup time)
- **LTV/CAC Ratio:** $15,446 / $500 = **30.9** (excellent)

**Payback Period:**
- Setup fee covers CAC immediately
- CAC recovered in < 1 month

### 10.5 Cost Optimization Strategies

**Short-term (Months 1-6):**
1. **Negotiate with Retell AI:** Request bulk pricing at 30+ clients (potential 10-20% discount)
2. **Stay on Supabase Pro:** Optimize database queries to avoid upgrading to Team plan
3. **Use free tiers:** Resend (10k emails), BetterUptime, Sentry Developer

**Long-term (Months 6-12):**
1. **Volume Discounts:** Negotiate annual contracts with Retell AI, Twilio
2. **Database Optimization:** Implement caching (Redis) to reduce database load
3. **Self-Hosted Options:** Consider self-hosting certain services if volumes justify
4. **Reserved Capacity:** Pre-purchase Vercel bandwidth if usage spikes

**Cost Monitoring:**
- Set up alerts when costs exceed projections
- Weekly review of Retell AI usage (detect anomalies)
- Monthly review of client-level profitability (identify unprofitable clients)

---

## 11. Risk Assessment

### 11.1 Technical Risks

#### Risk 1: Retell AI Platform Dependency

**Risk Level:** HIGH
**Impact:** CRITICAL (business cannot function without voice platform)
**Likelihood:** LOW (Retell AI is well-funded, stable platform)

**Description:** If Retell AI experiences prolonged outage or goes out of business, the entire service is non-functional.

**Mitigation Strategies:**
1. **Multi-Provider Architecture:** Design webhook handlers to be voice-platform agnostic (can swap Retell for Vapi/Bland with minimal code changes)
2. **Backup Provider:** Maintain test account with Bland AI as backup (higher cost but acceptable for short-term)
3. **SLA Monitoring:** Set up alerts for Retell API downtime, have escalation plan
4. **Contractual Protection:** When revenue justifies, negotiate enterprise SLA with Retell AI
5. **Data Portability:** Store all call data locally (transcripts, recordings), not dependent on Retell for historical data

**Contingency Plan:**
- If Retell down >4 hours: Switch to Bland AI (4-8 hour migration)
- If Retell shutting down: 30-day migration to custom Twilio+OpenAI solution

---

#### Risk 2: Database Performance Degradation

**Risk Level:** MEDIUM
**Impact:** HIGH (slow dashboards, failed API requests)
**Likelihood:** MEDIUM (will occur as data grows without optimization)

**Description:** As call volume grows (60 clients = 21,000 calls/month), database queries slow down, dashboards take >5 seconds to load.

**Mitigation Strategies:**
1. **Proactive Indexing:** Index all columns used in WHERE/ORDER BY clauses
2. **Materialized Views:** Pre-calculate analytics (refresh every hour)
3. **Pagination:** Limit query results (20 per page)
4. **Caching:** Implement Redis caching for frequently accessed data (metrics)
5. **Database Monitoring:** Set up slow query alerts (>1 second)
6. **Vertical Scaling:** Upgrade Supabase tier if needed (Team plan has 8GB RAM)

**Performance Benchmarks:**
- Dashboard load time: <2 seconds (target)
- API response time: <500ms (target)
- Acceptable degradation: 3 seconds dashboard, 1 second API

---

#### Risk 3: Webhook Failures

**Risk Level:** MEDIUM
**Impact:** HIGH (lost leads, revenue loss)
**Likelihood:** MEDIUM (network issues, server downtime)

**Description:** Retell AI webhooks fail to reach Next.js API (network issue, Vercel downtime, firewall), resulting in lost call data and leads.

**Mitigation Strategies:**
1. **Retry Logic:** Implement exponential backoff retry (3 attempts)
2. **Dead Letter Queue:** Store failed webhooks in separate table for manual processing
3. **Webhook Monitoring:** Alert if no webhooks received in 30 minutes (assuming some call volume)
4. **Polling Fallback:** Daily cron job queries Retell API for recent calls, catches any missed webhooks
5. **Idempotency:** Use `retell_call_id` as unique key to prevent duplicate processing

**Recovery Plan:**
- Manual webhook replay from Retell dashboard
- CSV import for missed calls (if Retell provides data export)

---

#### Risk 4: Security Breach

**Risk Level:** LOW
**Impact:** CRITICAL (reputation damage, legal liability, GDPR fines)
**Likelihood:** LOW (with proper security measures)

**Description:** Attacker gains access to client data (call recordings, leads) through security vulnerability.

**Mitigation Strategies:**
1. **Defense in Depth:** RLS + application-level auth + Clerk session management
2. **Regular Security Audits:** Monthly review of RLS policies, auth logic
3. **Dependency Updates:** Automated Dependabot PRs for security vulnerabilities
4. **Input Validation:** Zod schemas on all API inputs
5. **Penetration Testing:** Annual security audit by third party (when revenue justifies)
6. **Incident Response Plan:** Document steps to take if breach occurs

**Incident Response Plan:**
1. Identify breach scope (which tenants affected)
2. Notify affected clients within 24 hours
3. Reset all API keys and secrets
4. Force password reset for all users
5. Engage legal counsel
6. Document for GDPR compliance

---

### 11.2 Business Risks

#### Risk 5: Low Client Retention (Churn)

**Risk Level:** MEDIUM
**Impact:** HIGH (revenue decline, profitability at risk)
**Likelihood:** MEDIUM (common in SaaS, especially with new product)

**Description:** Clients cancel after 2-3 months due to low lead quality, technical issues, or cheaper alternatives.

**Mitigation Strategies:**
1. **Onboarding Excellence:** White-glove onboarding (30-min call, custom workflow setup)
2. **Proactive Support:** Weekly check-ins for first month, monthly thereafter
3. **Quality Metrics:** Track lead quality per client, optimize workflows based on data
4. **Client Success Dashboard:** Show ROI (leads generated, estimated revenue)
5. **Annual Contracts:** Offer 10% discount for annual prepay (locks in revenue)
6. **Performance Guarantee:** If <50 qualified leads in 3 months, refund setup fee

**Early Warning Signs:**
- Client hasn't logged into dashboard in 7 days
- Client hasn't updated lead status in 14 days
- Client's qualification rate <20% (calls not qualifying)

**Churn Recovery:**
- Reach out proactively if warning signs detected
- Offer free month to stay (if valuable client)
- Exit interview to understand reason for churn

---

#### Risk 6: Slow Client Acquisition

**Risk Level:** MEDIUM
**Impact:** MEDIUM (revenue ramp slower than expected)
**Likelihood:** MEDIUM (sales takes time, competitive market)

**Description:** Only acquire 10-15 clients in 6 months instead of 30, delaying profitability and growth.

**Mitigation Strategies:**
1. **Early Sales Outreach:** Start outreach before MVP launch (build waitlist)
2. **Founder-Led Sales:** Nicholas does first 30 sales calls personally (learn objections)
3. **Referral Program:** $500 referral bonus for clients who refer new client
4. **Free Trial:** 30-day free trial (300 calls) to reduce friction
5. **Case Studies:** Document success stories with early clients
6. **Targeted Ads:** Google Ads for "HVAC answering service", "plumber missed call"

**Sales Channels:**
1. **Direct Outreach:** Call/email HVAC/plumbing businesses (100/week)
2. **Industry Forums:** Reddit (r/smallbusiness, r/HVAC), Facebook groups
3. **Partnerships:** White-label for marketing agencies serving service businesses
4. **Content Marketing:** SEO blog posts on "how to never miss a lead"

**Minimum Viable Success:**
- 10 clients by month 6 = $4,970/month recurring = $59,640 ARR
- Still profitable, proves product-market fit
- Can raise prices or add features to accelerate

---

#### Risk 7: Competitor Undercuts Pricing

**Risk Level:** LOW
**Impact:** MEDIUM (pressure to lower prices, margin compression)
**Likelihood:** LOW (market is underserved, high switching costs)

**Description:** Competitor launches similar service at $297/month, forcing price reduction.

**Mitigation Strategies:**
1. **Differentiation:** Focus on niche expertise (HVAC/plumbing-specific workflows)
2. **Performance Pricing:** Bonus model aligns incentives, justifies higher price
3. **Customer Lock-In:** High switching costs (custom workflows, training, integrations)
4. **Premium Positioning:** Target clients who value quality over price
5. **Bundle Services:** Add appointment booking, CRM integration to justify price

**Competitive Advantages:**
1. First-mover in service business niche
2. Better AI training (domain-specific)
3. Superior support (founder-led)
4. Proven ROI (case studies)

---

### 11.3 Operational Risks

#### Risk 8: Nicholas's Time Constraints

**Risk Level:** MEDIUM
**Impact:** MEDIUM (slower development, delayed features)
**Likelihood:** MEDIUM (balancing product, sales, support)

**Description:** Nicholas becomes overwhelmed juggling development, sales, and customer support, leading to burnout or quality issues.

**Mitigation Strategies:**
1. **Focus on MVP:** Ruthlessly cut scope, ship minimal viable features
2. **Automate Support:** Comprehensive docs, video tutorials, chatbot for common questions
3. **Hire Freelancers:** Outsource non-core tasks (design, content writing)
4. **Sales Automation:** Email sequences, self-service onboarding
5. **Part-Time Help:** Hire VA for customer support after 10 clients

**Time Allocation (Week):**
- Development: 20 hours (product, features, bugs)
- Sales: 10 hours (calls, emails, demos)
- Support: 5 hours (client questions, issues)
- Admin: 5 hours (billing, ops)

**Trigger to Hire:**
- 20+ clients = hire part-time customer support
- 40+ clients = hire full-time developer

---

#### Risk 9: AI Quality Issues

**Risk Level:** MEDIUM
**Impact:** HIGH (client dissatisfaction, lost leads)
**Likelihood:** MEDIUM (AI can misunderstand, give wrong info)

**Description:** AI agent misunderstands customer, provides incorrect information, or fails to capture lead details, resulting in client complaints.

**Mitigation Strategies:**
1. **Prompt Engineering:** Extensive testing of AI prompts, clear instructions
2. **Fallback to Human:** Option for caller to request human callback
3. **Call Monitoring:** Nicholas reviews 10% of calls randomly for quality
4. **Client Feedback Loop:** Weekly survey asking "How's the AI performing?"
5. **Continuous Training:** Update prompts based on failed calls
6. **Emergency Escalation:** If caller says "emergency", immediately SMS client

**Quality Metrics:**
- Customer satisfaction with AI: >4/5 average
- Call completion rate: >95% (caller doesn't hang up mid-call)
- Qualification accuracy: >85% (qualified leads are actually relevant)

---

### 11.4 Risk Summary Matrix

| Risk | Likelihood | Impact | Priority | Mitigation Effort |
|------|------------|--------|----------|-------------------|
| Retell AI Dependency | Low | Critical | HIGH | Medium (backup provider) |
| Database Performance | Medium | High | HIGH | Low (indexing, caching) |
| Webhook Failures | Medium | High | HIGH | Low (retry logic) |
| Security Breach | Low | Critical | MEDIUM | Medium (RLS, audits) |
| Client Churn | Medium | High | HIGH | High (support, quality) |
| Slow Acquisition | Medium | Medium | MEDIUM | High (sales, marketing) |
| Competitor Price War | Low | Medium | LOW | Low (differentiation) |
| Nicholas's Time | Medium | Medium | MEDIUM | Medium (automation, hiring) |
| AI Quality Issues | Medium | High | HIGH | Medium (monitoring, training) |

---

## 12. Testing and Quality Assurance

### 12.1 Testing Strategy

**Testing Pyramid:**

```
        ┌──────────────┐
        │     E2E      │  10% of tests (critical paths)
        │   (Playwright)│
        └──────────────┘
       ┌────────────────┐
       │  Integration   │  30% of tests (API, DB)
       │     (Vitest)   │
       └────────────────┘
      ┌──────────────────┐
      │   Unit Tests     │  60% of tests (functions, utils)
      │    (Vitest)      │
      └──────────────────┘
```

### 12.2 Unit Testing

**Tools:** Vitest (faster than Jest for Vite/Next.js projects)

**What to Test:**
- Pure functions (qualification scoring, data transformations)
- API route handlers (input validation, auth checks)
- Database queries (mocked Supabase)
- Utility functions (date formatting, phone number validation)

**Example Unit Test:**
```typescript
// lib/qualification/score-call.test.ts

import { describe, it, expect } from 'vitest';
import { calculateQualificationScore } from './score-call';

describe('calculateQualificationScore', () => {
  it('should score emergency calls at 100', () => {
    const workflow = {
      questions: [],
      qualification_logic: {
        min_score: 60,
        scoring: {
          urgency_emergency: 100,
        },
      },
    };

    const answers = {
      urgency: 'Emergency - No heat/AC',
      name: 'John Doe',
      address: '123 Main St',
    };

    const score = calculateQualificationScore(workflow, answers);
    expect(score).toBe(100);
  });

  it('should score routine calls lower', () => {
    const workflow = {
      questions: [],
      qualification_logic: {
        min_score: 60,
        scoring: {
          urgency_routine: 60,
          has_address: 20,
        },
      },
    };

    const answers = {
      urgency: 'Routine - This week',
      address: '123 Main St',
    };

    const score = calculateQualificationScore(workflow, answers);
    expect(score).toBe(80);
  });
});
```

**Coverage Target:** 80% code coverage for core business logic

---

### 12.3 Integration Testing

**What to Test:**
- API routes with database queries
- Webhook handling end-to-end
- Authentication flow
- Real-time subscriptions

**Example Integration Test:**
```typescript
// app/api/leads/route.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { createMocks } from 'node-mocks-http';
import { GET } from './route';

describe('GET /api/leads', () => {
  beforeEach(async () => {
    // Seed test database with known data
    await seedTestDatabase();
  });

  it('should return only tenant-specific leads', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        authorization: 'Bearer <test_jwt_with_tenant_A>',
      },
    });

    await GET(req);
    const data = await res._getJSONData();

    expect(data.leads).toHaveLength(5);
    expect(data.leads.every(l => l.tenant_id === 'tenant-A')).toBe(true);
  });

  it('should reject unauthenticated requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {}, // No auth header
    });

    await GET(req);
    expect(res._getStatusCode()).toBe(401);
  });
});
```

---

### 12.4 End-to-End Testing

**Tools:** Playwright (better for Next.js than Cypress)

**Critical User Flows:**
1. **Client Onboarding:**
   - Admin creates tenant
   - Owner receives invite
   - Owner logs in and sees empty dashboard

2. **Call Handling:**
   - Simulate Retell webhook
   - Verify call appears in dashboard
   - Verify lead created if qualified
   - Verify email notification sent

3. **Lead Management:**
   - View lead list
   - Update lead status
   - Verify status persists

**Example E2E Test:**
```typescript
// e2e/call-flow.spec.ts

import { test, expect } from '@playwright/test';

test('qualified call creates lead and sends notification', async ({ page }) => {
  // 1. Login as tenant owner
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@abchvac.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // 2. Verify dashboard loads
  await expect(page.locator('h1')).toContainText('Dashboard');

  // 3. Simulate qualified call (via API)
  await fetch('http://localhost:3000/api/webhooks/retell/call-ended', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Retell-Signature': '<valid_signature>',
    },
    body: JSON.stringify({
      event: 'call_ended',
      call_id: 'test-call-123',
      // ... full webhook payload
      custom_data: {
        qualification_score: 100,
        qualification_data: {
          name: 'Jane Doe',
          phone: '+14155551234',
          service_type: 'AC Repair',
        },
      },
    }),
  });

  // 4. Verify call appears in dashboard (realtime)
  await expect(page.locator('text=Jane Doe')).toBeVisible({ timeout: 5000 });

  // 5. Verify lead created
  await page.click('a[href="/leads"]');
  await expect(page.locator('text=Jane Doe')).toBeVisible();
  await expect(page.locator('text=AC Repair')).toBeVisible();

  // 6. Verify email sent (check email API mock or test inbox)
  // ... test email notification
});
```

**Test Frequency:**
- Run on every PR (GitHub Actions)
- Run nightly on staging environment
- Manual smoke test before production deploy

---

### 12.5 Performance Testing

**Tools:** k6 (load testing), Lighthouse (frontend performance)

**Load Test Scenarios:**

1. **Concurrent Webhook Load:**
   - Simulate 50 concurrent Retell webhooks
   - Verify all processed within 5 seconds
   - Verify no database deadlocks

2. **Dashboard Load:**
   - Simulate 100 concurrent users loading dashboard
   - Verify <2 second load time
   - Verify database connection pool doesn't exhaust

**Example k6 Load Test:**
```javascript
// k6-load-test.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },  // Ramp up to 50 users
    { duration: '3m', target: 50 },  // Stay at 50 users
    { duration: '1m', target: 0 },   // Ramp down
  ],
};

export default function () {
  // Simulate webhook
  const payload = JSON.stringify({
    event: 'call_ended',
    call_id: `test-${__VU}-${__ITER}`,
    // ... webhook payload
  });

  const res = http.post(
    'https://staging.aiansweringservice.com/api/webhooks/retell/call-ended',
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Retell-Signature': '<signature>',
      },
    }
  );

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

**Performance Benchmarks:**
| Metric | Target | Acceptable | Unacceptable |
|--------|--------|------------|--------------|
| Dashboard load time | <2s | 2-3s | >3s |
| API response time (p95) | <500ms | 500ms-1s | >1s |
| Webhook processing time | <1s | 1-2s | >2s |
| Database query time (p95) | <100ms | 100-500ms | >500ms |
| Concurrent webhooks | 50/sec | 20/sec | <10/sec |

---

### 12.6 Manual Testing Checklist

**Pre-Launch (MVP):**
- [ ] Test onboarding flow (create tenant, invite owner, login)
- [ ] Make test calls to each business type (HVAC, plumbing, locksmith, garage door)
- [ ] Verify calls appear in dashboard within 30 seconds
- [ ] Verify qualified calls create leads
- [ ] Verify email notifications sent correctly
- [ ] Verify SMS notifications for emergencies
- [ ] Test call recording playback
- [ ] Test transcript readability
- [ ] Verify tenant isolation (Client A can't see Client B's data)
- [ ] Test on mobile (iPhone, Android)
- [ ] Test on multiple browsers (Chrome, Safari, Firefox)
- [ ] Verify error handling (simulate webhook failure, database timeout)
- [ ] Test admin panel (create tenant, view all tenants)

**Post-Launch (Weekly):**
- [ ] Review 10 random calls for AI quality
- [ ] Check for any error spikes in Sentry
- [ ] Verify all webhooks processed successfully
- [ ] Check database slow query log
- [ ] Verify email delivery rate >95%
- [ ] Test dashboard load time
- [ ] Review client feedback/support tickets

---

### 12.7 Quality Metrics

**Code Quality:**
- TypeScript strict mode enabled
- ESLint warnings: 0
- Test coverage: >80% for core business logic
- No hardcoded secrets
- No TODO comments in main branch

**Service Quality:**
- Uptime: >99.5% (max 3.6 hours downtime/month)
- Call answer rate: >99%
- Webhook processing success rate: >99%
- Email delivery rate: >95%
- Dashboard load time (p95): <2 seconds

**Client Satisfaction:**
- NPS score: >50
- Support ticket resolution time: <24 hours
- Lead quality score (client-reported): >85%
- Client retention: >90% (monthly churn <10%)

---

## Conclusion

This technical specification provides a comprehensive blueprint for building an AI Answering Service MVP that can scale to 30-60 clients within 6 months. The document balances technical rigor with pragmatic execution, focusing on:

1. **Speed to Market:** 2-4 week MVP timeline using modern, proven technologies
2. **Profitability:** 70%+ gross margins with transparent cost projections
3. **Security:** Database-level multi-tenancy with Row-Level Security
4. **Scalability:** Architecture supports 100+ clients without major refactoring
5. **Risk Management:** Identified and mitigated key technical and business risks

**Next Steps:**
1. Review this PRD with technical advisors/mentors
2. Set up development environment (Week 1, Days 1-2)
3. Begin MVP development following the 4-week roadmap
4. Launch with first 3 clients by end of Week 4
5. Iterate based on client feedback

**Key Success Factors:**
- **Focus:** Ship MVP quickly, resist feature creep
- **Quality:** Multi-tenant isolation must be bulletproof
- **Support:** White-glove onboarding for early clients
- **Metrics:** Track everything, optimize based on data
- **Iteration:** Weekly releases, continuous improvement

---

**Document Control:**
- **Version:** 1.0
- **Last Updated:** January 12, 2026
- **Next Review:** February 12, 2026 (post-MVP launch)
- **Owner:** Nicholas Horton
- **Status:** Ready for Development

---

## Appendix A: Technology Reference Links

### Architecture Patterns
- [Next.js Multi-Tenant Guide](https://nextjs.org/docs/app/guides/multi-tenant)
- [Next.js Architecture in 2026](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Vercel Platforms - Multi-Tenant Example](https://github.com/vercel/platforms)

### Database & Security
- [Supabase Row Level Security Docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Best Practices for Supabase](https://www.leanware.co/insights/supabase-best-practices)
- [Multi-Tenant Applications with RLS on Supabase](https://www.antstack.com/blog/multi-tenant-applications-with-rls-on-supabase-postgress/)

### Voice AI
- [Retell AI Documentation](https://docs.retellai.com/general/introduction)
- [Retell AI Voice API Integration](https://www.retellai.com/blog/how-to-integrate-phone-ai-agents-with-your-existing-api-systems)
- [Top AI Voice Agent Platforms Guide (2026)](https://www.vellum.ai/blog/ai-voice-agent-platforms-guide)

---

**End of Technical Specification Document**