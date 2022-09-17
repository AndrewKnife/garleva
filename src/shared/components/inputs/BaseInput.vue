<template>
  <button class="base-button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
});
</script>

<style scoped>
.base-button {
  @apply bg-white p-4 font-bold text-20 text-shark-600 rounded-5 border-peach border;
}
</style>
