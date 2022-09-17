<template>
  <div class="admin-controls">
    <BaseButton @click="pollModal.open">{{ t('create_poll_button') }}</BaseButton>
    <BaseModal
      v-if="pollModal.isOpen.value"
      :label="t('poll_modal_heading')"
      @close="pollModal.close"
    >
      <PollForm @finished="pollModal.close" />
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseModal from '@/shared/components/BaseModal.vue';
import PollForm from '@/shared/components/admin/PollForm.vue';
import { useTranslations } from '@/shared/composables/useTranslations';
import { useOpenable } from '@/shared/composables/useOpenable';
import BaseButton from '@/shared/components/buttons/BaseButton.vue';

export default defineComponent({
  name: 'AdminController',
  components: { BaseButton, PollForm, BaseModal },
  setup() {
    const { t } = useTranslations();
    const pollModal = useOpenable(false);
    return { t, pollModal };
  },
});
</script>

<style scoped>
.admin-controls {
  @apply my-4;
}
</style>
