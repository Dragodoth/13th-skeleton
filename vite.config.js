import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	server: {
		fs: {
			allow: [
				// Allow serving files from the project root
				'/Users/pear/Documents/Code/Svelte/13th-skeleton',
				'./'
			]
		}
	}
});