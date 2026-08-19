# OrbixHub — Landing Page

Landing page institucional do **OrbixHub**, o sistema de gestão para oficinas mecânicas.
Site estático construído com [Astro](https://astro.build), sem framework de UI no cliente.

Origem: o layout foi entregue pela equipe de design como um arquivo único
(`orbixhub-lp-preview.html`, ~2 MB, com todas as imagens embutidas em base64). Este
repositório é a versão de produção desse layout — mesma aparência, com os defeitos
corrigidos e a estrutura preparada para manutenção. Veja
[Diferenças em relação ao preview](#diferenças-em-relação-ao-preview).

---

## Requisitos

- Node.js 22 ou superior (veja `.nvmrc`)
- npm 10 ou superior

## Como rodar

```bash
npm install     # instala as dependências
npm run dev     # servidor de desenvolvimento em http://localhost:4321
npm run build   # gera o site estático em dist/
npm run preview # serve o conteúdo de dist/ para conferência
npm run check   # checagem de tipos nos arquivos .astro e .ts
```

> A primeira build baixa as fontes Sora e DM Sans do provedor do Google e as grava em
> cache dentro de `.astro/`. Builds seguintes funcionam offline; a primeira precisa de rede.

## Onde mexer

### Dados de contato, domínio e textos de SEO

Tudo em **`site.config.ts`**, na raiz. É a única fonte desses valores — eles alimentam o
`<head>`, o JSON-LD, o rodapé, o formulário e o botão do WhatsApp.

> **Pendência:** `contact.whatsapp` está vazio. Preencha com o número comercial no formato
> E.164 sem `+` e sem pontuação (ex.: `5511999999999`). Enquanto estiver vazio, o botão
> flutuante de WhatsApp simplesmente não é renderizado.

### Conteúdo das seções

Cada seção é um componente em `src/components/`, e o conteúdo (cards, planos, perguntas,
módulos) fica em um array no topo do arquivo — não é preciso mexer no HTML para editar
textos:

| Seção na página        | Componente                  |
| ---------------------- | --------------------------- |
| Cabeçalho e menu       | `SiteHeader.astro`          |
| Hero                   | `HeroSection.astro`         |
| Faixa de recursos      | `TrustStrip.astro`          |
| Problema               | `ProblemSection.astro`      |
| Como funciona          | `WorkflowSection.astro`     |
| Produto (carrossel)    | `ProductSection.astro`      |
| Recursos / módulos     | `ModulesSection.astro`      |
| Offline                | `OfflineSection.astro`      |
| Casos de uso + galeria | `UseCasesSection.astro`     |
| Planos                 | `PricingSection.astro`      |
| Segurança              | `SecurityBand.astro`        |
| Dúvidas (FAQ)          | `FaqSection.astro`          |
| CTA e formulário       | `CtaSection.astro`          |
| Rodapé                 | `SiteFooter.astro`          |
| Botão do WhatsApp      | `WhatsAppFloat.astro`       |
| Visualizador de fotos  | `ImageLightbox.astro`       |

### Estilos

- `src/styles/global.css` — tokens de cor, reset, tipografia, container, botões e animação
  de entrada. Só entra aqui o que é usado por mais de uma seção.
- O CSS específico de cada seção vive no `<style>` do próprio componente, com escopo
  automático do Astro.

### Imagens

Ficam em `src/assets/` e passam pelo pipeline do Astro: a build gera versões
redimensionadas, aplica `width`/`height` no HTML (evitando deslocamento de layout) e
serve o formato mais leve que o navegador aceita. Para trocar uma foto, substitua o
arquivo mantendo o nome.

A imagem de compartilhamento (`public/og-orbixhub.jpg`, 1200×630) é gerada à parte. Para
regerá-la a partir de outra foto:

```bash
node -e "require('sharp')('src/assets/hero-oficina.webp').resize(1200,630,{fit:'cover'}).jpeg({quality:82,mozjpeg:true}).toFile('public/og-orbixhub.jpg')"
```

## Estrutura

```
orbix-lp/
├── astro.config.mjs      # site, sitemap, fontes self-hosted, imagens
├── site.config.ts        # contato, domínio, textos de SEO  ← comece por aqui
├── public/
│   ├── favicon.svg
│   ├── og-orbixhub.jpg   # imagem de compartilhamento (1200×630)
│   └── robots.txt
└── src/
    ├── assets/           # fotos e mockups otimizados na build
    ├── components/       # uma seção por arquivo
    ├── layouts/
    │   └── BaseLayout.astro   # <head>, metatags, JSON-LD
    ├── pages/
    │   └── index.astro        # monta as seções na ordem da página
    └── styles/
        └── global.css
```

## Deploy

`npm run build` gera `dist/`, com HTML, CSS, JS e imagens estáticos — sem servidor Node
em produção. Publique o conteúdo de `dist/` em qualquer hospedagem estática (Vercel,
Netlify, Cloudflare Pages, S3 + CloudFront, Nginx).

Antes de publicar em outro domínio, ajuste `site.url` em `site.config.ts` e a linha
`Sitemap:` em `public/robots.txt` — eles definem o canonical, as URLs do Open Graph e o
sitemap.

## SEO e acessibilidade

- Uma URL canônica, Open Graph e Twitter Card com imagem real de 1200×630.
- Dados estruturados JSON-LD: `Organization`, `WebSite` e `SoftwareApplication`.
- `sitemap-index.xml` gerado na build e `robots.txt` apontando para ele.
- Fontes servidas pelo próprio domínio: nada bloqueia a renderização e nenhum IP de
  visitante é enviado a terceiros.
- Auditoria automatizada com axe-core (WCAG 2.1 A/AA + boas práticas) em 1440px e 390px,
  incluindo os estados interativos (FAQ aberta, lightbox, menu mobile, troca de plano e
  de tela do carrossel): **zero violações**.
- Toda animação respeita `prefers-reduced-motion`, inclusive o giro automático do
  carrossel.

## Diferenças em relação ao preview

A aparência é a mesma: comparando o preview e esta versão via screenshot em 1440px, 900px
e 390px, a altura de **todas** as seções bate exatamente, exceto onde havia defeito.

**Corrigido:**

- **Hero quebrado no celular.** Uma regra sem media query aplicada depois do bloco mobile
  mantinha o hero em duas colunas abaixo de 760px: o texto era espremido em ~154px de
  largura, uma palavra por linha. Agora empilha corretamente.
- **`og:image` inválida.** Era `https://orbixsystem.com/data:image/webp;base64,...` — uma
  URL impossível, com 166 KB dentro de uma `<meta>`. Trocada por um arquivo real. O mesmo
  vale para o `logo` do JSON-LD.
- **Link do WhatsApp sem destino.** Apontava para `wa.me/?text=...`, sem telefone.
- **330 KB de imagem duplicada.** A foto do hero vinha embutida duas vezes: no `<img>` e
  em um `<link rel="preload">` de data URI (que não acelera nada).
- **565 KB de conteúdo invisível.** Uma seção de fotos estava escondida por `hidden`, por
  JavaScript e por duas regras `display:none !important` — mas as imagens continuavam
  sendo baixadas. Removida.
- **Faixa de recursos assimétrica no celular.** Três regras concorrentes davam a cada
  célula do grid 2×2 um espaçamento diferente.
- **Ícones da faixa de recursos fora do centro.** A regra `.trust-item span` também
  acertava o `.trust-icon` — que é um `<span>` — e, por ter especificidade maior, anulava
  o `display: grid; place-items: center`: o glifo encostava no canto superior esquerdo da
  caixa colorida. De quebra, o quadrado virava um retângulo de 28×31px no celular, porque
  encolhia como item flex.
- **`+` e `×` do FAQ desalinhados.** Eram um caractere de texto, e a métrica da fonte o
  deixava fora do centro da bolinha — a rotação de 45° que vira `×` escancarava o
  problema. Agora as duas barras são desenhadas em CSS.
- **Botão "Falar com a equipe" colado no parágrafo.** Era o único CTA da página com 0px
  de respiro; o restante usa 28px (21px no celular).
- **Setas do carrossel fugiam do cursor.** As três telas têm alturas bem diferentes
  (410px, 448px e 638px) e os botões, posicionados abaixo do palco, pulavam até 228px a
  cada troca: era preciso reposicionar o mouse para clicar de novo. Os controles passaram
  para cima do palco, onde a altura do slide não os desloca.
- **Carrossel ignorava `prefers-reduced-motion`** e girava sozinho mesmo assim.
- **FAQ recolhida continuava sendo lida** por leitores de tela e recebia foco.
- **Lightbox sem retenção de foco** e abrindo a versão pequena da imagem, borrada.
- **Contraste do botão de WhatsApp** (2,5:1 com o texto branco) — verde escurecido para
  5,2:1.
- **Seis links "Ver no sistema" indistinguíveis** entre si para leitores de tela.
- `<meta keywords>` removida: o Google a ignora desde 2009.

**Vale conferir com o design** (mantido igual ao preview): na seção "Como funciona", os
cards têm fundo branco sobre fundo branco, sem borda — só a barrinha colorida no topo os
delimita. Isso veio de uma revisão do preview que trocou `--paper` de cinza para branco.
Se a intenção era manter o card com superfície, é um ajuste de uma linha em
`WorkflowSection.astro`.

## Formulário de acesso

O formulário de "Solicitar acesso" abre o cliente de e-mail do visitante com assunto e
corpo prontos (`mailto:`), como no preview — não há backend. Para receber os pedidos por
POST, troque o `<script>` de `CtaSection.astro` por um envio a um serviço de formulários
ou a um endpoint da API do OrbixHub.
