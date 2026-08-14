import React, { useState } from "react";

// Em React puro com Vite/CRA, você importa a imagem diretamente:
import andreiaAsset from "@/assets/perfil.png";
import logoAsset from "@/assets/logo-andreia.png";

const CANDIDATA = {
  nome: "Andreia Siqueira",
  nomeCompleto: "Andreia Brito Gonçalves Siqueira",
  cargo: "Deputada Federal",
  suplente: "Suplente: a ser informado no registro de candidatura",
  partido: "Partido a ser informado no registro de candidatura (TSE)",
  cnpj: "68.455.907/0001-89",
  razaoSocial: "ELEIÇÃO 2026 ANDREIA BRITO GONÇALVES SIQUEIRA DEPUTADO FEDERAL",
  endereco: "Av. Michel Dib Tachy, 08 - Parque Buritis, Tucuruí - PA, CEP 68.459-882",
  email: "dep.andreiasiqueira@camara.leg.br",
  whatsapp: "5594993095185", // Mantido o original para o botão do topo
};

const PROPOSTAS = [
  {
    titulo: "Saúde mais perto de você",
    texto:
      "Ampliação de recursos federais para hospitais regionais, mutirões de cirurgias eletivas e mais equipes de saúde da família no interior do Pará.",
  },
  {
    titulo: "Educação que transforma",
    texto:
      "Investimento em creches, escolas em tempo integral, transporte escolar de qualidade e formação técnica alinhada às vocações da região.",
  },
  {
    titulo: "Mulher protegida e independente",
    texto:
      "Fortalecimento da rede de enfrentamento à violência doméstica, casas da mulher paraense e linhas de crédito para empreendedoras.",
  },
  {
    titulo: "Emprego e empreendedorismo",
    texto:
      "Apoio ao pequeno negócio, qualificação profissional, cooperativismo e atração de investimentos para gerar renda no Baixo Tocantins.",
  },
  {
    titulo: "Infraestrutura e mobilidade",
    texto:
      "Pavimentação, saneamento básico, energia acessível e melhoria das rodovias e hidrovias que conectam os municípios paraenses.",
  },
  {
    titulo: "Agricultura familiar e meio ambiente",
    texto:
      "Assistência técnica, crédito rural, regularização fundiária e valorização da bioeconomia amazônica com sustentabilidade.",
  },
];

const PILARES = [
  {
    valor: "01",
    titulo: "Transparência",
    texto: "Prestação de contas pública e linguagem simples.",
  },
  { valor: "02", titulo: "Presença", texto: "Mandato que ouve o interior, não apenas a capital." },
  { valor: "03", titulo: "Resultado", texto: "Emendas e projetos com impacto medido nas pessoas." },
];

export default function Eleicoes2026() {
  const [form, setForm] = useState({ nome: "", email: "", cidade: "", mensagem: "" });
  const [optin, setOptin] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!optin) return;

    // Montando a mensagem para o WhatsApp
    const mensagemTexto =
      `Olá! Meu nome é *${form.nome}*.\n` +
      `Sou de *${form.cidade}*.\n` +
      `E-mail: ${form.email}\n\n` +
      `*Minha Sugestão/Mensagem:*\n${form.mensagem}`;

    // Codificando a URL para garantir que espaços e quebras de linha funcionem
    const urlEncoded = encodeURIComponent(mensagemTexto);
    const urlWhatsapp = `https://wa.me/${CANDIDATA.whatsapp}?text=${urlEncoded}`;

    // Abre o WhatsApp em uma nova aba
    window.open(urlWhatsapp, "_blank");

    setEnviado(true);
    // Limpa o formulário após o envio
    setForm({ nome: "", email: "", cidade: "", mensagem: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Aviso de conteúdo / topo */}
      <div className="bg-andreia-darkest px-4 py-2 text-center text-[11px] font-medium tracking-wide text-primary-foreground sm:text-xs">
        Conteúdo de propaganda eleitoral · CNPJ de campanha {CANDIDATA.cnpj}
      </div>

      {/* Navegação */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-card/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#inicio" className="flex items-center gap-3">
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-base font-extrabold text-andreia-darkest">
                {CANDIDATA.nome}
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-andreia">
                {CANDIDATA.cargo} · 2026
              </span>
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex">
            <a href="#sobre" className="transition-colors hover:text-andreia">
              Sobre
            </a>
            <a href="#propostas" className="transition-colors hover:text-andreia">
              Propostas
            </a>
            <a href="#conformidade" className="transition-colors hover:text-andreia">
              Transparência
            </a>
            <a href="#contato" className="transition-colors hover:text-andreia">
              Contato
            </a>
          </div>
          <a
            href="#contato"
            className="rounded-full bg-andreia px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5 hover:bg-andreia-darkest"
          >
            Quero participar
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden bg-gradient-andreia">
        <div className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-andreia-light/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-end gap-8 px-4 pt-14 md:grid-cols-2 md:pt-20">
          <div className="pb-12 text-primary-foreground">
            <img
              src={logoAsset}
              alt="Logo da campanha Andreia Siqueira - Deputada Federal"
              className="mb-7 h-24 w-auto sm:h-28"
              loading="eager"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
              Pará · Eleições 2026
            </span>
            <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
              Um mandato de
              <span className="block text-gradient-andreia">coragem e trabalho</span>
              pelo nosso Pará
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              {CANDIDATA.nomeCompleto} é candidata a <strong>{CANDIDATA.cargo}</strong> e defende
              saúde de qualidade, educação forte, oportunidade para as mulheres e desenvolvimento
              com dignidade para cada município.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#propostas"
                className="rounded-full bg-primary-foreground px-6 py-3 text-sm font-bold text-andreia-darkest transition-transform hover:-translate-y-0.5"
              >
                Ver as propostas
              </a>
              <a
                href={`https://wa.me/${CANDIDATA.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Falar pelo WhatsApp
              </a>
            </div>
          </div>
          <div className="relative flex items-end justify-center">
            <img
              src={andreiaAsset}
              alt="Andreia Siqueira, candidata a Deputada Federal pelo Pará em 2026"
              className="relative z-10 w-full max-w-sm object-contain drop-shadow-2xl md:max-w-md"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-andreia">
              Quem é Andreia
            </span>
            <h2 className="mt-3 font-display text-3xl font-black text-andreia-darkest sm:text-4xl">
              Nascida para servir as pessoas
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Mulher, mãe e trabalhadora, Andreia Siqueira construiu sua trajetória em Tucuruí e na
              região do Baixo Tocantins, sempre próxima das comunidades, das associações de bairro e
              de quem mais precisa de apoio do poder público.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Sua candidatura a {CANDIDATA.cargo} nasce do compromisso de levar as demandas reais do
              interior do Pará para Brasília, com escuta permanente, trabalho técnico e total
              transparência no uso dos recursos.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { k: "Origem", v: "Tucuruí - PA" },
                { k: "Bandeiras", v: "Saúde, educação e mulher" },
                { k: "Atuação", v: "Baixo Tocantins e todo o Pará" },
              ].map((i) => (
                <div key={i.k} className="rounded-2xl border border-border bg-card p-4 shadow-card">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-andreia">
                    {i.k}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-andreia-darkest">{i.v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-andreia p-8 text-primary-foreground shadow-card">
            <p className="font-display text-2xl font-black leading-snug">
              “Política de verdade é resolver o problema da pessoa que está na fila, na escola e na
              estrada de barro.”
            </p>
            <p className="mt-6 text-sm font-semibold text-andreia-light">
              {CANDIDATA.nomeCompleto}
            </p>
          </div>
        </div>
      </section>

      {/* Propostas */}
      <section id="propostas" className="bg-secondary/70 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-andreia">
              Plano de trabalho
            </span>
            <h2 className="mt-3 font-display text-3xl font-black text-andreia-darkest sm:text-4xl">
              Propostas para o Pará
            </h2>
            <p className="mt-4 text-muted-foreground">
              Compromissos organizados por eixo, com foco em resultados que chegam ao cotidiano das
              famílias paraenses.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROPOSTAS.map((p, i) => (
              <article
                key={p.titulo}
                className="group rounded-3xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-gradient-cyan font-display text-sm font-black text-andreia-darkest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-extrabold text-andreia-darkest">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Conformidade / transparência */}
      <section id="conformidade" className="mx-auto max-w-6xl px-4 py-20">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-andreia">
          Transparência e conformidade
        </span>
        <h2 className="mt-3 font-display text-3xl font-black text-andreia-darkest sm:text-4xl">
          Campanha dentro das regras
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            {
              t: "Identificação fiscal",
              d: `Conteúdo custeado pela campanha, CNPJ ${CANDIDATA.cnpj}, idêntico ao rótulo "Pago por" da Meta e ao registro na Justiça Eleitoral.`,
            },
            {
              t: "Contratação exclusiva",
              d: "O impulsionamento desta página é contratado exclusivamente pela candidata/partido, conforme a Res. TSE nº 23.610/2019, sendo vedada a contratação por terceiros.",
            },
            {
              t: "Uso de Inteligência Artificial",
              d: "Esta página não utiliza conteúdo sintético gerado por IA. Caso qualquer material passe a utilizar IA, o aviso será exibido de forma destacada e acessível, respeitando a restrição de 72h antes e 24h depois do pleito.",
            },
            {
              t: "Privacidade e LGPD",
              d: "Os dados enviados no formulário são usados apenas para comunicação da campanha, com consentimento explícito (opt-in) e canal de descadastro disponível a qualquer momento.",
            },
            {
              t: "Segurança do domínio",
              d: "Página hospedada em domínio próprio verificado no Gerenciador de Negócios da Meta, com HTTPS/SSL ativo, sem encurtadores ou redirecionamentos mascarados.",
            },
            {
              t: "Sem promessas vedadas",
              d: "Nenhum conteúdo desta página oferece vantagem, bem ou serviço em troca de voto, em respeito à legislação eleitoral vigente.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-base font-extrabold text-andreia-darkest">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contato / captação */}
      <section id="contato" className="bg-gradient-andreia py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
          <div className="text-primary-foreground">
            <h2 className="font-display text-3xl font-black sm:text-4xl">
              Some-se a esta caminhada
            </h2>
            <p className="mt-4 max-w-md text-primary-foreground/85">
              Envie sua sugestão, conte a realidade do seu bairro ou município e receba as novidades
              da campanha. Sua voz orienta nosso plano de trabalho.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-primary-foreground/80">
              <li>E-mail: {CANDIDATA.email}</li>
              <li>Endereço da campanha: {CANDIDATA.endereco}</li>
            </ul>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            {enviado ? (
              <div className="py-10 text-center">
                <h3 className="font-display text-xl font-black text-andreia-darkest">
                  Mensagem enviada para o WhatsApp!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Obrigada por participar. Em breve nossa equipe entra em contato.
                </p>
                <button
                  onClick={() => setEnviado(false)}
                  className="mt-6 font-bold text-andreia underline hover:text-andreia-darkest"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-black text-andreia-darkest">
                  Fale com a campanha
                </h3>
                <div className="mt-5 space-y-4">
                  {[
                    { id: "nome", label: "Nome completo", type: "text" },
                    { id: "email", label: "E-mail", type: "email" },
                    { id: "cidade", label: "Cidade", type: "text" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label
                        htmlFor={f.id}
                        className="text-xs font-bold uppercase tracking-widest text-andreia"
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type={f.type}
                        required
                        value={form[f.id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      htmlFor="mensagem"
                      className="text-xs font-bold uppercase tracking-widest text-andreia"
                    >
                      Sua sugestão
                    </label>
                    <textarea
                      id="mensagem"
                      rows={3}
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <label className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={optin}
                      onChange={(e) => setOptin(e.target.checked)}
                      required
                      className="mt-0.5 size-4 shrink-0 accent-andreia"
                    />
                    <span>
                      Autorizo, de forma livre e informada (LGPD - Lei 13.709/2018), o uso dos meus
                      dados para contato da campanha. Posso solicitar o descadastro a qualquer
                      momento pelo e-mail {CANDIDATA.email}.
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-andreia px-6 py-3.5 font-display text-sm font-bold text-primary-foreground transition-colors hover:bg-andreia-darkest"
                  >
                    Enviar mensagem pelo WhatsApp
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Rodapé jurídico obrigatório */}
      <footer className="bg-andreia-darkest px-4 py-14 text-primary-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <div>
              <img
                src={logoAsset}
                alt="Logo da campanha Andreia Siqueira - Deputada Federal"
                className="mb-6 h-20 w-auto"
                loading="lazy"
              />
              <p className="font-display text-2xl font-black leading-tight">
                {CANDIDATA.nomeCompleto}
              </p>
              <p className="mt-1 font-display text-lg font-extrabold text-andreia-light">
                {CANDIDATA.cargo}
              </p>
              {/* Nome do suplente em proporção não inferior a 30% do titular (Art. 36, Lei 9.504/97) */}
              <p className="mt-2 text-[0.8rem] font-semibold text-primary-foreground/80">
                {CANDIDATA.suplente}
              </p>
              <p className="mt-4 text-sm text-primary-foreground/80">{CANDIDATA.partido}</p>
            </div>
            <div className="space-y-1.5 text-sm text-primary-foreground/80">
              <p>
                <strong className="text-primary-foreground">Razão social:</strong>{" "}
                {CANDIDATA.razaoSocial}
              </p>
              <p>
                <strong className="text-primary-foreground">CNPJ da campanha:</strong>{" "}
                {CANDIDATA.cnpj}
              </p>
              <p>
                <strong className="text-primary-foreground">Endereço:</strong> {CANDIDATA.endereco}
              </p>
              <p>
                <strong className="text-primary-foreground">Contato:</strong> {CANDIDATA.email}
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-xs leading-relaxed text-primary-foreground/70">
            <p>
              Propaganda eleitoral custeada e impulsionada exclusivamente pela campanha acima
              identificada, nos termos das Resoluções TSE nº 23.610/2019 e nº 23.755/2026 e da Lei
              nº 9.504/97. Página sem uso de conteúdo sintético gerado por Inteligência Artificial.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 font-semibold">
              <a href="/privacidade" className="hover:text-andreia-light">
                Política de Privacidade
              </a>
              <a href="/termos-de-uso" className="hover:text-andreia-light">
                Termos de Uso
              </a>
              <a
                href={`mailto:${CANDIDATA.email}?subject=Descadastro`}
                className="hover:text-andreia-light"
              >
                Descadastrar meus dados
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
