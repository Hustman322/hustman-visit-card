// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [vue(), sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});