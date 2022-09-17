<template>
  <div class="poll-gallery">
    <div class="poll-item" v-for="poll in polls" :key="poll.id">
      <div class="flex justify-between mb-4">
        <span>{{ poll.name }}</span>
        <span class="text-totem-200">{{ t('delete') }}</span>
      </div>
      <div class="poll-users"></div>
      <div class="poll-actions">
        <BaseInput class="w-full">{{ t('bet') }}</BaseInput>
        <BaseButton class="w-full">{{ t('bet') }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ApiPoll } from '@/shared/interfaces/api/apiPoll';
import { useTranslations } from '@/shared/composables/useTranslations';
import BaseButton from '@/shared/components/buttons/BaseButton.vue';
import BaseInput from '@/shared/components/inputs/BaseInput.vue';

export default defineComponent({
  name: 'PollGallery',
  components: { BaseInput, BaseButton },
  props: {
    polls: {
      type: Array as PropType<ApiPoll[]>,
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
