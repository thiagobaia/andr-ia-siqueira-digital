import { Quote } from "lucide-react";
import plenaria from "@/assets/plenaria.png.asset.json";
import abraco from "@/assets/abraco.png.asset.json";

export function About() {
  return (
    <section id="raizes" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={abraco.url}
              alt="Andréia Siqueira abraçando uma moradora do Baixo Tocantins"
              className="col-span-2 h-72 w-full rounded-2xl object-cover shadow-card sm:h-96"
              loading="lazy"
            />
            <img
              src={plenaria.url}
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-andreia">
              Raízes do
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase text-andreia-darkest sm:text-4xl">
              Baixo Tocantins
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Foi no Baixo Tocantins, entre os valores simples da família, da fé e da
              solidariedade, que nasceu a essência de Andréia Siqueira. Crescendo próxima da
              realidade das comunidades e das famílias paraenses, aprendeu desde cedo que cuidar
              das pessoas é uma missão que exige amor, responsabilidade e presença. Essa conexão
              com o povo moldou sua trajetória e despertou o compromisso de lutar por quem mais
              precisa.
            </p>

            <h3 className="mt-10 text-2xl font-black uppercase text-andreia-dark">
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

      <div className="mx-auto mt-16 max-w-7xl px-5">
        <blockquote className="relative overflow-hidden rounded-3xl bg-gradient-andreia px-7 py-12 text-center shadow-glow sm:px-16">
          <Quote className="mx-auto h-9 w-9 text-andreia-light" />
          <p className="mx-auto mt-5 max-w-3xl text-2xl font-bold leading-snug text-primary-foreground sm:text-3xl lg:text-4xl">
            “A política só faz sentido quando melhora a vida das pessoas.”
          </p>
          <footer className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-andreia-lightest">
            Andréia Siqueira
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
