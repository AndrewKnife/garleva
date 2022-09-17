<template>
  <BaseModal
    v-if="moneyModal.isOpen.value"
    :label="t('poll_modal_heading')"
    @close="moneyModal.close"
  >

  </BaseModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useTranslations} from "@/shared/composables/useTranslations";
import {useOpenable} from "@/shared/composables/useOpenable";
import BaseModal from "@/shared/components/BaseModal.vue";

export default defineComponent({
  name: 'SendMoneyModal',
  components: {BaseModal},
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup(){
    const { t } = useTranslations();
    const moneyModal = useOpenable(false);
    return { t, moneyModal };
  }
});
</script>

<style scoped>
.modal-wrapper {
  @apply fixed inset-0 flex items-center justify-center;
}
</style>
