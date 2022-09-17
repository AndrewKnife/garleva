<template>
  <div class="poll-users">
    <div v-if="poll.betters.length" class="grid grid-cols-3 bg-shark-100 py-2 px-2">
      <span>{{ t('user') }}</span>
      <span class="w-full text-center">{{ t('money') }}</span>
      <span class="w-full text-right">{{ t('for') }}</span>
    </div>
    <PollGalleryUser
      v-for="better in poll.betters"
      :key="better.id"
      :better="better"
      :poll-options="poll.options"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useTranslations } from '@/shared/composables/useTranslations';
import { ApiPollJson } from '@/shared/interfaces/api/apiPoll';
import PollGalleryUser from '@/shared/components/poll_gallery/PollGalleryUser.vue';

export default defineComponent({
  name: 'PollGalleryBettersList',
  components: { PollGalleryUser },
  props: {
    poll: {
      type: Object as PropType<ApiPollJson>,
      required: true,
    },
  },
  setup() {
    const { t } = useTranslations();

    return { t };
  },
});
</script>

<style scoped></style>
