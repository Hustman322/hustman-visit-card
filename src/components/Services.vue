<script setup lang="ts">
import SectionEyebrow from './ui/SectionEyebrow.vue';

const eyebrow = 'SERVICES';
const services = [
	{
		title: 'Web Development',
		description:
			'Custom websites, web applications, and business platforms built around your needs.',
		offerings: ['Custom features', 'Web apps', 'Business platforms'],
	},
	{
		title: 'AI & Automation',
		description:
			'AI integrations and automated workflows that reduce repetitive work and make your business more efficient.',
		offerings: ['AI APIs', 'Workflow automation', 'Smart features'],
	},
	{
		title: 'API & System Integrations',
		description:
			'Connect your website with third-party services, internal systems, and external APIs to keep everything working together.',
		offerings: ['Third-party APIs', 'Data flows', 'System integrations'],
	},
	{
		title: 'Maintenance & Improvements',
		description:
			'Improve existing platforms, fix issues, optimize performance, and add features without disrupting what already works.',
		offerings: ['Bug fixes', 'Performance', 'Legacy systems'],
	},
];
</script>

<template>
	<section id="services" aria-labelledby="services-title" class="flex min-h-dvh items-center bg-background">
		<div class="mx-auto w-full max-w-7xl px-[clamp(1.25rem,5vw,3rem)] py-[clamp(6rem,12vh,8rem)]">
			<SectionEyebrow :text="eyebrow" />
			<h2 id="services-title"
				class="mb-12 max-w-xl text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance text-foreground md:mb-16">
				Services designed around your business.
			</h2>

			<ul class="border-t border-foreground/10">
				<li v-for="service in services" :key="service.title"
					class="group relative grid gap-4 border-b border-foreground/10 py-8 md:grid-cols-12 md:gap-8 md:py-10">
					<!-- Gradient rule that draws across on hover -->
					<span aria-hidden="true"
						class="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-linear-to-r from-accent to-primary transition-transform duration-700 ease-out-expo group-hover:scale-x-100 motion-reduce:transition-none"></span>

					<h3
						class="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1] tracking-[-0.03em] text-balance text-foreground transition-colors duration-500 md:col-span-6 motion-reduce:transition-none">
						{{ service.title }}
					</h3>

					<div class="md:col-span-6 md:pt-1">
						<p class="max-w-prose text-base leading-relaxed text-muted">
							{{ service.description }}
						</p>
						<ul :aria-label="`Included in ${service.title}`" class="mt-4 flex flex-wrap gap-x-6 gap-y-2">
							<li v-for="item in service.offerings" :key="item"
								class="flex items-center gap-2.5 text-sm text-foreground/80">
								<span aria-hidden="true" class="h-px w-3 bg-accent"></span>{{ item }}
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</section>
</template>