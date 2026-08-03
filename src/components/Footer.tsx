import { Instagram } from "lucide-react";
import logo from "@/assets/logo-andreia.png";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#raizes", label: "Raízes" },
  { href: "#bandeiras", label: "Bandeiras de Luta" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="bg-andreia-darkest pb-8 pt-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1.2fr_1fr]">
        <div>
          <img
            src={logo}
            alt="Deputada Federal Andréia Siqueira"
            className="h-16 w-auto"
            loading="lazy"
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
            Do Baixo Tocantins até Brasília: um mandato dedicado a ouvir, cuidar e trabalhar pelo
            povo do Pará.
          </p>
        </div>
        <nav className="grid gap-2 md:justify-items-end">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-primary-foreground/80 transition-colors hover:text-andreia-light"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://instagram.com/andreiasiqueira"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-andreia-light"
          >
            <Instagram className="h-4 w-4" /> @andreiasiqueira
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-primary-foreground/10 px-5 pt-6 text-xs text-primary-foreground/60">
        <p>Câmara dos Deputados – Brasília/DF - (94) 99309-5185</p>
        <p className="mt-1">
          © {new Date().getFullYear()} Deputada Federal Andréia Siqueira — A Federal da Nossa Gente.
          Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
