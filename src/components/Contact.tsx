import { useState } from "react";
import { MapPin, Phone, Instagram, Mail, Send } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const municipio = formData.get("municipio") as string;
    const mensagem = formData.get("mensagem") as string;

    // Substitua pelo número real do WhatsApp com código do país e DDD (Ex: 5591999999999)
    const numeroWhatsApp = "5594993095185";

    const texto = `*Nova mensagem do site:*%0A` +
                  `*Nome:* ${nome}%0A` +
                  `*E-mail:* ${email}%0A` +
                  `*Município:* ${municipio || "Não informado"}%0A` +
                  `*Mensagem:* ${mensagem}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${texto}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setSending(false);
      form.reset();
      toast.success("Redirecionando para o WhatsApp!");
    }, 600);
  };

  return (
    <section id="contato" className="section-pad bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-andreia">Contatos</p>
          <h2 className="mt-2 text-3xl font-black uppercase text-andreia-darkest sm:text-4xl">
            Fale com o mandato
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
            O gabinete está de portas abertas para as demandas das famílias paraenses, prefeituras e
            entidades sociais.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              { icon: MapPin, label: "Câmara dos Deputados – Brasília/DF" },
              { icon: Phone, label: "(94) 99309-5185" },
              { icon: Instagram, label: "@andreiasiqueira" },
              { icon: Mail, label: "dep.andreiasiqueira@camara.leg.br" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-cyan text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 font-semibold text-andreia-darkest">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-card p-7 shadow-card">
          <div className="grid gap-5">
            <label className="block">
              <span className="text-sm font-bold text-andreia-darkest">Nome</span>
              <input
                required
                name="nome"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-andreia"
                placeholder="Seu nome completo"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-andreia-darkest">E-mail</span>
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-andreia"
                placeholder="seu@email.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-andreia-darkest">Município</span>
              <input
                name="municipio"
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-andreia"
                placeholder="Sua cidade"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-andreia-darkest">Mensagem</span>
              <textarea
                required
                name="mensagem"
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-andreia"
                placeholder="Conte sua demanda ou sugestão"
              />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cyan px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              <Send className="h-4 w-4" /> {sending ? "Enviando..." : "Enviar para o WhatsApp"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}