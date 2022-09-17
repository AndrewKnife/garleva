<template>
  <div class="w-full my-8">
    <span class="h-[2rem] w-full flex justif-center items-center">
      <div class="relative m-auto text-26 text-white font-bold uppercase">
        <div
          class="absolute inset-0 text-peach-800"
          style="transform: translateX(-4px) translateY(2px)"
        >
          <span>{{ label }}</span>
        </div>
        <span class="m-auto relative">{{ label }}</span>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DimensionalText',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
});
</script>
