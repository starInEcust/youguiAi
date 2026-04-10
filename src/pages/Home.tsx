import Hero from "../components/Hero";
import VideoDemo from "../components/VideoDemo";
import BackendEngine from "../components/BackendEngine";
import Solutions from "../components/Solutions";
import Stats from "../components/Stats";
import DataSources from "../components/DataSources";
import Integration from "../components/Integration";
import SecuritySection from "../components/Security";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <VideoDemo />
      <BackendEngine />
      <Solutions />
      <Stats />
      <DataSources />
      <Integration />
      <SecuritySection />
      <FAQ />
      <CTA />
    </main>
  );
}
