import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { SelectedWork } from "@/components/home/SelectedWork";
import { LinkedIn } from "@/components/home/LinkedIn";
import { TechStack } from "@/components/home/TechStack";
import { WorkExperience } from "@/components/home/WorkExperience";
import { Exploration } from "@/components/home/Exploration";
import { Certifications } from "@/components/home/Certifications";
import { Publications } from "@/components/home/Publications";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      {/* <Marquee /> */}
      <SelectedWork />
      <LinkedIn />
      <TechStack />
      <WorkExperience />
      <Exploration />
      <Certifications />
      <Publications />
      <Footer />
    </div>
  );
}
