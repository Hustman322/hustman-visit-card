// Single source of truth for site-wide SEO metadata.
// The production URL lives in `astro.config.mjs` (`site`) and is read via `Astro.site`.

export const seo = {
	siteName: 'HustWeb',
	title: 'HustWeb — Web development, done right',
	titleTemplate: '%s · HustWeb',
	description:
		'Web developer for growing businesses: custom websites and web apps, AI & automation, API and system integrations, plus ongoing maintenance and support.',
	locale: 'en_US',
	themeColor: '#07080f',
	/** Path under `public/`. Regenerate with `npm run og` after changing the copy in `scripts/generate-og-image.mjs`. */
	ogImage: {
		path: '/og-image.png',
		width: 1200,
		height: 630,
		alt: 'HustWeb — Web development, done right. Web developer for growing businesses.',
	},
	contact: {
		email: 'olvbman@gmail.com',
		telephone: '+48784875573',
		city: 'Warsaw',
		country: 'PL',
	},
	services: [
		'Web Development',
		'AI & Automation',
		'API & System Integrations',
		'Maintenance & Improvements',
	],
} as const;
