<template>
  <div>
    <p class="group-label">{{ label }}</p>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputGroup',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped>
.group-label {
  @apply text-18 font-medium mb-2;
}
</style>
