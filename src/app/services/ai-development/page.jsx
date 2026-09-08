import { notFound } from "next/navigation";
import { getAiServicePage } from "@/data/aiServicesPages";
import { aiServiceMetadata, aiServiceJsonLd } from "@/lib/aiServiceRoute";
import AIServicePage from "@/components/pages/AIServices/AIServicePage";
import RelatedInsights from "@/components/RelatedInsights";

const SLUG = "ai-development";

export const metadata = aiServiceMetadata(SLUG);

export default function Page() {
  const page = getAiServicePage(SLUG);
  if (!page) notFound();
  return (
    <>
      {aiServiceJsonLd(SLUG).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AIServicePage page={page} slug={SLUG} />
      <RelatedInsights
        slugs={["best-ai-agent-builder-for-business", "lovable-bolt-replit-prototype-to-production-cost", "ai-agent-vs-chatbot"]}
        heading="How we think about building AI, in public"
      />
    </>
  );
}
