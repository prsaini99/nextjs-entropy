---
title: "AI Agent vs Chatbot: One Answers, the Other Acts"
description: "The difference is not intelligence or model quality. It is whether the system is allowed to change something. That single distinction drives your cost, your testing burden and your failure modes."
date: "2026-08-23"
---

The distinction most people are reaching for when they ask this question is not about how smart the system is. Both can run on the same model. Both can sound equally fluent.

The difference is this: **a chatbot produces text. An agent takes actions that change state somewhere else.**

A chatbot that tells a customer their order shipped on Tuesday is answering. An agent that cancels the order, issues the refund and emails the confirmation is acting. Same model, same conversation, completely different engineering problem.

## The spectrum, because it is not a binary

In practice systems sit somewhere along a line, and knowing where yours needs to sit is most of the decision.

**1. Scripted bot.** Decision tree, fixed responses, no model. Still the correct answer for a surprising number of use cases. Utterly predictable, trivially testable, cannot surprise you.

**2. LLM chatbot.** A model answering from its training plus your prompt. Fluent, cheap, and confidently wrong about anything specific to your business.

**3. Retrieval-augmented chatbot.** The model answers from your documents, retrieved at query time. This is what most people actually need when they say "AI chatbot," and it is where the majority of real business value sits today. It can tell customers accurate things about your products, policies and prices. It cannot do anything.

**4. Tool-using agent.** The model can call functions: look up an order, check inventory, book a slot, write to a CRM. Now it can act. This is the step where everything about the engineering changes.

**5. Multi-step autonomous agent.** The model plans a sequence, executes it, observes results, and adapts. Genuinely useful for a narrow set of problems, and considerably harder to make reliable than vendors imply.

Most of the market conversation conflates 3 and 5. Most of the actual demand is for 3, with two or three tools bolted on, which is really a modest version of 4.

## What changes when you cross from 3 to 4

This is the part worth understanding before you scope anything, because the jump is larger than it looks.

**Failure modes get worse, not just more frequent.** A chatbot that hallucinates says something untrue and a customer is annoyed. An agent that hallucinates issues a refund that should not have been issued, or books a technician to the wrong address, or writes bad data into your CRM that then propagates. The blast radius of a wrong answer becomes the blast radius of a wrong action.

**Testing becomes genuinely hard.** You can evaluate a chatbot by comparing its answers against expected answers. Evaluating an agent means evaluating a sequence of decisions with side effects, most of which you cannot safely execute during testing. You end up building simulation harnesses and mock environments, and that work is often larger than the agent itself.

**Cost per interaction rises sharply.** A chatbot turn is roughly one model call. An agent turn can be five or ten: decide which tool, call it, interpret the result, decide again, and so on. On our own deployments, straightforward agent and chatbot tasks land around $0.02 per task, but a multi-step agent doing real planning can be an order of magnitude above a single retrieval answer.

**You need authorisation logic, not just prompts.** The question "should this agent be allowed to do this, for this user, right now" is a permissions problem. It cannot be solved by asking the model nicely in a system prompt. Prompt-level guardrails are advisory. Anything that actually protects you sits in code, outside the model, checking every tool call.

**Latency compounds.** Each reasoning step adds a round trip. A chatbot answers in a second. An agent doing four tool calls may take eight, which is fine in an email workflow and unacceptable in a voice call.

## How to tell which one you need

Ask one question about each thing you want the system to do: **if it gets this wrong, does someone have to undo something?**

If the answer is no, it is a chatbot task. Answering questions, summarising, drafting, explaining a policy, qualifying a lead by asking questions.

If the answer is yes, it is an agent task, and you should scope it as one: with authorisation checks, an audit log, and a human approval step for anything expensive or irreversible.

A useful pattern that most vendors will not sell you, because it is less impressive: build the retrieval chatbot first, ship it, and add exactly the tools that your logs show people asking for. You will usually find that three tools cover 80% of the requests, and that the ambitious autonomous version you originally scoped was solving problems nobody had.

## The reversibility rule

For anything that does act, sort the actions into three buckets before you build:

**Reversible and cheap.** Let the agent do it. Adding a note, tagging a record, sending an internal notification. If it is wrong, someone fixes it in ten seconds.

**Reversible and expensive.** Let the agent propose it, have a human confirm. Sending a customer email, changing a booking. Recoverable, but the recovery is embarrassing or costly.

**Irreversible.** Do not automate the final step. Refunds above a threshold, account deletion, anything financial or legal. The agent prepares everything and a person presses the button. The productivity gain is in the preparation, not the click.

Teams that skip this exercise almost always discover it later, after an incident, and then bolt on approvals in a hurry.

## The cost question people actually mean

When someone asks "agent or chatbot," they are frequently asking "how much is this going to cost me."

Rough shape, from systems we have shipped:

- **Retrieval chatbot over your own content.** The cheapest real AI product you can deploy. Predictable per-message cost, low ongoing maintenance beyond keeping the content current.
- **Chatbot with two or three tools.** Meaningfully more, mostly in integration work rather than model cost. This is where most business value lands.
- **Multi-step agent.** Substantially more, and the ongoing cost is dominated by evaluation and monitoring rather than tokens. Budget for the harness, not just the build.

The trap is scoping tier three, paying for tier three, and deploying something that does tier two's job. We see this often enough that it is worth saying plainly: if a vendor's proposal for your customer support problem involves autonomous multi-agent orchestration, ask them what the retrieval chatbot version would cost and what it would fail to do.

## Where we land

We build both, and we build them as [AI chatbot systems](/services/ai-chatbot-development) and [AI agent systems](/services/ai-agent-development) precisely because they are different products with different testing, different guardrails and different price points.

Our general advice, which costs us larger projects: start at step 3, instrument it, and let your own logs tell you which tools to add. It ships faster, it costs less, and the tools you end up building are the ones people actually asked for rather than the ones that sounded good in a scoping call.

If you want that mapped to your specific case, including an honest read on whether you need an agent at all, [tell us what you are trying to automate](/contact-us).
