<template>
  <form class="money-form">
    <div class="text-16 lg:text-18">
      <p>
        Daryti reikaliukus su: <span class="font-bold">{{ user.name }}</span>
      </p>
      <p>
        Šio žmogėno piniginė: <span class="font-bold">{{ user.score }}</span>
      </p>
    </div>
    <div class="grid gap-3 my-8" :class="{ 'grid-cols-2': isAdmin() }">
      <BaseButton
        v-for="change in moneyChanges"
        class="w-full"
        :key="change"
        :variant="change >= 0 ? 'green' : 'red'"
        @click.prevent="() => setMoneyValue(`${change}`)"
      >
        {{ change }}
      </BaseButton>
    </div>
    <InputGroup :label="t('money_name_label')">
      <NumberInput
        class="w-full"
        v-model="moneyForm.count"
        :placeholder="t('money_name_placeholder')"
      />
    </InputGroup>
    <BaseButton class="w-full my-2 mt-8" @click.prevent="() => handleFormSubmit()">
      {{ t('money_submit_button') }}
    </BaseButton>
    <BaseModal v-if="isOpen" label="Error" @close="close">
      <span>Kažkas negerai su tavo pinigais! (eng. Something is wrong with your money)</span>
    </BaseModal>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import InputGroup from '@/shared/components/inputs/InputGroup.vue';
import { useTranslations } from '@/shared/composables/useTranslations';
import BaseButton from '@/shared/components/buttons/BaseButton.vue';
import { useMoney } from '@/shared/composables/useMoney';
import { ApiUser } from '@/shared/interfaces/api/apiUser';
import { useCurrentUser } from '@/shared/composables/useCurrentUser';
import { useOpenable } from '@/shared/composables/useOpenable';
import BaseModal from '@/shared/components/BaseModal.vue';
import NumberInput from '@/shared/components/inputs/NumberInput.vue';

export default defineComponent({
  name: 'SendMoneyForm',
  components: { NumberInput, BaseModal, BaseButton, InputGroup },
  props: {
    user: {
      type: Object as PropType<ApiUser>,
      required: true,
    },
  },
  emits: ['finished'],
  setup(props, { emit }) {
    const { t } = useTranslations();
    const { user, isAdmin } = useCurrentUser();
    const { isOpen, close, open } = useOpenable(false);
    const moneyForm = ref({
      count: '0',
    });

    const moneyChanges = isAdmin() ? [-10, 10, -20, 20, -50, 50, -100, 100] : [10, 20, 50, 100];

    const setMoneyValue = (moneyChange: string) => {
      console.log('setMoneyValue');
      moneyForm.value.count = moneyChange;
    };

    const handleFormSubmit = () => {
      if (user.value) {
        const { changeUserMoney } = useMoney();
        const moneyChangeValue = parseInt(moneyForm.value.count, 10) || 0;
        // const targetUserMoney = parseInt(props.user.score.toString(), 10);
        let currentUserMoneyChange = user.value?.score;
        if (moneyChangeValue >= 0) {
          if (user.value?.score - moneyChangeValue >= 0) {
            currentUserMoneyChange = -moneyChangeValue;
            changeUserMoney(user.value, currentUserMoneyChange);
            changeUserMoney(props.user, moneyChangeValue);
            emit('finished');
          } else {
            open();
          }
        } else if (moneyChangeValue < 0 && isAdmin()) {
          currentUserMoneyChange = -moneyChangeValue;
          changeUserMoney(user.value, currentUserMoneyChange);
          changeUserMoney(props.user, moneyChangeValue);
          emit('finished');
        } else {
          open();
        }
      }
    };
    return { t, handleFormSubmit, moneyForm, moneyChanges, isAdmin, isOpen, close, setMoneyValue };
  },
});
</script>

<style scoped>
.money-form {
  @apply w-full;
}
</style>
