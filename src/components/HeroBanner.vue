<template>
	<main class="hero">
		<div class="hero__spotlight" aria-hidden="true"></div>
	</main>
</template>

<style scoped>
.hero {
	position: relative;
	isolation: isolate;
	min-height: max(34rem, 76svh);
	overflow: hidden;
	background: var(--color-background);
}

.hero__spotlight {
	position: absolute;
	inset: 0;
	background:
		radial-gradient(ellipse 32% 42% at 50% 50%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 100%),
		radial-gradient(ellipse 58% 66% at 50% 50%, color-mix(in srgb, var(--color-primary) 9%, transparent), transparent 100%);
	filter: blur(2rem);
	pointer-events: none;
}
</style>
