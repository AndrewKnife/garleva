<template>
  <input class="base-input" v-model="inputValue" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModelWrapper } from '@/shared/composables/useModelWrapper';

export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = useModelWrapper(props, emit);
    return {
      inputValue,
    };
  },
});
</script>

<style scoped>
.base-input {
  @apply bg-white p-4 font-bold text-20 text-shark-600 rounded-5 border-peach-800 border ml-3;
}
</style>
