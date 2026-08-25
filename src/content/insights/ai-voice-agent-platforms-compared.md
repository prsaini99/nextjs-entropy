---
title: "Retell vs Vapi vs Bland vs Synthflow: The Per-Minute Rates Are Not Comparable"
description: "Four voice AI platforms quote per-minute pricing that includes wildly different things. Here is what each rate actually covers, the all-in cost at 1,000 minutes a month, and the one platform that has quietly left the self-serve market."
date: "2026-08-23"
---

If you are comparing voice AI platforms on their headline per-minute rate, you are comparing numbers that measure different things. One vendor's rate covers the language model, speech recognition and voice synthesis. Another's covers hosting and nothing else. A third has stopped publishing per-minute pricing entirely.

This post fixes that. Current published pricing, what each rate includes, and an all-in comparison at a realistic volume.

## What each headline rate actually covers

| Platform | Headline rate | What is inside it | What you add |
|---|---|---|---|
| **Vapi** | $0.05/min | Vapi hosting only | LLM, STT, TTS, telephony |
| **Retell** | $0.055/min voice infra | Voice infrastructure | LLM, TTS, telephony, priced separately and published |
| **Bland** | $0.11 to $0.14/min | LLM, real-time STT, premium TTS | Telephony transfers, platform fee at higher tiers |
| **Synthflow** | Not published | Enterprise contract from $30,000/year | Scoped per deal |

That table is the entire point of this article. Vapi at $0.05 and Bland at $0.14 are not a 2.8x difference in price. They are a difference in what is bundled.

## The all-in comparison

Assume 1,000 minutes a month of inbound US calling, one concurrent line requirement well inside every free tier.

**Bland, Start plan.** $0.14/min all-inclusive, no platform fee, inbound number included. **About $140/month.** The language model, speech recognition and text to speech are all inside that rate.

**Retell, component priced.** Voice infrastructure $0.055, platform TTS $0.015, telephony $0.015 on US Twilio, plus your chosen model. Retell publishes model rates directly:

- With GPT 4.1 at $0.045/min: $0.13/min, so **about $132/month** including a $2 phone number.
- With Claude 5 Sonnet at $0.08/min: $0.165/min, so **about $167/month.**
- With GPT 5.5 at $0.16/min: $0.245/min, so **about $247/month.**

Retell also charges no platform fee, and layers optional add-ons at $0.005/min each for knowledge base, advanced denoising and safety guardrails, $0.01/min for PII removal, and $0.10/min for AI quality assurance after the first 100 minutes.

**Vapi.** $0.05/min hosting, so $50 of Vapi, plus whatever your STT, LLM, TTS and telephony providers charge. Vapi passes model costs through at cost, and charges nothing at all on top if you bring your own API keys. Ten concurrent lines are included, additional lines are $10 each per month.

We are deliberately not going to invent a total for Vapi, because the honest answer is that it depends entirely on which providers you pick. What we can say is the structural point: **Vapi's advantage is not the $0.05 headline, it is that there is no markup between you and your providers.** At low volume that saves you very little. At high volume, when you can negotiate directly with a speech vendor or run a model you already pay for, it is the cheapest architecture of the four by a clear margin.

**Synthflow.** Not applicable at this volume. See below.

## Synthflow has left the self-serve market

This is the finding most comparison posts have not caught up with. Synthflow no longer publishes per-minute rates or self-serve tiers. Their pricing page states that enterprise contracts start at $30,000 annually, with final pricing scoped around call volume, concurrency, telephony setup, integrations, security requirements and launch support.

If you arrived here searching "Synthflow vs Vapi," that is your answer, and it is a category difference rather than a pricing difference. You are comparing a $30,000 minimum annual commitment with managed launch support against a self-serve tool you can start using this afternoon for the price of a coffee. Both are legitimate products. They are not competing for the same buyer.

## Choosing between the three that remain

**Pick Bland if** you want one number to reason about. Everything is in the per-minute rate, the Start plan has no platform fee, and you can model your costs on a napkin. The tier structure rewards volume: Build at $299/month drops you to $0.12/min, which only beats Start past roughly 15,000 minutes a month. Scale at $499/month and $0.11/min only beats Build past roughly 20,000 minutes a month. Do not upgrade early, the platform fee will eat the saving.

**Pick Retell if** you want to tune the cost/quality trade-off deliberately. Because every component is separately priced and published, you can see exactly what a model upgrade costs you per minute. Moving from GPT 4.1 to GPT 5.5 nearly doubles your all-in rate, and Retell is the only one of the four that makes that trade legible before you commit. The granular add-ons are also genuinely useful if you need PII removal or guardrails on some call flows but not others.

**Pick Vapi if** you have engineering capacity and volume. Bring your own keys, own your provider relationships, and pay Vapi purely for orchestration. This is the right answer for teams who will eventually want to swap a model or a voice vendor without renegotiating their whole stack.

## The things that will actually cost you money

Per-minute rates are the part of a voice deployment everyone models, and rarely the part that goes wrong. From our own deployments, the costs that surprise people:

**Concurrency, not volume.** Your bill is driven by total minutes, but your architecture is driven by peak simultaneous calls. Retell includes 20 concurrent calls and charges $8 per additional call per month. Vapi includes 10 and charges $10 per line. Bland's tiers step from 10 to 50 to 100. A business with 800 minutes a month spread evenly is a completely different deployment from one with 800 minutes that all arrive between 9am and 10am on Monday.

**Transfer minutes.** Bland charges separately for transfers, from $0.05/transfer minute on Start down to $0.03 on Scale. If your agent's main job is qualifying and handing off to a human, transfer time may be a large fraction of your bill and it is easy to leave out of a model.

**Failed and abandoned calls.** You pay for connected time regardless of whether the call accomplished anything. An agent that misroutes 20% of calls is not 20% less effective, it is 20% less effective and costs the same.

**The daily call caps.** Bland's Start plan caps at 100 calls per day and Build at 2,000. These are not soft limits you discover gradually. If you launch a campaign that exceeds them, calls stop.

## When custom is the right answer, and when it is not

We build [custom AI voice agents](/services/ai-voice-agent-development), so read the following knowing that.

For most teams, one of the three self-serve platforms above is correct and you should use it. They have solved telephony, interruption handling, latency and failover, and those are genuinely hard problems that took real engineering to get right. Rebuilding that to save a few cents a minute is a bad trade.

The build case is narrow and specific:

1. **Volume where the meter dominates.** At tens of thousands of minutes monthly, the difference between paying an orchestration markup and running your own pipeline becomes a real line item.
2. **Latency or behaviour you cannot tune.** Every platform makes opinionated choices about interruption handling and turn-taking. If those choices are wrong for your call type, you often cannot override them.
3. **Compliance the platform cannot meet.** Data residency, on-premise requirements, or handling protected health information under an arrangement the vendor will not sign. Note that Bland offers on-premise and VPC options at enterprise tier, so this is not automatically a build trigger.
4. **The agent is the product.** If you are reselling voice AI, sitting on someone else's metered platform puts a variable cost and a hard dependency inside your own margin.

If none of those apply, use Bland or Retell, ship this month, and revisit in a year. That is the advice we give most people who ask, and it is free.

If one or more applies, the maths is worth doing properly. Our voice work is built to be [SOC 2-aligned and HIPAA-ready](/services/ai-voice-agent-development), we run it at roughly half the rate the agencies in this space publish, and we will tell you plainly if your volume does not justify a build. [Get the numbers for your call profile](/contact-us).

Related: a voice agent that books, cancels or refunds is doing something categorically harder than one that answers questions, and [AI agent vs chatbot](/insights/ai-agent-vs-chatbot) sets out why that distinction drives your testing burden and your failure modes. For the wider build-versus-rent pattern, see [n8n vs Zapier](/insights/n8n-vs-zapier-cost-comparison).

---

*All pricing verified against the vendors' published pricing pages in August 2026. Voice AI pricing moves quickly and model rates in particular change often, so re-check before committing. Stackbinary builds custom voice agents, which competes with all four platforms named here. We have tried to be explicit about where using them beats building.*
