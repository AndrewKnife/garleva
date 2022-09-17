<template>
  <div id="page-wrapper">
    <div class="fixed inset-0 bg-shark-100 -z-20"></div>
    <div class="absolute top-0 right-0 left-0 bg-shark-500 h-[5.3rem]"></div>
    <div id="page">
      <MainHeader :user="user" />
      <div class="bg-shark-100">
        <div class="flex-grow mx-6 pb-6">
          <slot></slot>
        </div>
      </div>
      <MainFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePeople } from '@/shared/composables/usePeople';
import MainHeader from '@/shared/components/MainHeader.vue';
import MainFooter from '@/shared/components/MainFooter.vue';
import { useCurrentUser } from '@/shared/composables/useCurrentUser';

export default defineComponent({
  name: 'PageWrapper',
  components: { MainFooter, MainHeader },
  setup() {
    const { users, fetchUsers } = usePeople();
    const { user, getSavedUser } = useCurrentUser();
    getSavedUser();
    fetchUsers();

    return { users, user };
  },
});
</script>

<style scoped>
#page-wrapper {
  @apply h-full bg-shark-100;
}

#page {
  @apply max-w-[108rem] flex flex-col h-full bg-shark-100 m-auto relative;
}
</style>
