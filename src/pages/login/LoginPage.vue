<template>
  <EmptyPageWrapper class="items-center justify-center py-8">
    <form class="w-full max-w-[40rem] px-4" @submit.prevent="handleLogin">
      <div class="text-white font-medium mb-8">
        <BaseCheckbox class="my-6" v-model="drink">
          Sutinku, kad prisigersiu ir apsivemsiu
        </BaseCheckbox>
        <BaseCheckbox class="my-6" v-model="beat">
          Sutinku, būti baudžiamas Vyr. teisėjo, jeigu prisidirbsiu
        </BaseCheckbox>
        <BaseCheckbox class="my-6" v-model="party">
          Sutinku, kad smarkiai atšvęsiu Andriaus gimtadienį
        </BaseCheckbox>
      </div>
      <BaseInput
        v-model="codeInput"
        type="text"
        class="w-full"
        :placeholder="t('login_code_placeholder')"
      />
      <BaseButton type="submit" class="my-2 w-full">{{ t('login_submit_button') }}</BaseButton>
    </form>
  </EmptyPageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import EmptyPageWrapper from '@/shared/components/EmptyPageWrapper.vue';
import { usePeople } from '@/shared/composables/usePeople';
import BaseButton from '@/shared/components/buttons/BaseButton.vue';
import BaseInput from '@/shared/components/inputs/BaseInput.vue';
import { useTranslations } from '@/shared/composables/useTranslations';
import { routes } from '@/shared/constants/routes';
import { useCurrentUser } from '@/shared/composables/useCurrentUser';
import BaseCheckbox from '@/shared/components/inputs/BaseCheckbox.vue';

export default defineComponent({
  name: 'LoginPage',
  components: { BaseCheckbox, BaseInput, BaseButton, EmptyPageWrapper },
  setup() {
    const { users, admin, fetchUsers } = usePeople();
    const { push } = useRouter();
    const { t } = useTranslations();
    const { saveUser } = useCurrentUser();
    const codeInput = ref('');
    const drink = ref(true);
    const beat = ref(true);
    const party = ref(true);

    watch([drink, beat, party], () => {
      setTimeout(() => {
        drink.value = true;
        beat.value = true;
        party.value = true;
      }, 300);
    });

    const handleLogin = () => {
      const foundUser =
        admin.value?.secret.toLowerCase() === codeInput.value.toLowerCase()
          ? admin.value
          : users.value?.find(
              (user) => user.secret.toLowerCase() === codeInput.value.toLowerCase()
            );
      if (foundUser) {
        saveUser(foundUser);
        fetchUsers();
      }
      push(routes.main.path);
    };
    return { users, handleLogin, t, codeInput, drink, beat, party };
  },
});
</script>
