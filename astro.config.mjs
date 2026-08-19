// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { site } from './site.config.ts';

// https://astro.build/config
export default defineConfig({
  site: site.url,
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
