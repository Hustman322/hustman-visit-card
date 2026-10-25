<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);
const menuItems = [
	{ label: 'Services', href: '#services' },
	{ label: 'About Me', href: '#about-me' },
	{ label: 'Contact', href: '#contact' },
];
</script>

<template>
	<header class="relative flex flex-wrap items-center justify-between gap-0 px-[clamp(1rem,5vw,4rem)] py-4 md:gap-8">
		<a class="text-xl font-bold text-inherit no-underline" href="/" aria-label="HustWeb home">HustWeb</a>

		<button
			class="inline-flex cursor-pointer items-center gap-3 rounded-md border border-current bg-transparent p-2 text-inherit focus-visible:outline-2 focus-visible:outline-offset-3 md:hidden"
			type="button"
			:aria-expanded="isMenuOpen"
			aria-controls="site-navigation"
			@click="isMenuOpen = !isMenuOpen"
		>
			<span class="text-sm">{{ isMenuOpen ? 'Close menu' : 'Open menu' }}</span>
			<span class="grid gap-1" aria-hidden="true">
				<span class="h-0.5 w-4 bg-current"></span>
				<span class="h-0.5 w-4 bg-current"></span>
				<span class="h-0.5 w-4 bg-current"></span>
			</span>
		</button>

		<nav
			id="site-navigation"
			class="flex basis-full flex-col items-stretch gap-0 pt-3 md:flex md:basis-auto md:flex-row md:items-center md:gap-8 md:pt-0"
			:class="isMenuOpen ? 'flex' : 'hidden'"
			aria-label="Main navigation"
		>
			<a
				v-for="item in menuItems"
				:key="item.href"
				class="py-3 text-inherit no-underline hover:underline hover:underline-offset-4 focus-visible:underline focus-visible:underline-offset-4 md:py-0"
				:href="item.href"
				@click="isMenuOpen = false"
			>
				{{ item.label }}
			</a>
		</nav>
	</header>
</template>
