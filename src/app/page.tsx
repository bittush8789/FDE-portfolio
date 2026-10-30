import { Nav } from "@/components/site/nav";
import { Sidebar } from "@/components/site/sidebar";
import { DotNav } from "@/components/site/dot-nav";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Skills } from "@/components/site/skills";
import { Projects } from "@/components/site/projects";
import { AIPulse } from "@/components/site/ai-pulse";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Sidebar />
      <DotNav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AIPulse />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
