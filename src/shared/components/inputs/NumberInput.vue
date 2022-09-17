<template>
  <BaseInput
    type="number"
    @input="$emit('update:modelValue', $event.target.value)"
    v-model="numberInput"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseInput from '@/shared/components/inputs/BaseInput.vue';
import { useModelWrapper } from '@/shared/composables/useModelWrapper';

export default defineComponent({
  name: 'NumberInput',
  components: { BaseInput },
  props: {
    modelValue: {
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const numberInput = useModelWrapper(props, emit);
    return {
      numberInput,
    };
  },
});
</script>
