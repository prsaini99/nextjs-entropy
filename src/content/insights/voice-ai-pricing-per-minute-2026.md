---
title: "Vapi vs Retell vs Bland vs ElevenLabs: Price per Minute (2026)"
description: "Vapi pricing vs Retell, Bland and ElevenLabs Agents, all-in: STT, LLM, TTS, telephony, HIPAA and concurrency costed at 1,000 to 50,000 minutes a month."
date: "2026-09-08"
---

Vapi pricing starts at $0.05 a minute, Retell at $0.07, ElevenLabs Agents at $0.08 and Bland at $0.14. Those four numbers describe four different things. One is a hosting fee with every model billed on top, one is a partial bundle, one is a voice layer with the language model and phone line excluded, and one includes almost everything. This article puts them on the same footing: the headline rate, what it covers, and the all-in cost at 1,000, 10,000 and 50,000 minutes a month, with compliance and concurrency add-ons priced separately.

All prices were checked against the vendors' pricing pages in the first week of September 2026. Our earlier piece on [why per-minute rates are not comparable](/insights/ai-voice-agent-platforms-compared) covers the structure; this one carries the current numbers.

## Vapi pricing vs Retell, Bland and ElevenLabs Agents: what each rate includes

| Platform | Headline rate | Inside the rate | Billed on top | Free tier |
|---|---|---|---|---|
| **Vapi** | $0.05/min | Orchestration and hosting only | STT, LLM, TTS, telephony at provider cost ($0 with your own keys) | About $10 of starter credit |
| **Retell** | $0.055/min voice infra (from $0.07 with platform TTS) | Voice infrastructure | LLM (published per-minute rates), TTS, telephony $0.015/min, $2/month per number | $10 credit |
| **Bland** | $0.14/min on Start | STT, LLM, TTS, inbound number | Transfer minutes $0.05/min, platform fee on Build and Scale | 2 credits plus an inbound number, no card |
| **ElevenLabs Agents** | $0.08/min overage, minutes bundled in plans | Speech layer (STT, TTS, turn-taking) | LLM at provider cost, telephony at carrier cost | 15 minutes a month on Free |

Retell is the only one of the four that publishes the language model line as a per-minute figure: GPT 4.1 at $0.045/min, Claude 4.6 Sonnet at $0.08/min, Gemini 2.5 Flash Lite at $0.006/min and GPT 5.5 at $0.16/min. That makes it the reference point for the sheet below.

## The all-in cost sheet

To compare like with like, every column below assumes the same stack: a GPT 4.1-class model at about $0.045/min, standard-tier text to speech, speech to text at about $0.01/min where it is billed separately, and US Twilio telephony at about $0.015/min. Premium voices (ElevenLabs on Retell is $0.04/min instead of $0.015) or a frontier model would raise every row by roughly the same amount, so the ranking holds.

| Monthly minutes | Vapi | Retell | Bland | ElevenLabs Agents |
|---|---|---|---|---|
| Effective rate | About $0.135/min | About $0.13/min | $0.14, $0.12 or $0.11 by plan | Plan minutes, then $0.08/min, plus $0.06/min for LLM and phone line |
| **1,000** | About $137 | About $132 | $140 (Start, no platform fee) | About $159 (Pro $99 plus about $60 of LLM and telephony) |
| **10,000** | About $1,350 | About $1,302 | $1,499 (Build: $299 plus $0.12/min) | About $1,400 (Scale $299 plus 6,262 overage minutes at $0.08, plus about $600 of LLM and telephony) |
| **50,000** | About $6,750 | About $6,502 | $5,999 (Scale: $499 plus $0.11/min) | About $7,000 (Business $990 plus 37,625 overage minutes, plus about $3,000 of LLM and telephony) |

Three things the table shows.

**At 1,000 minutes the four platforms are within $30 of each other.** The choice at this volume is about features and tooling, not price.

**Bland's plan structure wins at high volume, not low volume.** Build at $299 a month only beats Start past roughly 15,000 minutes, and Scale only beats Build past roughly 20,000. At 50,000 minutes Bland is the cheapest column because the platform fee is spread thin and the rate includes everything. Bland also caps calls per day (100 on Start, 2,000 on Build, 5,000 on Scale), so a 10,000-minute month with three-minute calls needs Build regardless of the arithmetic.

**Vapi's saving comes from bringing your own keys, not from the $0.05.** If you already hold a model contract or a speech vendor account, Vapi charges nothing on those lines and the column above drops to $0.05 plus whatever you negotiated. That is the only way any of the four gets materially under $0.10 a minute at scale.

## Compliance and concurrency add-ons

| Item | Vapi | Retell | Bland | ElevenLabs Agents |
|---|---|---|---|---|
| Concurrent calls included | 10 | 20 | 10 / 50 / 100 by plan | 4 to 40 by plan |
| Extra concurrency | $10 per line per month | $8 per line per month | Move plan | Burst billed at $0.16/min |
| HIPAA / BAA | $2,000 a month add-on, either plan | Enterprise plan only, custom pricing | Enterprise plan with signed BAA | Enterprise plan only |
| Zero data retention | $1,000 a month add-on | Not published as a line item | Not published | Not published |
| SOC 2 | Scale plan | Standard | Type I and II | Enterprise |

HIPAA is a published $2,000 a month on Vapi and an unpublished enterprise conversation everywhere else. For a clinic running 5,000 minutes a month, that add-on alone exceeds the usage bill on any platform.

Concurrency is the other number to model before volume. Retell's 20 included lines and $8 top-up is the most generous entry point; ElevenLabs' burst rate, double the normal rate once you exceed your plan's concurrency, is the one most likely to surprise on a busy day.

## What changed in 2026

**Bland raised prices in December 2025.** The Start plan moved from $0.09 to $0.14 a minute on 5 December 2025, a 55 percent rise, and Build and Scale gained monthly platform fees of $299 and $499. Bland issued one-time transition credits to existing accounts. Any comparison still quoting $0.09 is out of date.

**Synthflow left the self-serve market.** Its pricing page now lists a single enterprise offer with contracts from $30,000 a year. Teams that started on the old Pro or Growth tiers cannot re-subscribe to them, which is why Synthflow no longer appears in the tables above.

**ElevenLabs bundled agent minutes into its plan ladder.** Agents pricing now sits inside the Starter, Creator, Pro, Scale and Business tiers, with 75 to 12,375 call minutes included and $0.08 a minute after that. The language model and the phone line remain separate lines billed by the model and carrier you choose, the detail most often missed when "$0.08 a minute" is quoted as all-in.

## Which to pick by use case

**Inbound receptionist or booking line, under 3,000 minutes a month.** Bland Start or Retell. Both give you one predictable number, both include the phone number, and neither carries a platform fee. If your business would rather buy a finished receptionist than a platform, [AI answering services priced for small business](/insights/ai-answering-service-small-business-cost) is the better read.

**Outbound campaigns with spiky concurrency.** Retell for the cheap line top-ups, or Bland Build once Start's daily call cap binds.

**Teams with their own model or speech contracts.** Vapi. Pay the $0.05 for orchestration and nothing else. This is the only route that keeps you free to swap a model or voice vendor without renegotiating the whole stack.

**Anything with protected health information.** Budget the HIPAA line first: a known $2,000 a month on Vapi, an enterprise quote on the other three.

## Owning the voice system instead of renting the meter

Stackbinary builds and operates its own voice AI platform (Oye Hello) and the [AI call center systems](/martech/ai-call-center) that run on it, so read this section knowing we sell one of the two routes. For low volume with no integration needs, a self-serve platform above is the right answer. The owned route is worth costing when four things matter.

**Full data autonomy.** Call recordings, transcripts, customer records and the pipeline they feed live in your own system and cloud region, not in a vendor's tenant.

**Only the features you use.** A per-minute plan prices a bundle: knowledge bases you do not need, guardrails on every call, concurrency you never reach. An owned system carries the call flows you actually run and nothing else, and the running cost is the raw model, speech and telephony lines with no orchestration margin on top.

**Your own system, our team managing it.** Owning does not mean hiring engineers. Stackbinary builds the system and runs it: hosting, monitoring, failover, and model updates as the providers ship them.

**Lower cost and fast delivery.** Fixed-price proposal within 48 hours, 55+ shipped products, delivery in weeks rather than quarters, and the IP assigned to you on payment. Our work is SOC 2-aligned and HIPAA-ready by design, so the compliance line that costs $2,000 a month elsewhere is part of the build.

[Send us your call profile and we will return a fixed price within 48 hours](/contact-us).

## FAQ

### What does Vapi really cost per minute?

About $0.13 to $0.16 a minute for a typical hosted stack, not $0.05. The $0.05 is Vapi's orchestration fee; speech to text, the language model, text to speech and telephony are passed through at provider cost on top, or at $0 if you bring your own API keys.

### Is HIPAA included on Retell?

No. Retell offers a BAA on its Enterprise plan only, at custom pricing; the pay-as-you-go plan does not include one. Vapi is the only platform of the four with a published HIPAA price, at $2,000 a month.

### Did Bland AI raise its prices?

Yes. On 5 December 2025 the Start plan went from $0.09 to $0.14 a minute, and Build ($299 a month at $0.12) and Scale ($499 a month at $0.11) gained platform fees. Existing accounts received one-time transition credits.

### Which platform has the best free tier?

Bland gives new accounts 2 credits and an inbound number with no card; Vapi and Retell each give about $10 of credit, roughly 60 to 90 minutes; ElevenLabs Free includes 15 agent minutes a month. None of them is enough for a production pilot, so plan a small paid test before choosing.

---

*Prices verified against the four vendors' pricing pages in September 2026. Model rates change monthly; re-check before committing.*
