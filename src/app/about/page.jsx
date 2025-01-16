import HeroSection from "@/components/pages/About/HeroSection";
import TrustedByAbout from "@/components/pages/About/TrustedByAbout";
import AboutFeatures from "@/components/pages/About/AboutFeatures";
import Team from "@/components/pages/About/Team";
import Banner from "@/components/Banner";
import PhaseCards from "@/components/pages/About/PhaseCards";
import WhyBussinessesTrustUs from "@/components/pages/About/WhyBussinessTrustUs";

export default function About() {
  return (
    <>
      <HeroSection />
      <TrustedByAbout />
      <AboutFeatures />
      <PhaseCards />
      <Team />
      <WhyBussinessesTrustUs />
      <Banner
        title="Your next chapter starts with us. Ready to turn the page? Join Us in Shaping the Future"
        description="We’re not just here to solve problems—we’re here to create possibilities. Let’s work together to build a future where technology works for you, not the other way around."
      // subDescription="“Our process is a lot like a great recipe—precise, consistent, and guaranteed to impress (without burning anything).”"
      />
    </>
  );
}
