---
title: "Twenty CRM vs Attio vs HubSpot: The Open-Source Route (2026)"
description: "Twenty CRM vs Attio vs HubSpot on features, self-hosting and real cost at 10 and 50 users: does an open-source CRM alternative to HubSpot hold up in 2026?"
date: "2026-09-08"
---

Twenty CRM vs Attio is a question about how much CRM you want to run yourself. Twenty is an open-source CRM (AGPL v3) you can self-host for free or rent as a cloud plan from $9 per user a month. Attio is a managed, data-model-first CRM from $35 per user a month after its July 2026 price change. HubSpot is the full platform, with Sales Hub Professional at $90 per seat plus a mandatory $1,500 onboarding fee. For a team of ten, the annual gap runs from a few hundred dollars of hosting to $12,300.

Prices were checked against the vendors' pricing pages and 2026 third-party guides in September 2026. Stackbinary builds custom CRM systems and operates its own voice AI platform (Oye Hello), so read the closing section knowing that.

## What each one is

**Twenty** is the most-starred open-source CRM on GitHub. The community edition is the same product as the cloud edition, with no feature gating: unlimited custom objects, fields, views and records, workflows, AI agents and a REST and GraphQL API. Cloud Pro is $9 per user a month on annual billing; Organization at $19 adds SAML and OIDC single sign-on, row-level permissions and a custom domain; Enterprise starts at $50,000 a year. The AGPL licence is free for internal use; distributing a product built on Twenty needs a commercial licence.

**Attio** is a managed CRM built around a flexible data model. Free covers three seats and three custom objects. Plus is $35 per user a month on annual billing ($44 monthly), capped at ten seats and five custom objects. Pro is $79 ($99 monthly) with unlimited seats, twelve custom objects, call intelligence, sequences and advanced reporting. Enterprise is custom, annual only, and the first tier with SSO. Guides written before July 2026 still quote $29 and $69; those are the old prices.

**HubSpot** is the incumbent platform. Sales Hub Starter is $15 per seat on annual billing ($20 monthly, with promotional pricing for new customers), Professional is $90 plus $1,500 onboarding, Enterprise is $150 plus $3,500. The per-seat comparison against Pipedrive, Salesforce and Brevo is in [HubSpot vs Pipedrive vs Salesforce vs Brevo pricing](/insights/hubspot-vs-pipedrive-vs-salesforce-vs-brevo-pricing).

## Feature comparison

| Capability | Twenty (self-hosted or cloud) | Attio | HubSpot Sales Hub |
|---|---|---|---|
| Custom objects | Unlimited on every edition | 3 on Free, 5 on Plus, 12 on Pro | Professional and above |
| Automation | Workflows on every edition, 50 workflow credits a year on Pro | Workflows on every tier, metered by workspace credits | Sequences and workflows from Professional |
| Reporting | Views, dashboards and charts | Reporting on Plus, advanced on Pro | Dashboards on every tier, custom reports from Professional |
| AI | AI agents with custom skills on every edition | Ask Attio on every tier, credit-metered per seat and per workspace | HubSpot Credits bundled by tier (3,000 on Professional) |
| Integrations | Email and calendar sync, API, webhooks, growing marketplace | Native email, calendar, Slack, enrichment, Zapier | The largest ecosystem of the three |
| API | REST and GraphQL on every edition | REST on every tier | REST, rate-limited by tier |
| SSO | Organization edition, or configure it yourself when self-hosting | Enterprise only | Enterprise only |
| Data location | Your own servers or region when self-hosted | Attio's cloud | HubSpot's data centres, region chosen at signup |

The last column decides most evaluations. Twenty is the only option here where the database is yours in the plain sense: on your server, in your region, under your backups.

## Total cost at 10 and 50 users

Annual billing, year one, USD. The self-hosted line prices a small virtual machine, a managed Postgres database and object storage at typical cloud list rates; it does not include the time someone spends running it, which is the subject of the next section.

| Route | 10 users | 50 users |
|---|---|---|
| Twenty self-hosted | $0 licence + about $500 to $1,000 hosting | $0 licence + about $1,200 to $2,000 hosting |
| Twenty Cloud Pro | $1,080 | $5,400 |
| Twenty Cloud Organization (SSO) | $2,280 | $11,400 |
| Attio Plus (max 10 seats) | $4,200 | not available above 10 seats |
| Attio Pro | $9,480 | $47,400 |
| HubSpot Sales Hub Starter | $1,800 | $9,000 |
| HubSpot Sales Hub Professional | $12,300 including onboarding | $55,500 including onboarding |

Two things stand out. Attio's Plus tier caps at ten seats, so a team that grows past it moves to Pro and more than doubles its per-seat price. And Twenty Cloud at $9 sits below HubSpot Starter while including custom objects and workflows that HubSpot reserves for Professional.

## What self-hosting actually involves

Self-hosting Twenty is a Docker Compose deployment: the application, a Postgres database, Redis and a storage bucket. Getting it running takes an afternoon. Keeping it running is the part the pricing tables skip.

**Updates.** Releases are frequent and may carry a database migration. Someone reads the release notes, takes a backup, pulls the new image and checks the workspace.

**Backups and restore drills.** A nightly database dump to a separate region is the minimum, and a backup you have never restored is not a backup; test it quarterly.

**SSO, email and domains.** Single sign-on, transactional email, a custom domain with a renewing certificate, and the credentials for mailbox sync all need setting up and then rotating.

**Monitoring and uptime.** Health checks, disk alerts, error logging. The CRM is the system your sales team opens first every morning and needs to be treated as production.

None of this is difficult for a team that already runs infrastructure. For a team that does not, it is the reason Twenty Cloud exists, and the reason a build-and-run arrangement is often the better version of the open-source route.

## Who should choose which

**Choose Twenty self-hosted** if your data must stay on your own infrastructure or in a specific region, someone can run a Docker deployment, and you want a CRM you can extend at the code level. It is the only option here with no per-seat meter.

**Choose Twenty Cloud** if you want the open-source data model and price without the operations. At $9 per user it is the cheapest managed CRM here with custom objects included.

**Choose Attio** if you want a polished managed product with a flexible data model, your team will stay under ten seats, and enrichment and call intelligence are worth the Pro price.

**Choose HubSpot** if you need sales, marketing and service on one platform with the deepest integration ecosystem, and your budget already accepts Professional pricing. The [rent-versus-own analysis](/insights/hubspot-alternatives-rent-vs-own) covers the onboarding fees and contact tiers behind that budget.

## Owning the CRM, with our team running it

The fourth route is a CRM you own that someone else operates: Twenty deployed and run on your infrastructure, or a system built to your process where Twenty's object model does not fit. Four facts about it.

**Full data autonomy.** Your customer records, call recordings, messages and pipeline live in your own database and your own cloud account, not in a vendor's tenant. Region, retention and access are yours to set.

**Only the features you use.** A per-seat plan bills you for the bundle. An owned system carries the workflows you actually run and nothing else, and it does not raise its price when a tier limit is crossed.

**Your own system, our team managing it.** Stackbinary builds it and runs it: hosting, monitoring, backups, updates and model changes. Owning does not mean staffing an engineering team.

**Lower cost and fast delivery.** A fixed-price proposal within 48 hours, 55+ shipped products, delivery in weeks, and the IP assigned to you on payment. Against the 50-user column above, the ownership route is usually cheaper than Attio Pro or HubSpot Professional inside year one.

The SaaS route is still the right answer for a small team with an ordinary pipeline, low volume and no integration or residency needs; Twenty Cloud or Attio Plus will serve that team well. If your seat count or your data rules are pulling you off those tiers, [send us the shape of your process](/contact-us) and we will price both routes. This work sits under [custom software development](/services/custom-software-development).

## FAQ

### Is Twenty CRM really free?

Yes, the self-hosted community edition is free under the AGPL v3 licence and is the same product as the cloud edition with no feature gating. You pay for your own hosting, typically $40 to $170 a month depending on team size, and for the time it takes to run updates, backups and monitoring. Twenty Cloud starts at $9 per user a month if you would rather not do that.

### How does Attio pricing compare to Twenty?

Attio Plus is $35 per user a month on annual billing and Pro is $79, against Twenty Cloud at $9 and $19. For ten users that is $4,200 on Attio Plus versus $1,080 on Twenty Pro. Attio includes enrichment and call intelligence that Twenty does not, and Attio's AI features draw on a monthly credit allowance on top of the seat price.

### Can Twenty replace HubSpot?

For a sales team, usually yes: custom objects, pipelines, workflows, email and calendar sync and an API are all present. What Twenty does not replace is HubSpot's marketing and service hubs and its integration marketplace. If you also use HubSpot for landing pages, email campaigns and ticketing, you would be replacing three products, not one.

### What does self-hosting a CRM cost in staff time?

Plan for a few hours a month once it is running: applying updates with a backup taken first, checking monitoring, rotating credentials and a quarterly restore test. The initial deployment is an afternoon for someone comfortable with Docker; if nobody on the team fits that description, use the cloud edition or have it operated for you.

---

*Prices verified against vendor pricing pages and 2026 third-party guides in September 2026. Stackbinary builds and operates custom CRM systems, which competes with every product named here.*
