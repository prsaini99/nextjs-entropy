import Banner from "@/components/Banner";
import FeaturesWrapper from "@/components/pages/Features/FeaturesWrapper";
import HeroSection from "@/components/pages/Features/HeroSection";

export default function Home() {

  return (
    <>
      <HeroSection />
      <FeaturesWrapper />
      <Banner
        image="https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/sevices/ngnwgqkwckycyz6ms1wz"
        title="“Because first impressions matter, and loading spinners don’t.”"
        description="Our solutions are designed to deliver measurable results and drive growth. Start your journey now and experience the future of technology."
        subDescription="“And yes, we’ll make sure the tech jargon comes with subtitles.”"
      />
    </>
  );
}
