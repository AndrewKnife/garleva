<template>
  <div class="modal-wrapper">
    <div class="bg-shark opacity-50 inset-0 absolute"></div>
    <div class="modal relative">
      <div class="modal-heading">
        <p>{{ label }}</p>
      </div>
      <slot></slot>
      <button @click.prevent="$emit('close')" class="close-button">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseModal',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped>
.modal-wrapper {
  @apply fixed inset-0 flex items-center justify-center;
}

.modal {
  @apply min-w-[40rem] max-w-[60rem] p-8 bg-peach-50 rounded-3xl;
}

.modal-heading {
  @apply text-24 font-medium pb-4;
}

.close-button {
  @apply absolute top-2 right-2 text-20 font-medium text-shark-400;
}
</style>
