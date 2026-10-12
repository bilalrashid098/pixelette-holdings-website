-- ============================================================================
-- partnership_enquiries — founder partnership form at /apply
--
-- Separate from contact_enquiries: different fields (venture stage, sector,
-- capital band, constraint), and a different visitor path. The apply page
-- still opens mailto for the human inbox; this table is the durable backup
-- so an enquiry is not lost if the visitor never sends the email.
--
-- Access control matches contact_enquiries: RLS on, no policies; anon and
-- authenticated hold nothing; service_role INSERT only.
-- ============================================================================

create table if not exists public.partnership_enquiries (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  name        text        not null,
  email       text        not null,
  company     text        not null,
  website     text,
  market      text        not null,
  sector      text        not null,
  stage       text        not null,
  capital     text,
  description text        not null,
  biggest_constraint text not null,

  -- Optional carry from the browser-only /startups assessment.
  assessment_need      text,
  assessment_structure text,
  assessment_context   text,

  marketing_opt_in boolean not null default false,
  source      text        not null default 'pixeletteholdings.com/apply',

  constraint partnership_enquiries_name_length
    check (char_length(name) between 1 and 120),
  constraint partnership_enquiries_email_length
    check (char_length(email) between 3 and 200),
  constraint partnership_enquiries_company_length
    check (char_length(company) between 1 and 160),
  constraint partnership_enquiries_website_length
    check (website is null or char_length(website) <= 300),
  constraint partnership_enquiries_market_length
    check (char_length(market) between 1 and 120),
  constraint partnership_enquiries_sector_length
    check (char_length(sector) between 1 and 120),
  constraint partnership_enquiries_stage_length
    check (char_length(stage) between 1 and 120),
  constraint partnership_enquiries_capital_length
    check (capital is null or char_length(capital) <= 120),
  constraint partnership_enquiries_description_length
    check (char_length(description) between 1 and 4000),
  constraint partnership_enquiries_biggest_constraint_length
    check (char_length(biggest_constraint) between 1 and 120),
  constraint partnership_enquiries_assessment_need_length
    check (assessment_need is null or char_length(assessment_need) <= 200),
  constraint partnership_enquiries_assessment_structure_length
    check (assessment_structure is null or char_length(assessment_structure) <= 200),
  constraint partnership_enquiries_assessment_context_length
    check (assessment_context is null or char_length(assessment_context) <= 200),
  constraint partnership_enquiries_source_length
    check (char_length(source) between 1 and 200)
);

comment on table public.partnership_enquiries is
  'Founder partnership enquiries from /apply. Contains personal data. RLS on with no policies; service_role INSERT only. Mailto remains the human inbox path; this row is the durable backup.';

comment on column public.partnership_enquiries.biggest_constraint is
  'Biggest current constraint selected on the form.';
comment on column public.partnership_enquiries.marketing_opt_in is
  'Optional insights emails consent. Unticked by default; not required to send an enquiry.';

create index if not exists partnership_enquiries_created_at_idx
  on public.partnership_enquiries (created_at desc);

alter table public.partnership_enquiries enable row level security;

revoke all on table public.partnership_enquiries from public;
revoke all on table public.partnership_enquiries from anon;
revoke all on table public.partnership_enquiries from authenticated;

revoke all on table public.partnership_enquiries from service_role;
grant insert on table public.partnership_enquiries to service_role;
