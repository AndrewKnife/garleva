<template>
  <div class="poll-gallery">
    <PollGalleryItem
      v-for="poll in polls"
      :key="poll.id"
      :poll="poll"
      @selectPoll="() => selectPoll(poll)"
    />
    <EditPollModal v-if="selectedPoll" :poll="selectedPoll" @close="clearPoll" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ApiPollJson } from '@/shared/interfaces/api/apiPoll';
import { useTranslations } from '@/shared/composables/useTranslations';
import PollGalleryItem from '@/shared/components/poll_gallery/PollGalleryItem.vue';
import EditPollModal from '@/shared/components/poll_gallery/EditPollModal.vue';

export default defineComponent({
  name: 'PollGallery',
  components: { EditPollModal, PollGalleryItem },
  props: {
    polls: {
      type: Array as PropType<ApiPollJson[]>,
      required: true,
    },
  },
  setup() {
    const { t } = useTranslations();
    const selectedPoll = ref<ApiPollJson>();
    const selectPoll = (poll: ApiPollJson) => {
      selectedPoll.value = poll;
    };
    const clearPoll = () => {
      selectedPoll.value = undefined;
    };

    return { t, selectedPoll, selectPoll, clearPoll };
  },
});
</script>

<style scoped>
.poll-gallery {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4 text-peach-50;
}
</style>
