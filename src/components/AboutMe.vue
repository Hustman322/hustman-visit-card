<script setup lang="ts">
import SectionEyebrow from './ui/SectionEyebrow.vue';
import DownloadIcon from './ui/icons/DownloadIcon.vue';
import photo from '../assets/images/myself.png';

const eyebrow = 'ABOUT ME';
const titleLead = 'I build for';
const titleAccent = 'your business,';
const titleTail = 'not just for the code.';

const bio = [
	"I'm a web developer who builds websites, web applications, and integrations for businesses, and stays involved after launch to keep them running and improving.",
	'I care about what the work does for you: fewer manual tasks, systems that talk to each other, and a platform you can rely on long after launch.',
];

const cvLabel = 'Download my CV';
const cvHref = '/cv.pdf';
const cvFileName = 'HustWeb-CV.pdf';

const principles = [
	{
		title: 'Clear communication',
		description: "You always know what's being built, why, and when.",
	},
	{
		title: 'Business first',
		description: 'Every feature starts with the problem it solves for you.',
	},
	{
		title: 'Built to last',
		description: 'Clean, maintainable code and support after launch.',
	},
];

const pad = (n: number) => String(n).padStart(2, '0');
</script>

<template>
	<section id="about-me" aria-labelledby="about-me-title" class="flex min-h-dvh items-center bg-background">
		<div
			class="mx-auto grid w-full max-w-7xl gap-12 px-[clamp(1.25rem,5vw,3rem)] py-[clamp(6rem,12vh,8rem)]
				lg:grid-cols-12 lg:gap-16">
			<!-- Intro -->
			<div class="lg:col-span-5">
				<SectionEyebrow :text="eyebrow" />

				<h2 id="about-me-title"
					class="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance text-foreground">
					{{ titleLead }}
					<span class="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">{{ titleAccent }}</span>
					{{ titleTail }}
				</h2>

				<!-- Photo (960×1280): cropped to 4:3, framed on head to waist -->
				<div class="mt-10 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-surface lg:mt-14">
					<img :src="photo.src" :width="photo.width" :height="photo.height"
						alt="Me standing on a bridge over a river" loading="lazy" decoding="async"
						class="size-full object-cover object-[50%_45%]" />
				</div>
			</div>

			<!-- Bio + principles -->
			<div class="lg:col-span-7 lg:pt-12">
				<div class="space-y-5">
					<p v-for="(paragraph, i) in bio" :key="i"
						class="max-w-prose text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-relaxed"
						:class="i === 0 ? 'text-foreground' : 'text-muted'">
						{{ paragraph }}
					</p>
				</div>

				<a :href="cvHref" :download="cvFileName"
					class="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-foreground/15 px-5 py-3
						text-sm font-medium text-foreground
						transition-[border-color,background-color,translate] duration-300 ease-out-expo
						hover:-translate-y-0.5 hover:border-accent/50 hover:bg-foreground/5
						focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
						motion-reduce:transition-none">
					<span>{{ cvLabel }}</span>
					<DownloadIcon class="size-4 flex-none text-accent" />
					<span class="sr-only">(PDF)</span>
				</a>

				<ul class="mt-12 grid gap-4 sm:grid-cols-3">
					<li v-for="(item, i) in principles" :key="item.title"
						class="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-surface p-5
							transition-[border-color,translate] duration-500 ease-out-expo
							hover:-translate-y-1 hover:border-accent/30
							motion-reduce:transition-none">
						<span aria-hidden="true"
							class="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-3xl
								bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_45%,transparent),transparent_70%)]
								transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"></span>

						<span aria-hidden="true" class="block text-sm font-medium tracking-[0.12em] text-accent">{{ pad(i + 1) }}</span>
						<h3 class="mt-3 text-lg leading-snug font-semibold tracking-[-0.01em] text-foreground">{{ item.title }}</h3>
						<p class="mt-1.5 text-sm leading-normal text-muted">{{ item.description }}</p>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
