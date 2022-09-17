<template>
  <div>
    <DimensionalText :label="t('closed_poll_heading')" />
    <div class="poll-gallery">
      <div v-for="poll in polls" :key="poll.id" class="prev-poll-wrapper">
        <span class="text-20">{{ poll.name }}</span>
        <div class="my-6">
          <span class="text-18">{{ t('closed_poll_winning_options') }}</span>
        </div>
        <div v-for="opt in getWinningOptions(poll.options, poll.winningOptions)" :key="opt.id">
          <div class="w-full bg-shark-200 p-2 my-1">
            <span>{{ opt.name }}</span>
          </div>
        </div>
        <div class="my-6">
          <span class="text-20">{{ t('closed_poll_betters') }}</span>
        </div>
        <div
          v-for="better in getWinningBetters(poll.betters, poll.winningOptions)"
          :key="better.id"
        >
          <div class="w-full bg-yellow-400 p-2 my-1 text-shark-600">
            <span>{{ better.name }}</span>
          </div>
        </div>
        <div v-for="better in getLosingBetters(poll.betters, poll.winningOptions)" :key="better.id">
          <div class="w-full bg-shark-200 p-2 my-1">
            <span>{{ better.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ApiPollJson, Better } from '@/shared/interfaces/api/apiPoll';
import { useTranslations } from '@/shared/composables/useTranslations';
import { Option } from '@/shared/interfaces/option';
import DimensionalText from '@/shared/components/DimensionalText.vue';

export default defineComponent({
  name: 'PrevPollGallery',
  components: { DimensionalText },
  props: {
    polls: {
      type: Array as PropType<ApiPollJson[]>,
      required: true,
    },
  },
  setup() {
    const { t } = useTranslations();

    const getWinningOptions = (options: Option[], winningOptions: number[]): Option[] => {
      return options.filter((option) => winningOptions.includes(option.id));
    };

    const getWinningBetters = (betters: Better[], winningOptions: number[]): Better[] => {
      return betters.filter((better) => winningOptions.includes(better.betOption));
    };

    const getLosingBetters = (betters: Better[], winningOptions: number[]): Better[] => {
      return betters.filter((better) => !winningOptions.includes(better.betOption));
    };

    return { t, getWinningOptions, getWinningBetters, getLosingBetters };
  },
});
</script>

<style scoped>
.poll-gallery {
  @apply grid grid-cols-2 md:grid-cols-3 gap-4 text-peach-50;
}

.prev-poll-wrapper {
  @apply bg-shark-400 rounded-2xl p-4 font-medium;
}
</style>
