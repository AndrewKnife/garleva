<template>
  <div class="poll-form">
    <InputGroup :label="t('poll_name_label')">
      <BaseInput class="w-full" v-model="pollForm.name" :placeholder="t('poll_name_placeholder')" />
    </InputGroup>
    <FieldController class="my-6" v-model="pollForm.options" :label="t('poll_options_label')" />
    <InputGroup :label="t('poll_score_label')">
      <NumberInput
        class="w-full"
        v-model="pollForm.poll"
        :placeholder="t('poll_score_placeholder')"
      />
    </InputGroup>
    <BaseButton class="w-full my-2 mt-8" @click.prevent="handlePollSubmit">
      {{ t('poll_submit_button') }}
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputGroup from '@/shared/components/inputs/InputGroup.vue';
import BaseInput from '@/shared/components/inputs/BaseInput.vue';
import { useTranslations } from '@/shared/composables/useTranslations';
import BaseButton from '@/shared/components/buttons/BaseButton.vue';
import { usePolls } from '@/shared/composables/usePolls';
import NumberInput from '@/shared/components/inputs/NumberInput.vue';
import FieldController from '@/shared/components/inputs/FieldController.vue';

export default defineComponent({
  name: 'PollForm',
  components: { FieldController, NumberInput, BaseButton, BaseInput, InputGroup },
  emits: ['finished'],
  setup(props, { emit }) {
    const { t } = useTranslations();
    const pollForm = ref({
      name: '',
      poll: '',
      options: [],
    });
    const handlePollSubmit = () => {
      const { createPoll } = usePolls();
      createPoll({
        name: pollForm.value.name,
        poll: parseInt(pollForm.value.poll, 10) || 0,
        betters: '[]',
        options: JSON.stringify(pollForm.value.options),
        finished: false,
        allowBetting: true,
      });
      emit('finished');
    };
    return { t, handlePollSubmit, pollForm };
  },
});
</script>

<style scoped>
.poll-form {
  @apply w-full;
}
</style>
