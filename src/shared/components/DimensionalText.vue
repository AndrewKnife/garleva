<template>
  <div>
    <span class="relative">
      <span class="absolute inset-0">{{ label }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '3dText',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped>
#page {
  @apply max-w-[108rem] flex flex-col h-full bg-shark-500 m-auto;
}
</style>
