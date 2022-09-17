<template>
  <label :class="[$style.checkbox, $attrs.class]">
    <input
      v-bind="$attrs"
      :value="modelValue"
      :checked="modelValue"
      type="checkbox"
      :class="$style.checkboxInput"
      @input="$emit('update:modelValue', $event.target.checked)"
    />
    <div :class="$style.checkboxContainer">
      <div :class="[$style.checkboxBox, { [$style.variantBold]: variant === variants.bold }]">
        <Check :class="$style.checkboxCheck" />
      </div>
    </div>
    <div :class="[$style.checkboxLabel, { [$style.variantBold]: variant === variants.bold }]">
      <slot></slot>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Check from '@/shared/assets/icons/check.svg?inline';

export const variants = { primary: 'primary', bold: 'bold' };
type VariantTypes = keyof typeof variants;

export default defineComponent({
  name: 'BaseCheckbox',
  components: { Check },
  inheritAttrs: false,
  props: {
    variant: {
      type: String as PropType<VariantTypes>,
      default: variants.primary,
      validator: (value: string) => {
        return Object.keys(variants).includes(value);
      },
    },
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    return { variants };
  },
});
</script>
<style module>
.checkbox {
  @apply inline-flex items-center;
}

.checkboxInput {
  @apply hidden absolute;
}

.checkboxContainer {
  @apply rounded-3 border-transparent transition ease-in-out duration-100 p-2;
}

.checkboxBox {
  @apply bg-transparent border rounded-2 border-peach-800;
  @apply flex flex-shrink-0 justify-center items-center;
  @apply w-9 h-9;
}

.checkboxCheck {
  @apply fill-current absolute hidden w-auto h-auto text-peach-800 pointer-events-none;
}

.checkboxLabel:not(:empty) {
  @apply flex items-center text-18 ml-1 font-medium;
}

/*Variant bold*/
.variantBold.checkboxBox {
  @apply border-2;
}

.variantBold.checkboxLabel {
  @apply font-bold;
}

/*Checked*/
.checkboxInput:checked + .checkboxContainer .checkboxBox {
  @apply bg-peach-200;
}

.checkboxInput:checked + .checkboxContainer .checkboxCheck {
  @apply block;
}

/*Focus*/
.checkboxInput:focus + .checkboxContainer {
  @apply bg-gray-200;
}

.checkboxInput:focus:checked + .checkboxContainer .checkboxCheck {
  @apply text-gray-200;
}

/*Hover*/

.checkbox:hover > .checkboxInput:not(:disabled) + .checkboxContainer {
  @apply bg-peach-400;
}

.checkbox:hover > .checkboxInput:checked:not(:disabled) + .checkboxContainer .checkboxCheck {
  @apply text-peach-500;
}

/*Disabled*/

.checkboxInput:disabled + .checkboxContainer .checkboxBox {
  @apply border-gray-800;
}

.checkboxInput:disabled:checked + .checkboxContainer .checkboxBox {
  @apply bg-gray-800;
}

.checkboxInput:disabled + .checkboxContainer + .checkboxLabel {
  @apply text-gray-800;
}
</style>
