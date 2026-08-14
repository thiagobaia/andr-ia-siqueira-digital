import { Quote } from "lucide-react";
import plenaria from "@/assets/plenaria.png";
import abraco from "@/assets/interior.jpeg";
import cuidado from "@/assets/cuidado.jpeg";

export function About() {
  return (
    <section id="raizes" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={abraco}
              alt="Andréia Siqueira abraçando uma moradora do Baixo Tocantins"
              className="col-span-2 h-72 w-full rounded-2xl object-cover shadow-card sm:h-96"
              loading="lazy"
            />
            <img
              src={plenaria}
              alt="Andréia Siqueira discursando na tribuna da Câmara dos Deputados"
              className="h-44 w-full rounded-2xl object-cover shadow-card sm:h-56"
              loading="lazy"
            />
            <div className="flex flex-col justify-center rounded-2xl bg-secondary p-5">
              <p className="text-sm font-semibold leading-relaxed text-andreia-darkest">
                “As raízes do Baixo Tocantins seguem presentes em cada luta em Brasília.”
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-black uppercase text-andreia-dark sm:text-2xl">Minhas Raízes</h2>
            <p className="leading-relaxed text-muted-foreground">
              Foi no Baixo Tocantins, entre os valores simples da família, da fé e da solidariedade,
              que nasceu a essência de Andréia Siqueira. Crescendo próxima da realidade das
              comunidades e das famílias paraenses, aprendeu desde cedo que cuidar das pessoas é uma
              missão que exige amor, responsabilidade e presença. Essa conexão com o povo moldou sua
              trajetória e despertou o compromisso de lutar por quem mais precisa.
            </p>

            <h3 className="mt-48 text-2xl font-black uppercase text-andreia-dark">
              A voz do Pará no Congresso
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Em Brasília, Andréia Siqueira representa milhares de famílias paraenses levando ao
              Congresso Nacional pautas ligadas ao desenvolvimento regional, inclusão social,
              fortalecimento dos municípios e defesa das pessoas que mais precisam. Seu mandato
              mantém viva a essência de suas origens: ouvir, cuidar e trabalhar pelo povo.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl px-5">
        <blockquote
          className="relative overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat px-7 py-12 text-center shadow-glow sm:px-16"
          style={{ backgroundImage: `url(${cuidado})` }}
        >
          <div className="absolute inset-0 z-0 bg-black/20"></div>

          <div className="relative z-10">
            <Quote className="mx-auto h-9 w-9 text-andreia-light" />
            <p className="mx-auto mt-5 max-w-3xl text-2xl font-bold leading-snug text-primary-foreground sm:text-3xl lg:text-4xl [text-shadow:0_2px_4px_rgb(0_0_0/0.7)]">
              “A política só faz sentido quando melhora a vida das pessoas.”
            </p>
            <footer className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-andreia-lightest [text-shadow:0_1px_2px_rgb(0_0_0/0.7)]">
              Andréia Siqueira
            </footer>
          </div>
        </blockquote>
      </div>
    </section>
  );
}
