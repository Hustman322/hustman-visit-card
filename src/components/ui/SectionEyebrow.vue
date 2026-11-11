<script setup lang="ts">
// Small uppercase label above section headings, with the brand gradient rule.
// `animated` plays the hero entrance (line draws in, text rises).
withDefaults(defineProps<{ text: string; animated?: boolean }>(), { animated: false });
</script>

<template>
	<p class="mb-6 flex items-center gap-3.5 text-xs font-medium tracking-[0.16em] text-muted">
		<span aria-hidden="true"
			class="h-px w-10 flex-none origin-left bg-linear-to-r from-accent to-primary"
			:class="animated && 'animate-line-draw motion-reduce:animate-none'"></span>
		<span v-if="animated" class="block overflow-hidden">
			<span class="block animate-rise motion-reduce:animate-none">{{ text }}</span>
		</span>
		<template v-else>{{ text }}</template>
	</p>
</template>
