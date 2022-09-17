<template>
  <div class="better-row">
    <span class="w-full">{{ better.name }}</span>
    <span class="w-full text-center flex items-center justify-center">
      {{ better.betAmount }}
    </span>
    <span class="w-full text-right flex items-center justify-end">
      {{ pollOptions.find((option) => option.id === better.betOption).name }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useTranslations } from '@/shared/composables/useTranslations';
import { Better, PollOption } from '@/shared/interfaces/api/apiPoll';

export default defineComponent({
  name: 'PollGalleryUser',
  props: {
    better: {
      type: Object as PropType<Better>,
      required: true,
    },
    pollOptions: {
      type: Array as PropType<PollOption[]>,
      required: true,
    },
  },
  setup() {
    const { t } = useTranslations();

    return { t };
  },
});
</script>

<style scoped>
.better-row {
  @apply border-b-2 border-t-2 pb-1 border-shark-500 grid grid-cols-3 py-4 even:bg-shark-300 px-2;
}
</style>
