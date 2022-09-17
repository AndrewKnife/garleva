<template>
  <BaseModal :label="t('money_modal_heading')" @close="$emit('close')">
    <SendMoneyForm :user="user" @finished="$emit('finished')" />
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useTranslations } from '@/shared/composables/useTranslations';
import BaseModal from '@/shared/components/BaseModal.vue';
import SendMoneyForm from '@/shared/components/ranking/SendMoneyForm.vue';
import { ApiUser } from '@/shared/interfaces/api/apiUser';

export default defineComponent({
  name: 'SendMoneyModal',
  components: { SendMoneyForm, BaseModal },
  props: {
    user: {
      type: Object as PropType<ApiUser>,
      required: true,
    },
  },
  emits: ['close', 'finished'],
  setup() {
    const { t } = useTranslations();

    return { t };
  },
});
</script>

<style scoped>
.modal-wrapper {
  @apply fixed inset-0 flex items-center justify-center;
}
</style>
