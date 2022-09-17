<template>
  <div id="header">
    <div>
      <span v-if="!currentUser">{{ t('not_logged_in_notice') }}</span>
      <span v-else>{{ currentUser.name }}</span>
    </div>
    <div v-if="currentUser">
      {{ currentUser.score }}
    </div>
    <div>
      <router-link v-if="!currentUser" :to="routes.login.path">
        <div>{{ t('login_button') }}</div>
      </router-link>
      <button v-else @click.prevent="onLogout">{{ t('logout_button') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { routes } from '@/shared/constants/routes';
import { useCurrentUser } from '@/shared/composables/useCurrentUser';
import { useTranslations } from '@/shared/composables/useTranslations';

export default defineComponent({
  name: 'MainHeader',
  setup() {
    const { push } = useRouter();
    const { user, clearUser } = useCurrentUser();
    const { t } = useTranslations();

    const onLogout = () => {
      clearUser();
      push(routes.login);
    };
    return { routes, onLogout, t, currentUser: user };
  },
});
</script>

<style scoped>
#header {
  @apply bg-shark p-6 text-peach-50 font-medium text-20 flex justify-between;
}
</style>
