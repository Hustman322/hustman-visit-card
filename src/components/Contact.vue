<script setup lang="ts">
// Static section. The form itself is the `form` slot, filled by a client-only <ContactForm /> island.
import SectionEyebrow from './ui/SectionEyebrow.vue';
import PhoneIcon from './ui/icons/PhoneIcon.vue';
import MailIcon from './ui/icons/MailIcon.vue';
import CalendarIcon from './ui/icons/CalendarIcon.vue';
import MapPinIcon from './ui/icons/MapPinIcon.vue';

const info = {
	title: 'Contact information',
	description:
		"Have a project in mind or need help with an existing one? Reach out and I'll get back to you as soon as possible.",
	items: [
		{ label: 'Phone', icon: PhoneIcon, value: '+48 784 875 573', href: 'tel:+48784875573' },
		{ label: 'Email', icon: MailIcon, value: 'olvbman@gmail.com', href: 'mailto:olvbman@gmail.com' },
		{ label: 'Working hours', icon: CalendarIcon, value: 'Every day: 9:00 – 22:00' },
		{ label: 'Location', icon: MapPinIcon, value: 'Warsaw / Remote · worldwide' },
	],
};

const eyebrow = 'CONTACT';
const titleLead = 'Need a';
const titleAccent = 'consultation?';
const intro =
	"Share a few details about your business and goals. I'll contact you personally to discuss the right solution, timeline, and next steps.";

</script>

<template>
	<section id="contact" aria-labelledby="contact-title" class="flex min-h-dvh items-center bg-background">
		<div
			class="mx-auto grid w-full max-w-7xl gap-6 px-[clamp(1.25rem,5vw,3rem)] py-[clamp(6rem,12vh,8rem)]
				lg:grid-cols-12 lg:items-start lg:gap-8">
			<!-- Form card: first on mobile, right column on desktop -->
			<div class="rounded-2xl border border-foreground/10 bg-surface p-6 sm:p-10 lg:col-span-8">

				<SectionEyebrow :text="eyebrow" />

				<h2 id="contact-title"
					class="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance text-foreground">
					{{ titleLead }}
					<span class="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">{{ titleAccent }}</span>
				</h2>
				<p class="mt-4 max-w-xl text-base leading-relaxed text-muted">{{ intro }}</p>

				<!-- Reserve roughly the form's height so the client-only island doesn't shift the layout -->
				<div class="mt-8 min-h-[26rem] sm:min-h-[22rem]">
					<slot name="form" />
				</div>
			</div>
			<!-- Contact information card -->
			<aside aria-labelledby="contact-info-title"
				class="rounded-2xl border border-foreground/10 bg-surface p-6 sm:p-8 lg:order-first lg:col-span-4">
				<h3 id="contact-info-title" class="text-2xl font-semibold tracking-[-0.02em] text-foreground">
					{{ info.title }}
				</h3>
				<p class="mt-3 text-sm leading-relaxed text-muted">{{ info.description }}</p>

				<ul class="mt-8">
					<li v-for="item in info.items" :key="item.label"
						class="flex items-center gap-4 border-b border-foreground/10 py-5 first:pt-0 last:border-b-0 last:pb-0">
						<component :is="item.icon" class="size-8 flex-none" />
						<div class="min-w-0">
							<p class="text-base font-medium text-foreground">{{ item.label }}</p>
							<a v-if="item.href" :href="item.href"
								class="mt-0.5 block truncate rounded-sm text-sm text-muted transition-colors duration-200 hover:text-accent
									focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
									motion-reduce:transition-none">
								{{ item.value }}
							</a>
							<p v-else class="mt-0.5 text-sm text-muted">{{ item.value }}</p>
						</div>
					</li>
				</ul>
			</aside>

		</div>
	</section>
</template>
