---
title: "AI Calling Agent Pricing in India (2026): Real Rupees per Minute"
description: "AI calling agent pricing India 2026: rate cards from six Indian vendors, worked totals at 5,000 to 100,000 minutes, and the telephony and DLT lines left out."
date: "2026-09-08"
---

An AI calling agent in India is advertised anywhere from ₹0.40 to ₹12 per minute. The effective rate, once telephony, platform fees, language premiums and unanswered attempts are added, usually lands between ₹3 and ₹12 per minute for Indian platforms and between ₹11 and ₹17 per minute for global platforms routed into India. This article lays out the published rate cards, works the monthly total at three volumes, and lists the lines that do not appear on the rate card.

One disclosure first: Stackbinary builds and operates its own voice AI platform (Oye Hello) and custom calling systems, so we compete with every vendor named below. The figures are taken from the vendors' own pricing pages and blogs, with the fetch date noted at the end, and we have tried to keep the judgement to the numbers.

## AI calling agent pricing in India: the rate card

| Vendor | Published price | Model | Setup fee | What the rate covers |
|---|---|---|---|---|
| Dvaarik AI | ₹2 per billed minute | Per minute, no subscription | ₹0 | Voice stack; phone channel separate |
| Agni by Ravan.ai | ₹2,999 per month, from ₹2 per minute | Subscription plus usage | Included | STT, LLM, TTS and telephony bundled, per its own blog |
| Trikon | ₹5 per live minute, flat | Per minute, no subscription | ₹0 | LLM, STT, TTS, recording, transfers; carrier via BYOK, DID separate |
| Caller Digital | About ₹9.42 per minute (pay as you go estimate) | Component stack per minute | Not published | Carrier, infrastructure, support and platform lines listed separately; telephony at cost |
| Scalify Labs | ₹0.40 per minute | Managed, minimum 10,000 minutes a month, 3-month commitment | ₹15,000 to ₹40,000 | Script, voice, DLT support, dashboard; regional languages extra |
| Bolna | About $0.06 per minute (about ₹5.70) | Platform fee plus pass-through | Credits from $10 | Orchestration; telephony, STT, LLM and TTS billed through |

Two notes on that table. Ravan.ai's own blog quotes ₹2 per minute all-in on a ₹2,999 monthly plan; a third-party index from August 2026 reads the same plan as 300 included minutes with ₹8 per minute overage, so confirm which structure you are quoted. Scalify's ₹0.40 is the lowest number in the market, and it comes with a ₹4,000 monthly minimum, a three-month commitment and a setup fee that dominates the first quarter's bill.

Enterprise vendors such as Exotel, Yellow.ai, Gnani and Skit do not publish per-minute prices; treat those as quote on request.

## Worked monthly cost at 5,000, 25,000 and 100,000 minutes

The table below applies each vendor's published structure to three monthly volumes. Where telephony is not bundled we add ₹0.60 per minute, which is the middle of the ₹0.45 to ₹0.75 outbound mobile pass-through range Indian vendors publish. GST at 18% is excluded throughout.

| Vendor | 5,000 min | 25,000 min | 100,000 min |
|---|---|---|---|
| Dvaarik (₹2 plus ₹0.60 telephony) | ₹13,000 | ₹65,000 | ₹2.6 lakh |
| Agni by Ravan.ai (₹2,999 plus ₹2) | ₹13,000 | ₹53,000 | ₹2.03 lakh |
| Trikon (₹5 plus ₹0.60 carrier) | ₹28,000 | ₹1.4 lakh | ₹5.6 lakh |
| Caller Digital (₹9.42 all lines) | ₹47,100 | ₹2.36 lakh | ₹9.42 lakh |
| Scalify (₹0.40, ₹4,000 minimum, setup spread over 12 months) | ₹6,300 | ₹12,300 | ₹42,300 |
| Vapi from India (about ₹12 to ₹17 all-in) | ₹60,000 to ₹85,000 | ₹3 to ₹4.25 lakh | ₹12 to ₹17 lakh |
| Retell from India (about ₹12.30 with GPT 4.1) | ₹61,500 | ₹3.07 lakh | ₹12.3 lakh |

At 100,000 minutes the spread runs from under ₹50,000 to over ₹15 lakh a month for the same volume. Most of that is not model quality; it is what is bundled, whether telephony is at cost, and whether you are paying in dollars.

## The lines that are not on the rate card

**Telephony and TRAI compliance.** Outbound calls to mobiles cost carriers roughly ₹0.35 to ₹0.55 per minute; vendors pass this through at ₹0.45 to ₹0.75, and some mark it up two to five times. Promotional calls must originate from 140-series numbers and service calls from 160-series numbers, which means DLT principal-entity registration at about ₹5,900 a year per operator portal, plus header and template registration. Budget ₹5,000 to ₹25,000 a year for the compliance layer and ₹250 to ₹1,500 a month per rented number.

**Connect rate.** You are billed per connected minute, but campaign economics depend on the attempt. Indian outbound connect rates run from 25% to 65% depending on the list and time of day, and some vendors charge ₹0.02 to ₹0.05 per unanswered attempt. Price per conversation, not per minute.

**Language premiums.** Hindi and English are usually included. Tamil, Telugu, Kannada, Marathi and Bengali attract ₹0.10 to ₹2 per minute extra on several rate cards, and a few vendors charge a flat ₹1 to ₹3 per minute for any regional language.

**Concurrency.** Your bill tracks minutes; your architecture tracks simultaneous calls. Extra concurrent lines cost from ₹352 per month on Caller Digital to $10 per line on Vapi and $8 per concurrent call on Retell.

**Integration and minimums.** CRM integration is quoted at ₹15,000 to ₹50,000 by mid-market vendors and ₹1 lakh to ₹10 lakh by enterprise vendors, whose contracts often carry monthly minimums of ₹50,000 to ₹5 lakh.

## Global platforms used from India, in rupees

Vapi, Retell and Bland are popular with Indian engineering teams because the tooling is mature. At ₹94.50 to the dollar, the arithmetic looks like this.

Vapi charges $0.05 per minute (about ₹4.70) as a platform fee and passes STT, LLM, TTS and telephony through at cost. Production English stacks land at $0.13 to $0.18 per minute, or ₹12 to ₹17, before Indian telephony. Retell prices each component: $0.055 voice infrastructure, $0.015 platform TTS, $0.045 for GPT 4.1, and no charge for SIP trunking to an Indian carrier, which gives roughly ₹11 to ₹12 per minute plus your carrier's rate. Bland's Start plan is $0.14 per minute all-in, about ₹13.20, with telephony passed through.

Dollar billing means the rupee's movement changes your unit cost every month, and Indian telephony has to come in through SIP or a carrier such as Plivo or Exotel, because US Twilio routing into India is 40% to 50% more expensive. Hinglish recognition quality also varies between STT vendors far more than their price does, so test before committing. Our [per-minute comparison of Vapi, Retell, Bland and ElevenLabs](/insights/voice-ai-pricing-per-minute-2026) works the same stack in dollars.

## Which model fits which use case

**Per-minute bundles (Dvaarik, Trikon, Agni)** suit short, predictable calls: reminders, confirmations, verification. The number is easy to model and there is no platform fee to amortise.

**Component pricing (Caller Digital, Bolna, Vapi, Retell)** suits teams that want to swap a model or a voice without changing vendor, and that will run enough volume for at-cost telephony to matter.

**Managed minimums (Scalify and the enterprise vendors)** suit collections, lead qualification and NBFC campaigns above 10,000 minutes a month, where the setup fee buys script development and compliance handling you would otherwise staff yourself.

If what you need is inbound reception rather than outbound campaigns, [AI receptionist pricing compared](/insights/ai-receptionist-cost-comparison) prices the packaged services instead.

## Renting the agent or owning the system

Every price above is a rental. Past a certain volume, owning the system is the better route, for four reasons.

1. **Full data autonomy.** Call recordings, transcripts, customer numbers and outcomes sit in the vendor's tenant on a rented platform. In an owned system they sit in your database, in the region you choose, under your retention rules.
2. **Only the features you use.** A per-minute bundle prices in a dashboard, a script builder, a knowledge base and support tiers whether or not you touch them. An owned system carries the call flows you actually run and nothing else, so the per-minute cost is the model, the speech and the carrier, at cost.
3. **Your system, our team running it.** Stackbinary builds the calling system and operates it: hosting, monitoring, carrier and DLT setup, model updates. Owning does not mean hiring a voice engineering team. Our [AI call center service](/martech/ai-call-center) describes the operating arrangement.
4. **Lower cost, fast delivery.** A fixed-price proposal within 48 hours, delivery in weeks rather than quarters, 55+ shipped products behind the estimate, and the IP assigned to you on payment.

The SaaS route is still the right answer when you run a few thousand minutes a month, need no CRM integration, and want to be live this week. Above roughly 25,000 minutes a month, or as soon as the agent must write into your own systems, the arithmetic is worth doing properly. [Send us your call profile and get a fixed-price proposal within 48 hours](/contact-us).

## FAQ

### What does an AI calling agent cost per minute in India?

Published rates run from ₹0.40 to ₹12 per minute for Indian vendors and about ₹11 to ₹17 per minute for global platforms once converted and stacked. A typical Indian mid-market deployment lands at ₹3 to ₹7 per minute all-in; the lowest headline numbers come with minimum commitments or setup fees.

### Are there setup fees for AI calling agents in India?

Sometimes. Dvaarik, Trikon and Caller Digital publish zero setup fees, Scalify publishes ₹15,000 to ₹40,000, and enterprise vendors quote ₹1 lakh to ₹5 lakh. Ask whether DLT registration, number provisioning and CRM integration sit inside or outside that fee.

### Do AI calling agents in India need DLT registration?

Yes for outbound commercial calls. TRAI requires promotional calls to originate from 140-series numbers and service calls from 160-series numbers, with the business registered as a principal entity on an operator's DLT platform (about ₹5,900 a year per operator) and headers and templates approved. Consent records and DND scrubbing apply whether the caller is a human or an AI.

### Is Vapi or Retell cheaper than an Indian vendor?

Not usually at the per-minute level once the dollar stack is converted: a production Vapi or Retell deployment costs ₹11 to ₹17 per minute against ₹2 to ₹10 for Indian bundles. They win on tooling and model choice, and on cost only when you bring your own model keys and carrier at high volume.

---

*Prices taken from the vendors' pricing pages and blogs on 8 September 2026 at ₹94.50 to the US dollar, GST excluded. Voice AI pricing changes often, so re-check before signing.*
