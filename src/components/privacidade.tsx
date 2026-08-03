import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Institucional */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-8 sm:px-10 text-white">
          <span className="inline-block bg-blue-700/50 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Transparência e LGPD
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Política de Privacidade
          </h1>
          <p className="mt-2 text-sm text-blue-200">
            Mandato da Deputada Federal Andreia Siqueira
          </p>
        </div>

        {/* Conteúdo da Política */}
        <div className="px-6 py-8 sm:px-10 space-y-6 text-sm sm:text-base leading-relaxed text-slate-600">
          <p className="text-slate-700 font-medium">
            A presente Política de Privacidade descreve como o site oficial da Deputada Federal Andreia Siqueira coleta, usa, armazena e protege as informações dos cidadãos, eleitores e visitantes que acessam nossa plataforma ou interagem com nossos conteúdos e formulários.
          </p>
          <p>
            O respeito à privacidade e a proteção dos dados pessoais são compromissos fundamentais do nosso mandato. Esta página foi elaborada em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD) e com as diretrizes de transparência para plataformas digitais e redes sociais.
          </p>

          {/* Seção 1 */}
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
              1. Informações que Coletamos
            </h2>
            <p className="mb-3">
              Podemos coletar dados pessoais de forma direta quando você interage voluntariamente conosco através do site. Os dados coletados podem incluir:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-800">Dados de Identificação:</strong> Nome completo, e-mail, número de telefone / WhatsApp e município/estado de residência (geralmente coletados em cadastros para recebimento de informativos, cadastro de voluntários ou apoio a pautas do mandato).
              </li>
              <li>
                <strong className="text-slate-800">Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas acessadas, tempo de permanência e dados coletados por meio de cookies e pixels de rastreamento (como o Pixel da Meta), utilizados para otimizar a experiência do usuário e medir o desempenho de campanhas informativas.
              </li>
            </ul>
          </div>

          {/* Seção 2 */}
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
              2. Finalidade do Uso dos Dados
            </h2>
            <p className="mb-3">
              Os dados coletados por meio deste site são utilizados exclusivamente para as seguintes finalidades:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Envio de informativos, boletins legislativos e atualizações sobre as ações, projetos de lei e atuação parlamentar da Deputada Andreia Siqueira.</li>
              <li>Comunicação institucional, diálogo com eleitores e mobilização para causas apoiadas pelo mandato (como pautas municipalistas, defesa dos direitos das mulheres, proteção animal e inclusão de pessoas com deficiência).</li>
              <li>Aprimoramento contínuo da experiência de navegação no site e medição de campanhas de conscientização pública veiculadas em redes sociais.</li>
            </ul>
          </div>

          {/* Seção 3 */}
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
              3. Compartilhamento de Dados
            </h2>
            <p className="mb-3">
              Os dados pessoais fornecidos não serão vendidos, alugados ou comercializados sob nenhuma hipótese. O compartilhamento de informações só poderá ocorrer:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Com prestadores de serviços de tecnologia essenciais para a operação deste site (como hospedagem e ferramentas de e-mail marketing), estritamente vinculados a obrigações de confidencialidade e segurança.</li>
              <li>Por determinação legal, ordem judicial ou exigência de autoridades competentes.</li>
            </ul>
          </div>

          {/* Seção 4 */}
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
              4. Segurança da Informação
            </h2>
            <p>
              Adotamos medidas técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações de destruição, perda, alteração ou difusão. O site utiliza protocolo de segurança criptografada (<code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs">HTTPS</code>).
            </p>
          </div>

          {/* Seção 5 */}
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
              5. Seus Direitos (LGPD)
            </h2>
            <p className="mb-3">
              Conforme a legislação brasileira, você possui o direito de solicitar a qualquer momento:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>A confirmação da existência de tratamento de seus dados.</li>
              <li>O acesso aos dados que possuímos sobre você.</li>
              <li>A correção de dados incompletos, inexatos ou desatualizados.</li>
              <li>A eliminação dos dados pessoais tratados com o seu consentimento.</li>
            </ul>
          </div>

          {/* Seção 6 */}
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
              6. Contato do Encarregado / Responsável
            </h2>
            <p className="mb-3">
              Para exercer seus direitos de privacidade, tirar dúvidas sobre esta Política de Privacidade ou solicitar a remoção de seus dados de nossa base, entre em contato conosco através do canal oficial do gabinete:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-slate-700 space-y-1 text-sm sm:text-base">
              <p><strong className="text-slate-900">Responsável Institucional:</strong> Gabinete da Deputada Federal Andreia Siqueira</p>
              <p>
                <strong className="text-slate-900">E-mail oficial:</strong>{' '}
                <a href="mailto:dep.andreiasiqueira@camara.leg.br" className="text-blue-600 hover:underline">
                  dep.andreiasiqueira@camara.leg.br
                </a>
              </p>
              <p><strong className="text-slate-900">Endereço físico:</strong> Anexo IV, Gabinete 408, Câmara dos Deputados, Brasília - DF, CEP 70160-900</p>
            </div>
          </div>

          {/* Seção 7 */}
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3">
              7. Alterações nesta Política
            </h2>
            <p>
              Esta Política de Privacidade poderá ser atualizada periodicamente para refletir melhorias no site ou adequações legais. Recomendamos que você consulte esta página regularmente.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-4 sm:px-10 text-center text-xs text-slate-500 border-t border-slate-200">
          Última atualização: Julho de 2026 • Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}