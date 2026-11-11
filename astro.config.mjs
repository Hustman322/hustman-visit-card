// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vueform from '@vueform/vueform/vite';

export default defineConfig({
  // TODO: replace with the real production domain before deploying (canonical, OG URLs, sitemap, robots.txt).
  site: 'https://example.com',

  integrations: [vue(), sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss(), vueform()]
  }
});