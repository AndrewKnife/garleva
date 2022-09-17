<template>
  <div class="poll-gallery">
    <div v-for="poll in polls" :key="poll.id" class="poll-item">
      <div class="flex justify-between mb-4">
        <span class="font-medium">{{ poll.name }}</span>
        <button v-if="isAdmin()" @click="() => handleDelete(poll.id)" class="text-totem-200">
          {{ t('delete') }}
        </button>
      </div>
      <div class="mb-4 border-b-2 pb-1 border-shark-500">
        <span>{{ t('poll_total_pot') }}</span>
        <span>{{ poll.poll }}</span>
      </div>
      <div class="poll-users">
        <div
          v-for="better in poll.betters"
          class="mb-4 border-b-2 pb-1 border-shark-500"
          :key="better.id"
        >
          <span>{{ better.name }}</span>
          <span>{{ better.betAmount }}</span>
        </div>
      </div>
      <div class="poll-actions">
        <NumberInput v-model="pollMoneyInput" class="w-full" />
        <BaseButton @click="() => handleBetting(poll)" class="w-full">{{ t('bet') }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ApiPollJson } from '@/shared/interfaces/api/apiPoll';
import { useTranslations } from '@/shared/composables/useTranslations';
import BaseButton from '@/shared/components/buttons/BaseButton.vue';
import NumberInput from '@/shared/components/inputs/NumberInput.vue';
import { usePolls } from '@/shared/composables/usePolls';
import { useCurrentUser } from '@/shared/composables/useCurrentUser';
import { useMoney } from '@/shared/composables/useMoney';

export default defineComponent({
  name: 'PollGallery',
  components: { NumberInput, BaseButton },
  props: {
    polls: {
      type: Array as PropType<ApiPollJson[]>,
      required: true,
    },
  },
  setup(props) {
    const { t } = useTranslations();
    const { isAdmin, user } = useCurrentUser();
    const { changeUserMoney } = useMoney();
    const { removePoll, betOnPoll } = usePolls();
    const pollMoneyInput = ref('');
    const optionChoice = ref('');

    const handleDelete = (id: number) => {
      removePoll(id);
    };
    const handleBetting = (targetPoll: ApiPollJson) => {
      const betMoney = parseInt(pollMoneyInput.value, 10) || 0;
      if (user.value && user.value?.score >= betMoney && betMoney > 0) {
        changeUserMoney(user.value, -betMoney);
        console.log('going to bet: ', betMoney);
        betOnPoll(targetPoll, user.value, betMoney);
      }
    };
    return { t, pollMoneyInput, handleBetting, isAdmin, handleDelete };
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
