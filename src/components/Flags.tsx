import { HeartHandshake, Accessibility, Users, Building2 } from "lucide-react";

const flags = [
  {
    icon: HeartHandshake,
    title: "Assistência Social e Proteção às Famílias",
    text: "Atuação voltada às famílias em situação de vulnerabilidade e fortalecimento das políticas públicas sociais. Com sensibilidade e compromisso social, Andréia Siqueira construiu sua caminhada ouvindo as pessoas, entendendo suas necessidades e trabalhando para transformar realidades.",
  },
  {
    icon: Accessibility,
    title: "Inclusão e Direitos das Pessoas com Deficiência",
    text: "Uma das principais marcas de sua atuação parlamentar é a defesa da inclusão, da acessibilidade e da ampliação dos direitos das pessoas com deficiência e das famílias atípicas. A deputada integra a Comissão de Defesa dos Direitos das Pessoas com Deficiência e tem atuado em projetos voltados à inclusão social e ao acesso a direitos.",
  },
  {
    icon: Users,
    title: "Mulheres e Proteção Social",
    text: "Atuação em defesa das mulheres, do fortalecimento de políticas públicas de proteção, valorização e geração de oportunidades para as paraenses. A pauta feminina está entre os compromissos assumidos em seu mandato.",
  },
  {
    icon: Building2,
    title: "Municipalismo",
    text: "Defesa dos municípios paraenses, buscando recursos, investimentos e políticas públicas que fortaleçam as cidades e melhorem a vida da população. Andréia se apresenta como uma parlamentar comprometida com a pauta municipalista.",
  },
];

export function Flags() {
  return (
    <section id="bandeiras" className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-andreia">Principais</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-black uppercase text-andreia-darkest sm:text-4xl">
          Bandeiras de Luta
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {flags.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="group rounded-3xl bg-card p-7 shadow-card transition-transform duration-300 hover:-translate-y-1.5"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-cyan text-primary-foreground">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-andreia-dark">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
