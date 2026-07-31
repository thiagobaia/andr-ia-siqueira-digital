import { Stethoscope, HandHeart, ShieldCheck } from "lucide-react";
import carreta from "@/assets/carreta.png.asset.json";

const projects = [
  {
    icon: Stethoscope,
    title: "Carreta da Saúde",
    text: "Atendimentos itinerantes levando saúde e acolhimento para diversas comunidades.",
  },
  {
    icon: HandHeart,
    title: "Instituto Siqueira",
    text: "Ações sociais e projetos que aproximam cuidado e dignidade das pessoas.",
  },
  {
    icon: ShieldCheck,
    title: "Defesa e Inclusão",
    text: "Compromisso com causas ligadas às mulheres, crianças, autistas e pessoas que precisam de mais atenção do poder público.",
  },
];

export function Projects() {
  return (
    <section id="projetos" className="section-pad bg-andreia-darkest">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-andreia-light">Uma vida</p>
        <h2 className="mt-2 text-3xl font-black uppercase text-primary-foreground sm:text-4xl">
          Dedicada ao Social
        </h2>

        <img
          src={carreta.url}
          alt="Carreta da Saúde do Instituto Siqueira levando atendimento às comunidades"
          className="mt-10 w-full rounded-3xl object-cover shadow-glow"
          loading="lazy"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-3xl border border-primary-foreground/10 bg-primary-foreground/5 p-7 transition-colors hover:border-andreia-light/50"
            >
              <Icon className="h-8 w-8 text-andreia-light" />
              <h3 className="mt-4 text-xl font-bold text-primary-foreground">{title}</h3>
              <p className="mt-2 leading-relaxed text-primary-foreground/75">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
