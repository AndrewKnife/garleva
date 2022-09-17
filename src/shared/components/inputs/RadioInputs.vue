<template>
  <div class="radio-inputs">
    <div v-for="option in options" :key="option.id">
      <input
        v-model="inputValue"
        type="radio"
        :value="option.id"
        :name="option.id"
        :id="option.id"
        class="hidden"
      />
      <label class="option-label" :class="{ active: option.id === modelValue }" :for="option.id">
        <span>{{ option.name }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useModelWrapper } from '@/shared/composables/useModelWrapper';
import { Option } from '@/shared/interfaces/option';

export default defineComponent({
  name: 'RadioInputs',
  props: {
    modelValue: {
      required: true,
    },
    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = useModelWrapper<Option[]>(props, emit);
    return {
      inputValue,
    };
  },
});
</script>

<style scoped>
.radio-inputs {
  @apply grid grid-cols-2 px-3 gap-3 mb-4;
}

.option-label {
  @apply py-8 w-full flex justify-center items-center bg-peach-300 text-peach-600 rounded-xl;
  @apply cursor-pointer hover:bg-peach-600 hover:text-shark-500;
}

.option-label.active {
  @apply bg-peach-600 text-shark-500 font-bold border-l-2 border-b-2 border-peach-900;
  transform: translateX(2px) translateY(-2px);
}
</style>
