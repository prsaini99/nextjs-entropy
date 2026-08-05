import AiAutomationPage from "@/components/pages/AiAutomation/AiAutomationPage";
import Banner from "@/components/Banner";

export const metadata = {
  // Targets "ai automation agency" (2,400/mo India, MEDIUM, ₹34-141 CPC) and
  // "ai automation services" (480/mo) — the service-intent slice of a market
  // whose generic terms ("business automation", ₹48k-78k top-of-page) belong
  // to enterprise-software vendors and must never be bid on or targeted.
  title: "AI Automation Agency — Working Systems in 2–3 Weeks | StackBinary™",
  description:
    "We find the highest-ROI automation in your business and ship it in 2–3 weeks: WhatsApp replies, invoice processing, email journeys, AI call answering, lead follow-up. Integrated with your existing tools. Owned outright.",
  alternates: { canonical: "https://stackbinary.io/ai-automation" },
  openGraph: {
    title: "AI Automation Agency — Working Systems in 2–3 Weeks | StackBinary™",
    description:
      "Tell us where your team's hours go. We reply with the three automations worth building first — and ship the best one in 2–3 weeks, wired into the tools you already run.",
    url: "https://stackbinary.io/ai-automation",
    siteName: "StackBinary",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return (
    <>
      <AiAutomationPage />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)",
        }}
        ctaHref="#martech-lead-form"
        ctaLabel="Get My Top 3 Automations"
        title="Ready to Get the Hours Back?"
        description="Start with the two-minute diagnostic. We'll tell you the three automations worth building first — and what each would save your team every week."
        image="/project-based.jpg"
      />
    </>
  );
}
