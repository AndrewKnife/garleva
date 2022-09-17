<template>
  <button class="base-button" :class="buttonStyle">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

const baseButtonVariants = {
  default: 'default',
  green: 'green',
  red: 'red',
};

export default defineComponent({
  name: 'BaseButton',
  props: {
    variant: {
      type: String as PropType<keyof typeof baseButtonVariants>,
      default: baseButtonVariants.default,
    },
  },
  setup(props) {
    const buttonStyle = baseButtonVariants[props.variant];
    return {
      buttonStyle,
    };
  },
});
</script>

<style scoped>
.base-button {
  box-shadow: -0.4rem 0.4rem;
  @apply p-4 font-bold text-20 rounded-5 border mx-3 mb-1;
}

.base-button.default {
  @apply bg-white border-peach-800 text-peach-800;
}

.base-button.red {
  @apply bg-totem-50 border-totem-700 text-totem-700;
}

.base-button.green {
  @apply bg-green-200 border-green-900 text-green-900;
}
</style>
