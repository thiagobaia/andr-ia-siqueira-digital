import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Flags } from "@/components/Flags";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const title = "Andréia Siqueira | Deputada Federal — A Federal da Nossa Gente";
const description =
  "Do Baixo Tocantins até Brasília: conheça a trajetória, as bandeiras de luta e os projetos sociais da Deputada Federal Andréia Siqueira pelo Pará.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Flags />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
