<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

type MenuItem = { label: string; href: string; cta?: boolean };

const menuItems: MenuItem[] = [
	{ label: 'Services', href: '#services' },
	{ label: 'About Me', href: '#about-me' },
	{ label: 'Contact', href: '#contact', cta: true },
];

const navItems = menuItems.filter((item) => !item.cta);
const ctaItem = menuItems.find((item) => item.cta);

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const activeHref = ref<string | null>(null);
const hoveredHref = ref<string | null>(null);

const headerRef = ref<HTMLElement | null>(null);
const toggleRef = ref<HTMLButtonElement | null>(null);
const mobilePanelRef = ref<HTMLElement | null>(null);

/* ---------- Desktop: sliding pill indicator ---------- */
const linkEls = new Map<string, HTMLElement>();
const indicator = ref({ x: 0, width: 0, visible: false });

function setLinkRef(href: string, el: unknown) {
	if (el instanceof HTMLElement) linkEls.set(href, el);
	else linkEls.delete(href);
}

function updateIndicator() {
	const target = hoveredHref.value ?? activeHref.value;
	const el = target ? linkEls.get(target) : undefined;
	if (!el) {
		indicator.value = { ...indicator.value, visible: false };
		return;
	}
	indicator.value = { x: el.offsetLeft, width: el.offsetWidth, visible: true };
}

watch([hoveredHref, activeHref], updateIndicator);

/* ---------- Mobile: open / close behaviour ---------- */
function closeMenu({ restoreFocus = false } = {}) {
	isMenuOpen.value = false;
	if (restoreFocus) toggleRef.value?.focus();
}

watch(isMenuOpen, async (open) => {
	document.documentElement.style.overflow = open ? 'hidden' : '';
	if (open) {
		await nextTick();
		mobilePanelRef.value?.querySelector<HTMLElement>('a')?.focus();
	}
});

function onKeydown(event: KeyboardEvent) {
	if (!isMenuOpen.value) return;

	if (event.key === 'Escape') {
		closeMenu({ restoreFocus: true });
		return;
	}

	// Keep Tab focus inside the header (toggle + open panel) while the menu is open
	if (event.key !== 'Tab' || !headerRef.value) return;
	const focusables = Array.from(headerRef.value.querySelectorAll<HTMLElement>('a[href], button')).filter(
		(el) => el.getClientRects().length > 0,
	);
	const first = focusables[0];
	const last = focusables[focusables.length - 1];
	if (event.shiftKey && document.activeElement === first) {
		event.preventDefault();
		last?.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first?.focus();
	}
}

/* ---------- Lifecycle: scroll state, active section, breakpoint ---------- */
let sectionObserver: IntersectionObserver | null = null;
let desktopQuery: MediaQueryList | null = null;

function onScroll() {
	isScrolled.value = window.scrollY > 8;
}

function onBreakpointChange(event: MediaQueryListEvent) {
	if (event.matches) closeMenu();
	updateIndicator();
}

onMounted(() => {
	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', updateIndicator, { passive: true });
	document.addEventListener('keydown', onKeydown);

	desktopQuery = window.matchMedia('(min-width: 48rem)');
	desktopQuery.addEventListener('change', onBreakpointChange);

	// Highlight the section currently crossing the middle of the viewport
	const visible = new Set<string>();
	sectionObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const href = `#${entry.target.id}`;
				if (entry.isIntersecting) visible.add(href);
				else visible.delete(href);
			}
			activeHref.value = menuItems.map((item) => item.href).find((href) => visible.has(href)) ?? null;
		},
		{ rootMargin: '-45% 0px -50% 0px' },
	);
	for (const item of menuItems) {
		const section = document.querySelector(item.href);
		if (section) sectionObserver.observe(section);
	}
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', onScroll);
	window.removeEventListener('resize', updateIndicator);
	document.removeEventListener('keydown', onKeydown);
	desktopQuery?.removeEventListener('change', onBreakpointChange);
	sectionObserver?.disconnect();
	document.documentElement.style.overflow = '';
});
</script>

<template>
	<header ref="headerRef" class="sticky top-0 z-50 isolate">
		<!-- Background layer: kept separate so backdrop-blur doesn't trap the fixed mobile panel -->
		<div
			class="absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-300 motion-reduce:transition-none"
			:class="
				isScrolled && !isMenuOpen
					? 'border-foreground/10 bg-background/75 backdrop-blur-md'
					: 'border-transparent bg-transparent'
			"
			aria-hidden="true"
		></div>

		<div
			class="flex items-center justify-between gap-8 px-[clamp(1rem,5vw,4rem)] transition-[padding] duration-300 motion-reduce:transition-none"
			:class="isScrolled ? 'py-3' : 'py-5'"
		>
			<a
				class="relative z-50 rounded-sm text-xl font-medium tracking-tight text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
				href="/"
				aria-label="HustWeb home"
				@click="closeMenu()"
			>
				HustWeb
			</a>

			<!-- Desktop navigation -->
			<nav class="hidden items-center gap-6 md:flex" aria-label="Main navigation">
				<ul class="relative flex items-center gap-1" @mouseleave="hoveredHref = null">
					<span
						class="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-foreground/8 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
						:class="indicator.visible ? 'opacity-100' : 'opacity-0'"
						:style="{ width: `${indicator.width}px`, transform: `translateX(${indicator.x}px)` }"
						aria-hidden="true"
					></span>
					<li v-for="item in navItems" :key="item.href">
						<a
							:ref="(el) => setLinkRef(item.href, el)"
							class="relative block rounded-full px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
							:class="activeHref === item.href ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'"
							:href="item.href"
							:aria-current="activeHref === item.href ? 'location' : undefined"
							@mouseenter="hoveredHref = item.href"
							@focus="hoveredHref = item.href"
							@blur="hoveredHref = null"
						>
							{{ item.label }}
						</a>
					</li>
				</ul>

				<a
					v-if="ctaItem"
					class="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-[background-color,transform] duration-200 hover:bg-accent active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-3 motion-reduce:transition-none"
					:href="ctaItem.href"
					:aria-current="activeHref === ctaItem.href ? 'location' : undefined"
				>
					{{ ctaItem.label }}
				</a>
			</nav>

			<!-- Mobile toggle -->
			<button
				ref="toggleRef"
				class="relative z-50 inline-flex cursor-pointer items-center gap-3 rounded-full border border-foreground/15 bg-background/60 py-2 pr-3 pl-4 text-inherit backdrop-blur-sm transition-colors duration-200 hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-3 md:hidden"
				type="button"
				:aria-expanded="isMenuOpen"
				aria-controls="mobile-navigation"
				@click="isMenuOpen = !isMenuOpen"
			>
				<span class="text-sm font-medium">{{ isMenuOpen ? 'Close' : 'Menu' }}</span>
				<span class="sr-only">navigation</span>
				<span class="relative h-3.5 w-5" aria-hidden="true">
					<span
						class="absolute top-0 left-0 h-0.5 w-full rounded-full bg-current"
						:class="isMenuOpen && 'translate-y-1.5 rotate-45'"
					></span>
					<span
						class="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 rounded-full bg-current"
						:class="isMenuOpen && 'opacity-0'"
					></span>
					<span
						class="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-current"
						:class="isMenuOpen && '-translate-y-1.5 -rotate-45'"
					></span>
				</span>
			</button>
		</div>

		<!-- Mobile full-screen panel (opens instantly) -->
			<div
				v-if="isMenuOpen"
				id="mobile-navigation"
				ref="mobilePanelRef"
				class="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background px-[clamp(1rem,5vw,4rem)] pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] md:hidden"
			>
				<nav class="flex-1" aria-label="Main navigation">
					<ul class="flex flex-col">
						<li
							v-for="item in navItems"
							:key="item.href"
							class="border-b border-foreground/10"
						>
							<a
								class="group flex items-baseline justify-between py-5 text-[clamp(2.25rem,10vw,3.25rem)] leading-none font-medium tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4"
								:class="activeHref === item.href ? 'text-accent' : 'text-foreground hover:text-accent'"
								:href="item.href"
								:aria-current="activeHref === item.href ? 'location' : undefined"
								@click="closeMenu()"
							>
								{{ item.label }}
								<span
									class="size-2.5 rounded-full bg-current"
									:class="activeHref === item.href ? 'scale-100' : 'scale-0 group-hover:scale-100'"
									aria-hidden="true"
								></span>
							</a>
						</li>
					</ul>
				</nav>

				<a
					v-if="ctaItem"
					class="mt-10 block rounded-full bg-foreground py-4 text-center text-lg font-medium text-background transition-colors duration-200 hover:bg-accent active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3"
					:href="ctaItem.href"
					@click="closeMenu()"
				>
					{{ ctaItem.label }}
				</a>
			</div>
	</header>
</template>