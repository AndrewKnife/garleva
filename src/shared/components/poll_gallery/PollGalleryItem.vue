<template>
  <div class="poll-item">
    <div class="flex justify-between mb-4">
      <span class="font-medium">{{ poll.name }}</span>
      <div v-if="isAdmin()">
        <button @click.prevent="$emit('selectPoll')">
          <SettingsIcon class="text-peach w-11 h-11 hover:opacity-50" />
        </button>
      </div>
    </div>
    <div class="mb-4 border-b-2 pb-1 border-shark-500">
      <span>{{ t('poll_total_pot') }}</span>
      <span>{{ poll.poll }}</span>
    </div>
    <PollGalleryBettersList :poll="poll" />
    <div v-if="isAdmin()" class="my-8">
      Ar galima statyti?:
      <span class="uppercase font-bold text-20">{{ poll.allowBetting ? 'Taip' : 'Ne' }}</span>
    </div>
    <div class="poll-actions" v-if="user && !isAdmin() && poll.allowBetting">
      <RadioInputs v-if="!currentUserBet" :options="poll.options" v-model="optionChoice" />
      <div class="flex">
        <NumberInput v-model="pollMoneyInput" class="w-full" />
        <BaseButton @click="() => handleBetting(poll)" class="w-full">{{ t('bet') }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, ref } from 'vue';
import { ApiPollJson, Better } from '@/shared/interfaces/api/apiPoll';
import { useTranslations } from '@/shared/composables/useTranslations';
import BaseButton from '@/shared/components/buttons/BaseButton.vue';
import NumberInput from '@/shared/components/inputs/NumberInput.vue';
import { usePolls } from '@/shared/composables/usePolls';
import { useCurrentUser } from '@/shared/composables/useCurrentUser';
import { useMoney } from '@/shared/composables/useMoney';
import RadioInputs from '@/shared/components/inputs/RadioInputs.vue';
import PollGalleryBettersList from '@/shared/components/poll_gallery/PollGalleryBettersList.vue';
import SettingsIcon from '@/shared/assets/icons/settings.svg?inline';

export default defineComponent({
  name: 'PollGalleryItem',
  components: { PollGalleryBettersList, RadioInputs, NumberInput, BaseButton, SettingsIcon },
  props: {
    poll: {
      type: Object as PropType<ApiPollJson>,
      required: true,
    },
  },
  emits: ['selectPoll'],
  setup(props) {
    const { t } = useTranslations();
    const { isAdmin, user } = useCurrentUser();
    const { changeUserMoney } = useMoney();
    const { betOnPoll } = usePolls();
    const pollMoneyInput = ref('');
    const optionChoice = ref(props.poll.id);
    const currentUserBet: ComputedRef<Better | undefined> = computed(() => {
      return props.poll.betters.find((better) => better.id === user.value?.id);
    });

    const handleBetting = (targetPoll: ApiPollJson) => {
      const betMoney = parseInt(pollMoneyInput.value, 10) || 0;
      if (user.value && user.value?.score >= betMoney && betMoney > 0) {
        changeUserMoney(user.value, -betMoney);
        betOnPoll(
          targetPoll,
          user.value,
          betMoney,
          currentUserBet?.value?.betOption || optionChoice.value
        );
      }
    };
    return {
      t,
      pollMoneyInput,
      handleBetting,
      isAdmin,
      optionChoice,
      currentUserBet,
      user,
    };
  },
});
</script>

<style scoped>
.poll-item {
  @apply bg-shark-400 rounded-2xl p-4;
}

.poll-actions {
  @apply mb-1 mt-6;
}
</style>
