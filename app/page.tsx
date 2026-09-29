import { AboutSection, CalmatoSection, HeroSection, PerspectiveSection, ProjectGrid } from "@/components/landing";

export default function Home() {
  return <main id="main-content" tabIndex={-1}>
    <HeroSection />
    <PerspectiveSection />
    <ProjectGrid />
    <CalmatoSection />
    <AboutSection />
  </main>;
}
