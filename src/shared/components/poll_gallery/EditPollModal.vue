<template>
  <div class="text-shark-600">
    <BaseModal :label="t('poll_edit_modal_heading')" @close="$emit('close')">
      <div>
        <div class="flex items-center my-8">
          <span class="font-medium w-8/12"> Danger -></span>
          <BaseButton variant="red" @click="() => handleDelete(poll.id)" class="w-4/12 !p-1">
            {{ t('delete') }}
          </BaseButton>
        </div>
        <div class="my-8 flex flex-col">
          <span class="text-16 lg:text-18 font-medium mb-6">
            {{ t('poll_edit_modal_winners') }}
            <p>{{ poll.name }}</p>
          </span>
          <BaseCheckbox v-for="option in winningOptions" v-model="option.value" :key="option.id">
            {{ option.name }}
          </BaseCheckbox>
        </div>
        <BaseButton @click="stopUserBets" class="w-full my-4">
          {{ t('poll_edit_modal_stop') }}
        </BaseButton>
        <BaseButton @click="submitPoll" class="w-full">
          {{ t('poll_edit_modal_finish') }}
        </BaseButton>
      </div>
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ApiPollJson } from '@/shared/interfaces/api/apiPoll';
import { useTranslations } from '@/shared/composables/useTranslations';
import BaseModal from '@/shared/components/BaseModal.vue';
import { usePolls } from '@/shared/composables/usePolls';
import BaseButton from '@/shared/components/buttons/BaseButton.vue';
import BaseCheckbox from '@/shared/components/inputs/BaseCheckbox.vue';
import { CheckBoxOption } from '@/shared/interfaces/checkBoxOption';

export default defineComponent({
  name: 'EditPollModal',
  components: { BaseCheckbox, BaseButton, BaseModal },
  props: {
    poll: {
      type: Object as PropType<ApiPollJson>,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const { t } = useTranslations();
    const { removePoll, finishPoll, stopBettingOnPoll } = usePolls();
    const winningOptions = ref<CheckBoxOption[]>(
      props.poll.options.map((option) => {
        const winningOption: CheckBoxOption = {
          value: false,
          name: option.name,
          id: option.id,
        };
        return winningOption;
      })
    );

    const handleDelete = (id: number) => {
      removePoll(id);
      emit('close');
    };

    const stopUserBets = () => {
      stopBettingOnPoll(props.poll);
      emit('close');
    };

    const submitPoll = () => {
      const winOptions = winningOptions.value.filter((opt) => !!opt.value).map((opt) => opt.id);
      const pollData: ApiPollJson = {
        ...props.poll,
        winningOptions: winOptions,
      };
      finishPoll(pollData);
      emit('close');
    };

    return { t, handleDelete, winningOptions, submitPoll, stopUserBets };
  },
});
</script>

<style scoped></style>
