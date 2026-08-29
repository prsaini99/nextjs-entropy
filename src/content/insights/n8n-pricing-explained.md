---
title: "n8n Pricing Explained: Cloud vs Self-Hosted, and the Costs Nobody Puts on the Pricing Page"
description: "n8n's pricing confuses people because it mixes a metered cloud product with genuinely free self-hosting. Here is what each plan actually includes, what self-hosting really costs, and the point where paying someone to run it beats both."
date: "2026-08-29"
---

The top result for n8n pricing questions, for months now, has been a Reddit thread titled "N8N Pricing Confusion." That is not an accident. n8n sells the same product three ways: a metered cloud service, a free self-hosted Community Edition, and an enterprise tier, and the pricing page does not make it obvious which one you are supposed to want.

This article prices all three, including the costs n8n has no reason to advertise.

## The one concept that makes n8n pricing make sense

n8n bills per **execution**: one run of a workflow counts once, no matter how many steps it contains. A 40-step monster that enriches, scores, routes and syncs across six systems costs exactly the same execution as a two-step notification. This is the opposite of Zapier, which bills per step, and it is why n8n gets dramatically cheaper as your workflows get more sophisticated. We covered that head-to-head in [n8n vs Zapier](/insights/n8n-vs-zapier-cost-comparison); this article is about what n8n itself costs.

## n8n Cloud: the metered route

Current published cloud plans:

| Plan | Price | Executions/month | Notes |
|---|---|---|---|
| Starter | 20 EUR/month | 2,500 | Every integration, unlimited workflows and users |
| Pro | 50 EUR/month | 10,000 | Adds admin roles, longer execution history |
| Business | 667 EUR/month | 40,000 | SSO, environments, dedicated support |

Two things the table undersells.

First, nothing meaningful is feature-gated at Starter. Unlimited users, unlimited workflow count, all 500+ integrations. You are paying for executions and support, not for permission to use the product. This is unusual and worth crediting.

Second, look at the jump between Pro and Business: 13x the price for 4x the executions. That cliff exists because the customers who need SSO and environments will pay it. If you are approaching Pro's 10,000-execution ceiling and do not need the enterprise features, that cliff is the signal to consider the second route.

## Self-hosted: free software, non-free operation

The Community Edition is the real product, self-hostable, free, no execution limits. Run 10,000 executions or 10 million; the software does not care.

What you pay instead:

**The server.** n8n runs comfortably on a small VPS. A 2 vCPU / 4 GB instance from Hetzner, DigitalOcean or similar costs **5 to 25 USD a month** and will handle execution volumes that would cost hundreds on cloud metering. This is the number self-hosting advocates quote, and it is accurate as far as it goes.

**The operation.** This is the part Reddit threads discover six months in:

- **Updates.** n8n ships releases constantly. Skipping updates means missing nodes and security patches; applying them means the occasional breaking change landing on a Tuesday.
- **Backups.** Your workflows and credentials live in n8n's database. No backup means one bad disk deletes your company's automation layer.
- **Credentials security.** A self-hosted n8n holds API keys to everything it touches: your CRM, your email, your payment provider. An exposed instance is not a leaked tool, it is a leaked company. HTTPS, authentication and network hygiene are on you.
- **Debugging at 2am.** When a workflow that invoices your customers stops running, cloud customers file a ticket. Self-hosters read Docker logs.

None of this is hard for a team that already operates servers. All of it is real work for a team that does not. Priced at even a few hours of engineer time a month, "free" self-hosting costs more than Starter and less than Business, which is exactly why both options continue to exist.

## The honest decision table

| Your situation | Right answer |
|---|---|
| Testing whether n8n fits at all | Cloud Starter, 20 EUR, decide within a month |
| Steady volume under 10,000 executions | Cloud Pro. 50 EUR/month is below the cost of thinking about servers |
| High volume, in-house DevOps capacity | Self-host. The economics are unbeatable when the operation is genuinely free to you |
| High volume, no DevOps capacity | Self-host with someone else operating it, which is the option n8n's pricing page understandably does not mention |

## That fourth row is where we come in

We build and operate n8n automations for clients: [marketing automation](/martech/marketing-automation), lead routing, WhatsApp flows, invoice pipelines. The arrangement is simple: the instance runs on infrastructure you control, we build the workflows, harden the setup, apply the updates and carry the 2am pager. You get self-hosted economics without hiring for the operation, at a flat project price rather than a meter, and the whole thing is yours: if we disappear tomorrow, your automation keeps running.

That model is not right for everyone. Under a few thousand executions a month, n8n Cloud is cheaper than any arrangement involving another company, and you should just use it. The build-and-operate case starts where the Business-tier cliff starts, or where the workflows themselves are beyond what you want to build in-house: multi-system integrations, AI steps that need prompt engineering, flows where a silent failure costs real money.

If you are staring at that Pro-to-Business jump, or at a Reddit thread at 2am, [send us your execution volume and what you are automating](/contact-us). We will tell you which row of the table you are in, including when the answer is "stay on Cloud, it is fine."

Related: [n8n vs Zapier](/insights/n8n-vs-zapier-cost-comparison) for the tool choice itself, and [AI agent vs chatbot](/insights/ai-agent-vs-chatbot) for where automation ends and agents begin.

---

*Pricing verified against n8n's published pricing in August 2026. Plans and limits change; re-check before committing. Stackbinary builds and operates automation for clients, which colours our view of the fourth row. The first three rows are the advice we give anyway.*
