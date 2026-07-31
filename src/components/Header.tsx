import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import logo from "@/assets/logo-andreia.png.asset.json";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#raizes", label: "Raízes" },
  { href: "#bandeiras", label: "Bandeiras de Luta" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-andreia-darkest/95 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3">
        <a href="#inicio" className="flex min-w-0 items-center">
          <img
            src={logo.url}
            alt="Deputada Federal Andréia Siqueira — A Federal da Nossa Gente"
            className="h-11 w-auto shrink-0 lg:h-14"
            loading="eager"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/85 transition-colors hover:text-andreia-light"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://instagram.com/andreiasiqueira"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-cyan px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-105"
          >
            <Instagram className="h-4 w-4" /> @andreiasiqueira
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="shrink-0 rounded-lg p-2 text-primary-foreground lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-primary-foreground/10 bg-andreia-darkest px-5 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-primary-foreground/10 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground/90"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://instagram.com/andreiasiqueira"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-cyan px-5 py-2.5 text-sm font-bold uppercase text-primary-foreground"
          >
            <Instagram className="h-4 w-4" /> @andreiasiqueira
          </a>
        </nav>
      )}
    </header>
  );
}
