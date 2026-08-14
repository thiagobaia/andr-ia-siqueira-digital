import React from "react";

const TermosDeUso = () => {
  return (
    <>
      {/* O container principal usa as configurações globais de fonte e background definidas no seu CSS */}
      <main className="max-w-4xl mx-auto px-4 py-12 section-pad">
        {/* Utilizamos as variáveis do seu tema: bg-card, border-border e o utilitário shadow-card */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-8 md:p-12">
          <div className="mb-10 pb-6 border-b border-border">
            <h1 className="text-3xl font-display font-bold text-primary mb-3">
              Termos de Uso e Aviso de Privacidade
            </h1>
            <p className="text-muted-foreground text-sm">
              Última atualização:{" "}
              <span className="font-semibold text-foreground">Agosto de 2026</span>
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full border border-border">
              Conformidade com a LGPD (Lei nº 13.709/18) e Resolução TSE 23.610/19
            </div>
          </div>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            {/* INTRODUÇÃO */}
            <section>
              <h2 className="text-lg font-display font-bold text-primary mb-3">
                1. Introdução e Aceite
              </h2>
              <p>
                Este documento estabelece as regras de utilização da página oficial de campanha e
                detalha como os dados pessoais dos usuários ("Você", "Apoiador") são coletados,
                utilizados, protegidos e tratados pela campanha da candidata{" "}
                <strong className="text-foreground">Andreia Brito Gonçalves Siqueira</strong>{" "}
                ("Nós", "Campanha").
              </p>
              <p className="mt-2">
                Ao acessar nossa página, preencher formulários de apoio ou interagir com nossos
                materiais digitais, você expressa seu{" "}
                <strong className="text-foreground">
                  consentimento livre, informado e inequívoco
                </strong>{" "}
                com as práticas descritas neste documento.
              </p>
            </section>

            {/* CONTROLADOR DOS DADOS */}
            <section>
              <h2 className="text-lg font-display font-bold text-primary mb-3">
                2. Identificação do Controlador
              </h2>
              <div className="bg-muted border border-border p-4 rounded-xl text-foreground">
                <ul className="space-y-2">
                  <li>
                    <strong>Responsável (Controlador):</strong> Eleição 2026 ANDREIA BRITO GONCALVES
                    SIQUEIRA DEPUTADO FEDERAL
                  </li>
                  <li>
                    <strong>CNPJ:</strong> 68.455.907/0001-89
                  </li>
                  <li>
                    <strong>Endereço:</strong> Av. Avenida Michel Dib Tachy, Nº 08, Parque Buritis -
                    Tucuruí/PA, CEP: 68.459-882
                  </li>
                  <li>
                    <strong>E-mail / DPO:</strong> dep.andreiasiqueira@camara.leg.br
                  </li>
                </ul>
              </div>
            </section>

            {/* COLETA DE DADOS */}
            <section>
              <h2 className="text-lg font-display font-bold text-primary mb-3">
                3. Quais Dados Coletamos e Para Qual Finalidade
              </h2>
              <p>
                Coletamos apenas os dados estritamente necessários para viabilizar sua participação
                como apoiador da campanha eleitoral, seguindo o princípio da minimização (Art. 6º,
                III, LGPD). Não coletamos nem tratamos dados sensíveis (como origem racial,
                convicção religiosa, etc.) por meio desta página.
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary text-primary-foreground text-xs uppercase tracking-wider">
                      <th className="p-3 rounded-tl-lg">Dados Coletados</th>
                      <th className="p-3">Base Legal</th>
                      <th className="p-3 rounded-tr-lg">Finalidade (Para que usamos)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-semibold text-foreground">
                        Nome, WhatsApp, E-mail, Cidade/UF
                      </td>
                      <td className="p-3">Consentimento (Art. 7º, I, LGPD)</td>
                      <td className="p-3">
                        Envio de informativos, convites para atos de campanha, distribuição de
                        material digital (santinhos, plano de propostas) e comunicação direta via
                        WhatsApp e E-mail.
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-semibold text-foreground">
                        Cookies e Dados de Navegação (IP, Tipo de Dispositivo)
                      </td>
                      <td className="p-3">Legítimo Interesse (Art. 7º, IX, LGPD)</td>
                      <td className="p-3">
                        Melhorar a experiência de navegação, segurança da página contra fraudes e
                        métricas básicas de acesso.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* COMPARTILHAMENTO E SEGURANÇA */}
            <section>
              <h2 className="text-lg font-display font-bold text-primary mb-3">
                4. Compartilhamento e Segurança dos Dados
              </h2>
              <p>
                A campanha <strong className="text-foreground">NÃO vende, aluga ou cede</strong>{" "}
                seus dados pessoais a terceiros, empresas privadas ou para outras campanhas. Em
                estrito cumprimento ao Art. 31, § 7º da Res. TSE 23.610/19 e à LGPD, o
                compartilhamento ocorre apenas com:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-foreground">
                <li>
                  Plataformas de envio de e-mail e WhatsApp (operadores técnicos contratados), que
                  assinam compromissos de confidencialidade;
                </li>
                <li>
                  Autoridades públicas, <strong className="text-foreground">apenas</strong> em caso
                  de requisição judicial ou obrigação legal (ex: prestação de contas à Justiça
                  Eleitoral).
                </li>
              </ul>
              <p className="mt-3">
                Utilizamos Certificado SSL (conexão HTTPS) e aplicamos medidas técnicas e
                administrativas para proteger seus dados contra acessos não autorizados, perdas ou
                alterações.
              </p>
            </section>

            {/* DIREITOS DO TITULAR E DESCADASTRAMENTO */}
            <section>
              <h2 className="text-lg font-display font-bold text-primary mb-3">
                5. Seus Direitos e Descadastramento (Opt-out)
              </h2>
              <p>
                Conforme o Art. 18 da LGPD e regulamentos do TSE, você tem total controle sobre seus
                dados. Você pode solicitar a qualquer momento e de forma gratuita:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 font-medium text-foreground">
                <li>A confirmação da existência de tratamento;</li>
                <li>O acesso aos dados que possuímos sobre você;</li>
                <li>A correção de dados incompletos ou desatualizados;</li>
                <li>
                  A{" "}
                  <strong className="text-foreground">
                    revogação do consentimento e exclusão imediata (Descadastramento)
                  </strong>{" "}
                  de nossas listas de transmissão.
                </li>
              </ul>

              {/* Box de destaque usando accent e primary */}
              <div className="mt-4 bg-accent/20 border-l-4 border-primary p-4 text-foreground rounded-r-md">
                <strong className="block mb-1 text-primary">
                  Como solicitar o descadastramento?
                </strong>
                <p>
                  Envie um e-mail para{" "}
                  <a
                    href="mailto:dep.andreiasiqueira@camara.leg.br?subject=Descadastramento"
                    className="font-bold underline hover:text-primary transition-colors"
                  >
                    dep.andreiasiqueira@camara.leg.br
                  </a>{" "}
                  com o assunto "Descadastramento". Nós interromperemos o envio de comunicações
                  eletrônicas no menor prazo técnico possível, conforme orientação preventiva do
                  processo eleitoral.
                </p>
              </div>
            </section>

            {/* DISPOSIÇÕES GERAIS E IA */}
            <section>
              <h2 className="text-lg font-display font-bold text-primary mb-3">
                6. Uso de Inteligência Artificial e Condutas Vedadas
              </h2>
              <p>
                Em cumprimento à{" "}
                <strong className="text-foreground">Resolução TSE nº 23.755/2026</strong>,
                informamos que a campanha pode utilizar recursos de Inteligência Artificial (IA)
                para fins estritamente lícitos (melhoria gráfica, legendas e acessibilidade). Todo
                conteúdo sintético será devidamente rotulado. Repudiamos e não utilizamos
                "deepfakes", disparos em massa automatizados não consentidos, ou tecnologias de
                manipulação desinformativa.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-primary mb-3">
                7. Retenção dos Dados
              </h2>
              <p>
                Seus dados serão mantidos conosco apenas durante o período da campanha eleitoral de
                2026. Após o encerramento das obrigações legais (como prestação de contas)
                referentes ao pleito, os dados captados por formulários serão definitivamente
                descartados e apagados de nossas bases.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* FOOTER utilizando os gradientes e cores baseadas no tema fornecido */}
      <footer className="bg-gradient-andreia text-primary-foreground/80 text-xs py-8 text-center border-t-4 border-accent">
        <p className="font-display font-bold text-primary-foreground">
          ELEICAO 2026 ANDREIA BRITO GONCALVES SIQUEIRA DEPUTADO FEDERAL
        </p>
        <p className="mt-1">CNPJ: 68.455.907/0001-89 | Partido Socialista Brasileiro (PSB)</p>
        <p className="mt-4">&copy; 2026 - Todos os direitos reservados.</p>
      </footer>
    </>
  );
};

export default TermosDeUso;
