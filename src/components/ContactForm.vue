<script setup lang="ts">
// Client-only island (`client:only="vue"`): Vueform's theme can't render on the server.
// Vueform is registered on this island's own Vue app, so other islands don't ship it.
import { getCurrentInstance, ref } from 'vue';
// Named VueformPlugin: in <script setup> an import called `Vueform` would shadow the <Vueform> component
import VueformPlugin from '@vueform/vueform';
import vueformConfig from '../../vueform.config';

getCurrentInstance()?.appContext.app.use(VueformPlugin, vueformConfig);

const serviceOptions = [
	'Web Development',
	'AI & Automation',
	'API & System Integrations',
	'Maintenance & Improvements',
	'Not sure yet',
];

const submitted = ref(false);

// TODO: no backend yet. Send `form$.data` to a form service or API here.
function onSubmit(form$: { data: Record<string, unknown>; reset: () => void }) {
	console.info('Contact form submitted', form$.data);
	submitted.value = true;
	form$.reset();
}
</script>

<template>
	<div class="vf-theme-site">
		<Vueform :endpoint="false" :display-errors="false" validate-on="change|step" @submit="onSubmit">
			<TextElement name="name" placeholder="Your name" :columns="{ sm: 6 }" rules="required"
				:messages="{ required: 'Please enter your name.' }"
				:attrs="{ autocomplete: 'name', 'aria-label': 'Your name' }" />
			<TextElement name="email" input-type="email" placeholder="Email address" :columns="{ sm: 6 }"
				rules="required|email"
				:messages="{ required: 'Please enter your email.', email: 'Please enter a valid email address.' }"
				:attrs="{ autocomplete: 'email', 'aria-label': 'Email address' }" />
			<TextElement name="phone" input-type="tel" placeholder="Phone (optional)" :columns="{ sm: 6 }"
				:attrs="{ autocomplete: 'tel', 'aria-label': 'Phone number' }" />
			<SelectElement name="service" placeholder="Service you're interested in" :items="serviceOptions"
				:native="true" :can-clear="false" :columns="{ sm: 6 }"
				:attrs="{ 'aria-label': 'Service you\'re interested in' }" />
			<TextareaElement name="message" placeholder="Tell me about your project" :rows="5"
				rules="required|min:10"
				:messages="{ required: 'Please tell me a bit about your project.', min: 'A few more words, please (10+ characters).' }"
				:attrs="{ 'aria-label': 'Message' }" />
			<ButtonElement name="submit" submits :button-class="[
				'inline-flex items-center gap-2.5 rounded-full border-0 px-6 py-3 text-sm font-medium',
				'bg-foreground text-background',
				'transition-[box-shadow,translate] duration-300 ease-out-expo hover:-translate-y-0.5',
				'hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent)_60%,transparent),0_10px_40px_-8px_color-mix(in_srgb,var(--color-primary)_70%,transparent)]',
				'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
				'motion-reduce:transition-none',
			]">
				Send message
				<!-- Icon placeholder: icon to be chosen later -->
				<span aria-hidden="true" class="size-5 rounded-full bg-background/15"></span>
			</ButtonElement>
		</Vueform>

		<p v-if="submitted" role="status" class="mt-4 text-sm text-accent">
			Thanks! Your message has been sent. I'll get back to you soon.
		</p>
	</div>
</template>
