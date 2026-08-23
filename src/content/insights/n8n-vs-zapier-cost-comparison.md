---
title: "n8n vs Zapier: The Billing Model Is the Whole Decision"
description: "Zapier bills per step, n8n bills per workflow run. That single difference decides which one is cheaper for you, and it is not close. Current pricing, worked examples, and when building your own beats both."
date: "2026-08-23"
---

Most comparisons of these two tools spend a thousand words on interface screenshots and node counts. That is the wrong axis. The two products are priced on fundamentally different units, and once your automation volume passes a certain point, that difference swamps every other consideration.

Here is the sentence that matters: **Zapier charges you per successful step. n8n charges you per workflow run, no matter how many steps are in it.**

Everything below follows from that.

## What each one actually counts

Zapier counts a "task" every time it successfully completes a unit of work. A multi-step Zap that fires a trigger, filters, formats, then writes to three systems will bill you for the three writes. Zapier does not charge for the trigger itself, and it does not charge for Filters, Paths, Formatter, Delay, or its built-in data tools. It does charge for AI by Zapier steps and Code by Zapier steps.

n8n counts an execution. Their documentation is blunt about it: a single run of your workflow is one execution regardless of how many steps it contains or how much data moves through it.

So a workflow with three billable actions costs you three units in Zapier and one unit in n8n. A workflow with twenty billable actions costs you twenty units in Zapier and, still, one unit in n8n.

## Current pricing, August 2026

| | Entry | Mid | Upper |
|---|---|---|---|
| **n8n** (per execution) | Starter, 20 EUR/mo, 2,500 executions | Pro, 50 EUR/mo, 10,000 executions | Business, 667 EUR/mo, 40,000 executions |
| **Zapier** (per task) | Free, $0, 100 tasks | Pro, from $19.99/mo annual, 750 tasks | Team, from $69/mo annual, 2,000 tasks |

Two things to note before you compare the columns.

First, n8n's cloud plans include unlimited users, unlimited workflows and every integration at every tier. Zapier gates premium apps and multi-step Zaps behind Pro, and SSO plus shared folders behind Team.

Second, Zapier's plan names hide enormous ranges. Pro runs from $19.99/mo annual at 750 tasks all the way to $3,389/mo at two million tasks. Team runs from $69/mo to $3,999/mo. The headline price tells you almost nothing until you fix your task volume.

n8n also publishes a free, self-hostable Community Edition. That is not a trial. It is the real product, and for teams with somewhere to run it, the marginal cost of an execution is your server bill.

## The worked example

Take a lead-routing workflow that runs when a form is submitted. It enriches the contact, scores it, writes to your CRM, posts to Slack, adds a row to a sheet, and sends a confirmation email. Six billable actions.

Run that 1,000 times a month.

- **Zapier:** 6,000 tasks. That lands you above the entry Pro tiers and into a materially more expensive band.
- **n8n:** 1,000 executions. Comfortably inside the 20 EUR Starter plan, with 1,500 executions to spare.

Now run it 5,000 times a month.

- **Zapier:** 30,000 tasks.
- **n8n:** 5,000 executions. Still inside the 50 EUR Pro plan.

The gap is not linear in your favour or theirs. It is a multiplier equal to the number of billable steps in your average workflow. If your automations are two steps long, the models are close and Zapier's app catalogue probably wins. If your automations are ten steps long, n8n is roughly an order of magnitude cheaper on units, and the decision makes itself.

## Where Zapier genuinely wins

We would be doing you a disservice by pretending this is one-sided. Zapier is the better choice when:

- **Your workflows are short.** Two or three steps, and the per-task model barely bites.
- **You need an obscure integration today.** Zapier's app catalogue is larger, and "it already exists" beats "we can build it" when you need it this afternoon.
- **Nobody on the team wants to think about infrastructure.** Zapier has no self-hosting story because it does not need one. That is a feature for a lot of teams.
- **The people building automations are not technical.** n8n's node editor is friendlier than code, but it is meaningfully more complex than Zapier's linear builder.

Zapier's Filters, Paths and Formatter being free is also a real design choice in your favour. You can do a surprising amount of branching and data cleanup without touching your task count.

## Where n8n genuinely wins

- **Long workflows.** As above. This is the big one.
- **High volume.** The execution model means your cost scales with how often things happen, not how much they do.
- **Self-hosting.** Data residency, air-gapped environments, or just not wanting customer records transiting a third party.
- **Code when you need it.** n8n lets you drop into JavaScript or Python inside a workflow without it being a billable event in the way Code by Zapier is.

## The third option nobody in a comparison post wants to mention

We build custom automation systems, so treat what follows as interested but honest.

Both of these tools are rented infrastructure with a metered unit. That is exactly the right trade when your volume is uncertain, your processes are still changing, or the automation is not core to how you make money. Renting is not a failure state. For most teams, most of the time, one of these two is the correct answer and you should stop reading here.

The build case appears in a narrow band, and it is worth naming precisely:

1. **The unit economics have inverted.** You are paying four figures a month, the workflows are stable, and the meter is now a tax on volume you already know you will have.
2. **The workflow is the product.** If the automation is what your customers are actually paying for, running it on someone else's metered platform puts a variable cost and a dependency at the centre of your margin.
3. **You have hit a real ceiling.** Not "the UI is annoying," but a hard limit: latency you cannot tune, a state machine you cannot express, compliance you cannot satisfy on shared infrastructure.

If none of those three is true for you, stay on the SaaS. Rebuilding a working Zapier setup because it feels inelegant is a good way to spend $20,000 replacing a $50 subscription.

If one or more is true, the maths changes. A purpose-built automation service running on your own infrastructure has near-zero marginal cost per run. The question becomes whether the build cost amortises against the meter you are currently feeding, and at four figures a month it often does inside a year.

## How to actually decide

Do this before you read another comparison:

1. Count the **billable steps** in your three highest-volume workflows. For Zapier, exclude triggers, filters, paths, formatter and delays.
2. Multiply by your monthly run count. That is your Zapier task number.
3. Take just the run count. That is your n8n execution number.
4. Price both against the tables above.

If the two numbers are within about 3x of each other, pick on ergonomics and integrations, because the cost difference will not decide anything. If they are 5x or more apart, the billing model has already made the decision and you should follow it.

## What we do with this

We are an AI and automation engineering team, and we deploy all three approaches depending on which one the numbers support. A good chunk of our work is [AI automation and integration](/services/ai-integration-services) that sits alongside a client's existing Zapier or n8n setup rather than replacing it, because ripping out working automation is rarely where the return is.

Where we do end up building, it is usually because a client crossed one of the three thresholds above, most often the second one: the automation became the product. If you want the honest version of that maths for your own setup, including the case where we tell you to stay where you are, [start a conversation](/contact-us).

---

*Pricing above was verified against n8n's and Zapier's published pricing pages in August 2026. Both vendors change plans and tier boundaries regularly, so re-check before committing. We build custom automation systems, which is a competing approach to both products named here, and we have tried to be explicit throughout about where renting beats building.*
