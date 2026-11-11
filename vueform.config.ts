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
		TextElement,
		TextareaElement,
		SelectElement,
		ButtonElement,
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
