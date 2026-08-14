import { ArrowRight, HeartHandshake } from "lucide-react";
import foto from "@/assets/foto-andreia.png";
import rio from "@/assets/Capa.png";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-andreia pt-28 lg:pt-20">
      <img
        src={rio}
        alt="Foto da Deputada Federal Andréia Siqueira"
        className="flex h-[900px]  w-full object-cover object-top"
      />
      {/* 
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${rio})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "cover",
        }}
      />
     
        <div className="relative mx-auto grid max-w-7xl items-end gap-10 px-5 pb-0 lg:grid-cols-[1.05fr_0.95fr] ">
        <div className="pb-14 lg:pb-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-andreia-light/40 bg-andreia-light/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-andreia-lightest">
            Deputada Federal
          </span>
          <h1 className="mt-6 text-4xl font-medium uppercase leading-[1.05] text-primary-foreground sm:text-5xl lg:text-6xl">
            Do Baixo Tocantins
            <span className="block font-black uppercase text-gray-50">
              <p className=""></p>até Brasília
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg italic leading-relaxed text-primary-foreground/85">
            “Uma trajetória construída pela fé, pela família e pelo compromisso de cuidar das
            pessoas.”
          </p>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-andreia-lightest">
            Andréia Siqueira — A Federal da Nossa Gente
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#bandeiras"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-cyan px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-glow transition-transform hover:scale-[1.04]"
            >
              Bandeiras de Luta <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <HeartHandshake className="h-4 w-4" /> Fale com o mandato
            </a>
          </div>
        </div>
      </div>
      
      
      */}
    </section>
  );
}
