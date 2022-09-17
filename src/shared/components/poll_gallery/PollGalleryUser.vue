<template>
  <div class="poll-gallery">
    <PollGalleryItem v-for="poll in polls" :key="poll.id" :poll="poll" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ApiPollJson } from '@/shared/interfaces/api/apiPoll';
import { useTranslations } from '@/shared/composables/useTranslations';
import PollGalleryItem from '@/shared/components/poll_gallery/PollGalleryItem.vue';

export default defineComponent({
  name: 'PollGallery',
  components: { PollGalleryItem },
  props: {
    polls: {
      type: Array as PropType<ApiPollJson[]>,
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
.poll-gallery {
  @apply grid grid-cols-2 md:grid-cols-3 gap-4 text-peach-50;
}

.poll-item {
  @apply bg-shark-400 rounded-2xl p-4;
}

.poll-actions {
  @apply flex;
}
</style>
