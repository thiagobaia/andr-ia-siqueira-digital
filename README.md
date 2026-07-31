# Andréia Siqueira Digital

## 🎯 Objetivo do Projeto
Desenvolver uma Landing Page institucional e de campanha altamente profissional, moderna, responsiva e otimizada (SEO e performance) para a Deputada Federal **Andréia Siqueira** ("A Federal da Nossa Gente"). O site deve ser construído utilizando **Gatsby (JavaScript puro / ES6+)** e **Tailwind CSS**, seguindo rigorosamente a identidade visual, a paleta de cores oficial e os textos extraídos dos materiais de campanha fornecidos.

---

## 🎨 1. Guia de Identidade Visual e Paleta de Cores (`Cores.png`)
Configure o arquivo `tailwind.config.js` estendendo a paleta de cores com os tons exatos extraídos do guia oficial:

```javascript
// tailwind.config.js snippet
module.exports = {
  theme: {
    extend: {
      colors: {
        andreia: {
          lightest: '#77CCF2', // Azul claro / Destaques suaves
          light: '#00D6F2',    // Azul ciano / Detalhes e ícones
          DEFAULT: '#0096F4',  // Azul principal / Botões e chamadas
          dark: '#0061C1',     // Azul escuro / Seções e contrastes
          darkest: '#00428E',  // Azul marinho / Rodapés e textos fortes
        }
      }
    }
  }
}
📂 2. Ordem Eficiente para Criação e Estrutura de Componentes
Organize o projeto Gatsby em componentes reutilizáveis dentro da pasta src/components/ e páginas em src/pages/index.js:

Configuração Inicial (gatsby-config.js, tailwind.config.js, dependências): Instalação do Tailwind CSS, PostCSS, ícones (lucide-react) e fontes institucionais.

Componente Header / Navegação: Menu fixo com logo (LOGO ANDREIA SIQUEIRA BRANCA.png), links rápidos para as seções e botão de contato/redes sociais.

Seção Hero (Início): Apresentação de impacto com título forte, subtítulo, foto da candidata (FOTO ANDRÉIA - AZUL.png), frase de destaque e call-to-action (CTA).

Seção Biografia / Raízes (Raízes do Baixo Tocantins): Histórico, conexão com as origens, valores familiares e compromisso com o Pará.

Seção Bandeiras de Luta (Propostas e Atuação): Cards estruturados detalhando as principais frentes de atuação parlamentar (Assistência Social, Inclusão e Defesa das Pessoas com Deficiência, Mulheres e Proteção Social, Municipalismo).

Seção Projetos e Ações (Instituto Siqueira & Carreta da Saúde): Destaque para os projetos sociais itinerantes e atendimento à comunidade.

Seção Frase de Impacto / Citação: Bloco visual com a frase central: "A política só faz sentido quando melhora a vida das pessoas."

Seção Contato e Redes Sociais: Canais de atendimento (Brasília/DF, telefone, e-mail institucional e redes sociais @andreiasiqueira).

Componente Footer (Rodapé): Informações legais, logo e links de navegação rápida.

📝 3. Conteúdo Oficial Extraído dos Folders (folder ANDREIA INTERNO.png e folder ANDREIA EXTERNO.png)
A. Seção Hero / Capa
Título Principal: DO BAIXO TOCANTINS ATÉ BRASÍLIA

Subtítulo / Slogan: "Uma trajetória construída pela fé, pela família e pelo compromisso de cuidar das pessoas."

Assinatura: DEPUTADA FEDERAL ANDRÉIA SIQUEIRA — A FEDERAL DA NOSSA GENTE.

B. Raízes e Biografia ("Raízes do Baixo Tocantins" / "A Voz do Pará no Congresso")
Texto Principal:

"Foi no Baixo Tocantins, entre os valores simples da família, da fé e da solidariedade, que nasceu a essência de Andréia Siqueira. Crescendo próxima da realidade das comunidades e das famílias paraenses, aprendeu desde cedo que cuidar das pessoas é uma missão que exige amor, responsabilidade e presença. Essa conexão com o povo moldou sua trajetória e despertou o compromisso de lutar por quem mais precisa."

Atuação em Brasília:

Em Brasília, Andréia Siqueira representa milhares de famílias paraenses levando ao Congresso Nacional pautas ligadas ao desenvolvimento regional, inclusão social, fortalecimento dos municípios e defesa das pessoas que mais precisam. Seu mandato mantém viva a essência de suas origens: ouvir, cuidar e trabalhar pelo povo.

Citação em Destaque:

"A política só faz sentido quando melhora a vida das pessoas."

C. Principais Bandeiras de Luta
Assistência Social e Proteção às Famílias:

Atuação voltada às famílias em situação de vulnerabilidade e fortalecimento das políticas públicas sociais. Com sensibilidade e compromisso social, Andréia Siqueira construiu sua caminhada ouvindo as pessoas, entendendo suas necessidades e trabalhando para transformar realidades.

Inclusão e Direitos das Pessoas com Deficiência:

Uma das principais marcas de sua atuação parlamentar é a defesa da inclusão, da acessibilidade e da ampliação dos direitos das pessoas com deficiência e das famílias atípicas. A deputada integra a Comissão de Defesa dos Direitos das Pessoas com Deficiência e tem atuado em projetos voltados à inclusão social e ao acesso a direitos.

Mulheres e Proteção Social:

Atuação em defesa das mulheres, do fortalecimento de políticas públicas de proteção, valorização e geração de oportunidades para as paraenses. A pauta feminina está entre os compromissos assumidos em seu mandato.

Municipalismo:

Defesa dos municípios paraenses, buscando recursos, investimentos e políticas públicas que fortaleçam as cidades e melhorem a vida da população. Andréia se apresenta como uma parlamentar comprometida com a pauta municipalista.

D. Projetos de Impacto Social
Carreta da Saúde: Atendimentos itinerantes levando saúde e acolhimento para diversas comunidades.

Instituto Siqueira: Ações sociais e projetos que aproximam cuidado e dignidade das pessoas.

Defesa e Inclusão: Compromisso com causas ligadas às mulheres, crianças, autistas e pessoas que precisam de mais atenção do poder público.

E. Contatos e Rodapé
Localização: Câmara dos Deputados – Brasília/DF

Telefone: 61 - 0000-0000 (espaço reservado para atualização)

Redes Sociais: @andreiasiqueira

E-mail Institucional: (Disponível para contato direto via formulário no site)

💻 4. Especificações Técnicas para o Gatsby
Estrutura de Pastas:

Plaintext
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Flags.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── images/
│   ├── LOGO ANDREIA SIQUEIRA BRANCA.png
│   ├── FOTO ANDREIA - AZUL.png
│   └── (demais imagens extraídas dos folders)
├── styles/
│   └── global.css (com diretivas do Tailwind)
└── pages/
    └── index.js
Responsividade Total: Design mobile-first garantindo excelente visualização em smartphones, tablets e desktops.

Interatividade: Menu mobile funcional, animações suaves com Tailwind transitions e formulário de contato estilizado.
"""

print("Prompt gerado com sucesso!")


```text?code_stdout&code_event_index=1
Prompt gerado com sucesso!

Escreva o seguinte prompt detalhado e estruturado para o Hercules AI criar a landing page de acordo com todas as suas especificações e materiais fornecidos:

Crie uma Landing Page institucional e de campanha altamente profissional, moderna, responsiva e otimizada (SEO e performance) para a Deputada Federal Andréia Siqueira ("A Federal da Nossa Gente"). O projeto deve ser desenvolvido utilizando Gatsby (JavaScript puro / ES6+) e Tailwind CSS, estruturado de forma limpa e modular.

Siga rigorosamente as diretrizes abaixo:

1. IDENTIDADE VISUAL E PALETA DE CORES (Cores.png):
Configure o arquivo `tailwind.config.js` com a paleta oficial de tons de azul extraída do guia:
- Azul Claro / Destaques: #77CCF2
- Azul Ciano / Ícones: #00D6F2
- Azul Principal / Botões e CTAs: #0096F4
- Azul Escuro / Seções: #0061C1
- Azul Marinho / Rodapés e Textos Fortes: #00428E

2. ATIVOS E MÍDIAS:
Utilize os seguintes arquivos na estrutura de imagens do projeto (`src/images/`):
- Logo oficial: `LOGO ANDREIA SIQUEIRA BRANCA.png` (aplicada no cabeçalho e rodapé sobre fundo azul escuro).
- Foto principal da candidata: `FOTO ANDRÉIA - AZUL.png` (destacada na seção Hero).
- Elementos visuais e fotos institucionais extraídos dos folders `folder ANDREIA INTERNO.png` e `folder ANDREIA EXTERNO.png`.

3. ESTRUTURA E ORDEM DE CRIAÇÃO DO PROJETO (Componentes em `src/components/`):
Organize o desenvolvimento em seções sequenciais e eficientes:

- [ ] Passo 1: Configuração Inicial do Gatsby + Tailwind CSS + ícones (Lucide React).
- [ ] Passo 2: Componente `Header` (Navegação fixa com a logo branca e links para as seções).
- [ ] Passo 3: Seção `Hero` (Início)
  - Título de impacto: "DO BAIXO TOCANTINS ATÉ BRASÍLIA"
  - Slogan: "Uma trajetória construída pela fé, pela família e pelo compromisso de cuidar das pessoas."
  - Inclusão da foto oficial da candidata e botões de chamada para ação (CTA).
- [ ] Passo 4: Seção `Biografia / Raízes do Baixo Tocantins`
  - Texto base: "Foi no Baixo Tocantins, entre os valores simples da família, da fé e da solidariedade, que nasceu a essência de Andréia Siqueira. Crescendo próxima da realidade das comunidades e das famílias paraenses, aprendeu desde cedo que cuidar das pessoas é uma missão que exige amor, responsabilidade e presença..."
  - Atuação em Brasília e compromisso com o desenvolvimento regional e inclusão social.
  - Citação em destaque com fundo em gradiente azul: "A política só faz sentido quando melhora a vida das pessoas."
- [ ] Passo 5: Seção `Bandeiras de Luta` (Grid de Cards com os pilares de atuação)
  - Assistência Social e Proteção às Famílias
  - Inclusão e Direitos das Pessoas com Deficiência (PCD / famílias atípicas)
  - Mulheres e Proteção Social
  - Municipalismo (parceria com os municípios paraenses)
- [ ] Passo 6: Seção `Projetos de Impacto` (Instituto Siqueira e Carreta da Saúde)
  - Destaque para os atendimentos itinerantes de saúde e projetos sociais de aproximação e dignidade.
- [ ] Passo 7: Seção `Contato e Redes Sociais`
  - Informações: Câmara dos Deputados – Brasília/DF, Telefone, E-mail institucional e redes sociais (`@andreiasiqueira`).
- [ ] Passo 8: Componente `Footer` com créditos e navegação rápida.

Gere todo o código fonte funcional do projeto Gatsby (páginas, componentes, configurações do Tailwind e estilos globais) de forma limpa e organizada.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/345fb0ba-e902-4902-b90b-b06f2eb8ec6b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
