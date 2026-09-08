---
title: "WhatsApp Business API Pricing India 2026: Meta Rates + BSP Fees"
description: "WhatsApp Business API pricing India 2026: Meta per-message rates, the 1 October 2026 change, and Wati, Interakt, AiSensy, Gupshup and Twilio priced at scale."
date: "2026-09-08"
---

WhatsApp Business API pricing India has two layers: Meta's per-message rate, which is the same whoever you buy through, and the Business Solution Provider (BSP) layer, which is a subscription, a markup on Meta's rate, or both. In 2026 Meta bills India in rupees at about ₹0.86 per marketing message and ₹0.115 per utility or authentication message, and from 1 October 2026 the free-form replies your team sends inside the 24-hour service window become chargeable too. This article sets out the rate card, the BSP plans, and the monthly total by route at three volumes.

Disclosure: Stackbinary builds and operates WhatsApp automation and voice AI systems (Oye Hello) directly on Meta's Cloud API, so we compete with the BSPs below on the "build" route. The BSP figures are taken from their own pricing pages and, where a page hides prices, from third-party breakdowns published in 2026, as noted.

## Meta's India rate card in 2026

Meta moved from conversation-based to per-message billing on 1 July 2025, localised Indian accounts to INR billing from 1 January 2026, and raised the India marketing rate at the same time. Meta's pricing page renders rates interactively by market and currency; the figures below are the India rates as republished by BSPs and pricing guides in 2026.

| Category | Meta rate per delivered message (India) | Notes |
|---|---|---|
| Marketing | About ₹0.86 (₹0.8631) | Up roughly 10% from ₹0.785 on 1 January 2026; no volume discount |
| Utility | About ₹0.115 | Free inside an open 24-hour service window until 30 September 2026 |
| Authentication | About ₹0.115 | Higher authentication-international rate since 1 April 2026 |
| Service (free-form replies) | Free until 30 September 2026 | Charged per message from 1 October 2026 |

Volume tiers exist for utility and authentication and are counted per business portfolio per market and category, resetting monthly. Marketing has no tier. Messages sent inside the 72-hour free entry point window that opens from a Click-to-WhatsApp ad remain free.

## What changed on 1 July 2025 and what changes on 1 October 2026

The 2025 change replaced the 24-hour conversation charge with a charge per template delivered. For most Indian senders it made utility cheaper and marketing bursts more expensive, because every broadcast message now bills individually rather than per contact per day.

The October 2026 change is larger for support-heavy accounts. Meta has announced that service messages, meaning the non-template replies agents and bots send inside the customer service window, will be billed per message at the same rate as utility and authentication in that market, which for India is about ₹0.115 per message today. Utility templates inside the window lose their exemption on the same date. Meta committed to publishing the final rates by 1 September 2026, so check the rate card before you budget Q4. Accounts without a payment method on file risk service messages stopping on 1 October.

For a support desk sending 200,000 replies a month, that is a new line of roughly ₹23,000 a month at today's utility rate. For a marketing-first account it changes little.

## BSP plans compared: Wati, Interakt, AiSensy, Gupshup and Twilio

| Provider | Platform plan (per month, excluding GST) | Message rate or markup | Agents and inclusions |
|---|---|---|---|
| Wati | Prices hidden on the pricing page; 2026 breakdowns quote Growth ₹2,499, Pro ₹5,999, Business ₹16,999 | Third-party estimates of 15% to 20% above Meta | 3 users on Growth, 5 on Pro and Business; extra seats $24 (Pro) or $69 (Business) |
| Interakt | Growth ₹2,799, Advanced ₹3,799, Enterprise on request; Sales CRM ₹2,499 | Published: marketing ₹0.949, utility ₹0.140, authentication ₹0.127 | Unlimited agents on Growth and Advanced; enterprise tier removes markup |
| AiSensy | Per-message rates foregrounded; chatbot builder ₹2,500, AI agent builder ₹1,350; base plans from about ₹1,500 per third-party listings | Published: marketing ₹1.09, utility and authentication ₹0.145 | Prepaid wallet; Indian virtual number add-on ₹2,000 a year plus GST |
| Gupshup | Public rate card not published; third-party guides cite ₹4,000 to ₹15,000 for starter and pro tiers | About $0.001 (₹0.09) per message on top of Meta | Enterprise volume discounts negotiated per account |
| Twilio | No platform subscription | $0.005 (about ₹0.47) per message inbound and outbound on top of Meta | Developer API, no inbox; you build the front end |

Two observations. Interakt and AiSensy publish their message rates, which is the clearest way to see the BSP layer: Interakt's ₹0.949 marketing rate is about 10% above Meta, AiSensy's ₹1.09 is about 26% above. Twilio's fee is flat and small per message but it stacks at volume, and it buys an API rather than a product.

## Worked monthly cost at 10,000, 100,000 and 1,000,000 messages

Assumptions: 60% marketing and 40% utility, all outside the service window, GST excluded, $1 = ₹94.50. Meta's own charge for that mix is ₹5,639 per 10,000 messages. Plan tiers step up with volume where the vendor publishes them.

| Route | 10,000 messages | 100,000 messages | 1,000,000 messages |
|---|---|---|---|
| Meta direct (Cloud API, no BSP) | ₹5,639 | ₹56,390 | ₹5.64 lakh |
| Interakt (published rates plus Growth plan) | ₹9,053 | ₹65,340 | ₹6.28 lakh |
| AiSensy (published rates plus about ₹1,500 plan) | ₹8,620 | ₹72,700 | ₹7.14 lakh |
| Wati (Meta plus 18% markup plus plan tier) | ₹9,150 | ₹72,540 | ₹6.82 lakh |
| Gupshup (Meta plus $0.001 plus third-party plan figures) | ₹10,580 | ₹73,840 | ₹6.83 lakh |
| Twilio (Meta plus $0.005 per message) | ₹10,360 | ₹1.04 lakh | ₹10.36 lakh |

The direct route excludes the cost of building and hosting your own inbox, templates, opt-in handling and analytics, which is the whole point of a BSP at low volume. At 10,000 messages the BSP layer is ₹3,000 to ₹5,000 a month, less than a day of developer time. At a million messages it is ₹65,000 to ₹4.7 lakh a month, every month, which is where the build question becomes real. Add the October 2026 service-message charge on top of every row if your account is support-heavy.

## The direct Cloud API route: what it takes

Meta's Cloud API is free to access. You need a verified Meta Business Manager, a phone number that is not on the consumer app, a webhook endpoint for inbound messages, template submission and approval handling, opt-in records, and a place for agents to answer. Automation logic usually lives in a workflow tool or custom code; our [n8n vs Zapier cost comparison](/insights/n8n-vs-zapier-cost-comparison) covers what the orchestration layer costs when it runs every day.

A minimum viable direct integration for a single use case (order updates, appointment reminders, OTP) is a few weeks of engineering. A full shared inbox with routing, campaign scheduling and CRM sync is a product, and that is what the BSP subscription is paying for.

## Renting the inbox or owning the system

The BSP route and the owned route buy the same Meta rate. What differs is the layer on top.

1. **Full data autonomy.** Conversations, opt-ins, contact attributes and campaign history live in your own database on the direct route, in the region you choose, exportable in full. On a BSP they live in the vendor's tenant and leave through whatever export the plan allows.
2. **Only the features you use.** A BSP plan bundles an inbox, a chatbot builder, integrations and seat limits. An owned system carries the flows you actually run (a reminder sequence, a support handoff, a catalogue sync) and nothing else, at Meta's rate with no markup.
3. **Your own system, our team managing it.** Stackbinary builds the integration and operates it: hosting, webhook monitoring, template management, Meta API version updates. Owning does not mean staffing a messaging team. Our [marketing automation service](/martech/marketing-automation) describes the arrangement.
4. **Lower cost and fast delivery.** Fixed-price proposal within 48 hours, delivery in weeks, 55+ shipped products behind the estimate, IP assigned to you on payment.

The BSP route is still the right answer under roughly 50,000 messages a month with no CRM or ERP integration to maintain, because the subscription is cheaper than any build. Past that, or once WhatsApp has to write into your order system, the markup and the data question both grow with volume. [Send us your message volumes and get a fixed-price proposal within 48 hours](/contact-us).

## FAQ

### How much does WhatsApp Business API cost per message in India?

Meta charges about ₹0.86 per marketing message and about ₹0.115 per utility or authentication message delivered to an Indian number in 2026, billed in INR. BSPs add a subscription, a markup, or both: Interakt publishes ₹0.949 for marketing, AiSensy ₹1.09, Twilio adds $0.005 per message, and Gupshup about $0.001.

### Is the WhatsApp Business API free to use?

Access to Meta's Cloud API is free, and free-form replies inside the 24-hour service window are free until 30 September 2026. Template messages have always been charged, and from 1 October 2026 service messages inside the window are charged at the utility rate. The 72-hour window after a Click-to-WhatsApp ad stays free.

### Which is cheapest: Wati, Interakt or AiSensy?

At 10,000 mixed messages a month the three are within about ₹500 of each other once plan and message rates are combined, so choose on features and agent limits rather than price. At 100,000 messages the markup matters more than the plan: Interakt's published rates are the lowest of the three, and the direct Cloud API route is lowest of all.

### What changes for WhatsApp API pricing on 1 October 2026?

Service messages and utility templates sent inside the 24-hour customer service window become chargeable per message at the market's utility rate, about ₹0.115 in India at today's card. Meta said it would publish final rates by 1 September 2026. Support-heavy accounts should model this line before Q4; marketing-led accounts will see little change.

---

*Rates checked on 8 September 2026 against Meta's pricing documentation and the BSPs' pricing pages, GST excluded, at ₹94.50 to the US dollar. Where a vendor hides prices we say so and cite the 2026 third-party figure used.*
