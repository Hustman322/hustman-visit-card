// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vueform from '@vueform/vueform/vite';

export default defineConfig({
  integrations: [vue(), sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss(), vueform()]
  }
});