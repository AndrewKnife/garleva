<template>
  <input class="base-input" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      required: true,
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped>
.base-input {
  @apply bg-white p-4 font-bold text-20 text-shark-600 rounded-5 border-peach border;
}
</style>
