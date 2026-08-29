// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { site } from './site.config.ts';

// Destino da publicação. O padrão é o domínio próprio de site.config.ts; as variáveis de
// ambiente existem para o GitHub Pages servir a página em orbixsystem.github.io/OrbixLP
// enquanto o DNS de orbixsystem.com ainda aponta para outro lugar. Apagar SITE_URL e
// BASE_PATH nas variáveis do repositório devolve o site ao domínio próprio, sem tocar
// no código.
const siteUrl = process.env.SITE_URL || site.url;
const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base,
  trailingSlash: 'never',
  compressHTML: true,

  integrations: [sitemap()],

  // Fontes baixadas e servidas pelo próprio domínio: sem requisição de terceiros
  // bloqueando a renderização e sem enviar IP do visitante para o Google (LGPD).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Sora',
      cssVariable: '--font-display',
      weights: [500, 600, 700],
      subsets: ['latin', 'latin-ext'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'DM Sans',
      cssVariable: '--font-body',
      weights: [400, 500, 600, 700],
      subsets: ['latin', 'latin-ext'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  image: {
    // Imagens locais são reprocessadas para AVIF/WebP com dimensões explícitas.
    responsiveStyles: true,
  },

  build: {
    inlineStylesheets: 'auto',
  },
});
