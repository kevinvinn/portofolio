import { LoadingIntro } from "@/components/home/LoadingIntro";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { TechStack } from "@/components/home/TechStack";
import { WorkExperience } from "@/components/home/WorkExperience";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Certifications } from "@/components/home/Certifications";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <LoadingIntro />
      <Hero />
      <About />
      <TechStack />
      <WorkExperience />
      <SelectedWork />
      <Certifications />
      <Footer />
    </div>
  );
}
