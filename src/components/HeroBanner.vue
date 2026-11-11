<script setup lang="ts">
import avatar from '../assets/images/avatar.png';
import SectionEyebrow from './ui/SectionEyebrow.vue';
import HandshakeIcon from './ui/icons/HandshakeIcon.vue';

const eyebrow = 'WEB DEVELOPER · FOR GROWING BUSINESSES';
const headlineLead = 'Web development,';
const headlineAccent = 'done right.'; // rendered in the brand gradient
const headline = `${headlineLead} ${headlineAccent}`;
const description =
	'Development, integrations, AI-powered solutions, and ongoing support for your business.';
const ctaLabel = "Let's work together";
const ctaHref = '#contact';

const accentWords = headlineAccent.split(' ');
const words = [
	...headlineLead.split(' ').map((text) => ({ text, accent: false, style: {} })),
	// One continuous cyan → indigo gradient spread across the accent words
	...accentWords.map((text, j) => ({
		text,
		accent: true,
		style: {
			backgroundSize: `${accentWords.length * 100}% 100%`,
			backgroundPosition: `${accentWords.length > 1 ? (j / (accentWords.length - 1)) * 100 : 0}% 0`,
		},
	})),
];

// Timeline (seconds) — one orchestrated load sequence
const WORDS_START = 0.55;
const WORD_STEP = 0.055;
const wordsEnd = WORDS_START + words.length * WORD_STEP;

// word-in delay, then shine sweep delay (two comma-separated animations)
const wordDelay = (i: number) => ({
	animationDelay: `${WORDS_START + i * WORD_STEP}s, ${wordsEnd + 0.25 + i * 0.03}s`,
});
const textDelay = { animationDelay: `${wordsEnd + 0.05}s` };
const ctaDelay = { animationDelay: `${wordsEnd + 0.2}s` };
</script>

<template>
	<main class="relative isolate min-h-dvh overflow-hidden bg-background">
		<!-- Spotlight: centered on mobile, behind the avatar on desktop -->
		<div aria-hidden="true"
			class="pointer-events-none absolute inset-0 -z-10 blur-[2rem] animate-spot motion-reduce:animate-none
				[--spot-x:50%] [--spot-y:62%] lg:[--spot-x:72%] lg:[--spot-y:55%]
				bg-[radial-gradient(ellipse_32%_42%_at_var(--spot-x)_var(--spot-y),color-mix(in_srgb,var(--color-accent)_10%,transparent),transparent_100%),radial-gradient(ellipse_58%_66%_at_var(--spot-x)_var(--spot-y),color-mix(in_srgb,var(--color-primary)_9%,transparent),transparent_100%)]">
		</div>

		<div class="mx-auto grid min-h-[inherit] max-w-7xl grid-rows-[auto_1fr] gap-6
				px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(7.5rem,16vh,10rem)]
				lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:grid-rows-1 lg:items-center lg:gap-12 lg:pt-0">
			<!-- Text -->
			<div class="relative z-10 max-w-136 lg:py-16">
				<SectionEyebrow :text="eyebrow" animated />

				<h1
					class="text-[clamp(1.875rem,3.8vw,3.25rem)] font-semibold leading-[1] tracking-[-0.03em] text-balance text-foreground">
					<span class="sr-only">{{ headline }}</span>
					<span v-for="(word, i) in words" :key="`${word.text}-${i}`" aria-hidden="true"
						class="-mb-[0.25em] me-[0.24em] inline-block overflow-hidden align-top">
						<span :style="[wordDelay(i), word.style]"
							class="inline-block pb-[0.25em] bg-clip-text bg-no-repeat text-transparent motion-reduce:animate-none"
							:class="word.accent
								? 'bg-linear-to-r from-accent to-primary animate-word-in'
								: `bg-size-[300%_100%] bg-position-[100%_0]
									bg-[linear-gradient(100deg,var(--color-foreground)_40%,var(--color-accent)_48%,var(--color-primary)_52%,var(--color-foreground)_60%)]
									animate-word`">{{ word.text }}</span>
					</span>
				</h1>

				<p :style="textDelay"
					class="mt-6 max-w-120 text-[clamp(0.9375rem,1.1vw,1rem)] leading-relaxed text-muted animate-fade-up motion-reduce:animate-none">
					{{ description }}
				</p>

				<!-- Wrapper animates in; the link handles hover (so the entrance doesn't block hover transform) -->
				<div :style="ctaDelay" class="mt-8 animate-fade-up motion-reduce:animate-none">
					<a :href="ctaHref" class="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background
							transition-[box-shadow,translate] duration-300 ease-out-expo
							hover:-translate-y-0.5
							hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent)_60%,transparent),0_10px_40px_-8px_color-mix(in_srgb,var(--color-primary)_70%,transparent)]
							focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
							motion-reduce:transition-none">
						<span>{{ ctaLabel }}</span>
						<!-- Handshake tilts and grows slightly on hover/focus -->
						<HandshakeIcon class="size-5 flex-none transition-transform duration-300 ease-out-expo
								group-hover:-rotate-12 group-hover:scale-110
								group-focus-visible:-rotate-12 group-focus-visible:scale-110
								motion-reduce:transition-none" />
					</a>
				</div>
			</div>

			<!-- Avatar (801×1145) -->
			<div class="flex items-end justify-center">
				<img :src="avatar.src" :width="avatar.width" :height="avatar.height" alt="Avatar" decoding="async"
					fetchpriority="high" class="block aspect-[801/1145] h-[min(100vw,26rem)] w-auto max-w-full object-contain
						mask-[linear-gradient(to_bottom,#000_78%,transparent)]
						animate-avatar-in motion-reduce:animate-none
						lg:h-[min(50vw,36rem)]" />
			</div>
		</div>
	</main>
</template>