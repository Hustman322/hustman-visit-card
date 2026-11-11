import en from '@vueform/vueform/locales/en';
import { defineConfig } from '@vueform/vueform';
import classes from '@vueform/vueform/themes/vueform/classes';
import columns from '@vueform/vueform/themes/vueform/columns';
import presets from '@vueform/vueform/themes/vueform/presets';

import Vueform from '@vueform/vueform/themes/vueform/templates/Vueform.vue';
import FormErrors from '@vueform/vueform/themes/vueform/templates/FormErrors.vue';
import FormMessages from '@vueform/vueform/themes/vueform/templates/FormMessages.vue';
import FormLanguages from '@vueform/vueform/themes/vueform/templates/FormLanguages.vue';
import FormLanguage from '@vueform/vueform/themes/vueform/templates/FormLanguage.vue';
import FormTabs from '@vueform/vueform/themes/vueform/templates/FormTabs.vue';
import FormTab from '@vueform/vueform/themes/vueform/templates/FormTab.vue';
import FormSteps from '@vueform/vueform/themes/vueform/templates/FormSteps.vue';
import FormStepsControls from '@vueform/vueform/themes/vueform/templates/FormStepsControls.vue';
import FormStepsControl from '@vueform/vueform/themes/vueform/templates/FormStepsControl.vue';
import FormStep from '@vueform/vueform/themes/vueform/templates/FormStep.vue';
import FormElements from '@vueform/vueform/themes/vueform/templates/FormElements.vue';
import ElementLayout from '@vueform/vueform/themes/vueform/templates/ElementLayout.vue';
import ElementLayoutInline from '@vueform/vueform/themes/vueform/templates/ElementLayoutInline.vue';
import ElementLoader from '@vueform/vueform/themes/vueform/templates/ElementLoader.vue';
import ElementLabelFloating from '@vueform/vueform/themes/vueform/templates/ElementLabelFloating.vue';
import ElementLabel from '@vueform/vueform/themes/vueform/templates/ElementLabel.vue';
import ElementInfo from '@vueform/vueform/themes/vueform/templates/ElementInfo.vue';
import ElementDescription from '@vueform/vueform/themes/vueform/templates/ElementDescription.vue';
import ElementError from '@vueform/vueform/themes/vueform/templates/ElementError.vue';
import ElementMessage from '@vueform/vueform/themes/vueform/templates/ElementMessage.vue';
import ElementRequired from '@vueform/vueform/themes/vueform/templates/ElementRequired.vue';
import ElementText from '@vueform/vueform/themes/vueform/templates/ElementText.vue';
import ElementAddon from '@vueform/vueform/themes/vueform/templates/ElementAddon.vue';
import ElementAddonOptions from '@vueform/vueform/themes/vueform/templates/ElementAddonOptions.vue';
import TextElement from '@vueform/vueform/themes/vueform/templates/elements/TextElement.vue';
import TextareaElement from '@vueform/vueform/themes/vueform/templates/elements/TextareaElement.vue';
import SelectElement from '@vueform/vueform/themes/vueform/templates/elements/SelectElement.vue';
import ButtonElement from '@vueform/vueform/themes/vueform/templates/elements/ButtonElement.vue';

/**
 * Vueform always points `aria-labelledby`, `aria-describedby` and `aria-errormessage`
 * at label/description/info/error ids, even when those elements aren't rendered
 * (this form has no visible labels or descriptions) — a broken ARIA reference.
 * This wraps a template's render so `aria` only keeps references whose target exists.
 */
type ElementTemplate = { render: (ctx: Record<PropertyKey, unknown>, ...rest: unknown[]) => unknown };

function withExistingAriaRefs<T extends ElementTemplate>(template: T): T {
	return {
		...template,
		render(this: unknown, ctx, ...rest) {
			const proxied = new Proxy(ctx, {
				get(target, key) {
					const value = Reflect.get(target, key);
					if (key !== 'aria') return value;

					const aria = { ...(value as Record<string, unknown>) };
					const describedBy = [
						target.description ? target.descriptionId : null,
						target.info ? target.infoId : null,
					].filter(Boolean).join(' ');

					aria['aria-labelledby'] = target.hasLabel ? aria['aria-labelledby'] : undefined;
					aria['aria-describedby'] = describedBy || undefined;
					aria['aria-errormessage'] = target.error ? aria['aria-errormessage'] : undefined;
					return aria;
				},
			});
			return template.render.call(this, proxied, ...rest);
		},
	};
}

const theme = {
	templates: {
		Vueform,
		FormErrors,
		FormMessages,
		FormLanguages,
		FormLanguage,
		FormTabs,
		FormTab,
		FormSteps,
		FormStepsControls,
		FormStepsControl,
		FormStep,
		FormElements,
		ElementLayout,
		ElementLayoutInline,
		ElementLoader,
		ElementLabelFloating,
		ElementLabel,
		ElementInfo,
		ElementDescription,
		ElementError,
		ElementMessage,
		ElementRequired,
		ElementText,
		ElementAddon,
		ElementAddonOptions,
		TextElement: withExistingAriaRefs(TextElement),
		TextareaElement: withExistingAriaRefs(TextareaElement),
		SelectElement: withExistingAriaRefs(SelectElement),
		ButtonElement: withExistingAriaRefs(ButtonElement),
	},
	classes,
	columns,
	presets,
};

export default defineConfig({
	theme,
	locales: { en },
	locale: 'en',
});
