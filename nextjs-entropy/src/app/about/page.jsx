import HeroSection from "@/components/pages/About/HeroSection";
import TrustedByAbout from "@/components/pages/About/TrustedByAbout";
import AboutFeatures from "@/components/pages/About/AboutFeatures";
import Team from "@/components/pages/About/Team";
import Banner from "@/components/Banner";
import PhaseCards from "@/components/pages/About/PhaseCards";

export default function About() {
  return (
    <>
      <HeroSection />
      <TrustedByAbout />
      <AboutFeatures />
      <PhaseCards />
      <Team />
      <Banner />
    </>
  );
}
