<template>
  <div id="page">
    <MainHeader />
    <div class="flex-grow">
      <slot></slot>
    </div>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePeople } from '@/shared/composables/usePeople';
import MainHeader from '@/shared/components/MainHeader.vue';
import MainFooter from '@/shared/components/MainFooter.vue';

export default defineComponent({
  name: 'PageWrapper',
  components: { MainFooter, MainHeader },
  setup() {
    const { users, fetchUsers } = usePeople();
    fetchUsers();
    return { users };
  },
});
</script>

<style scoped>
#page {
  @apply flex flex-col h-full;
}
</style>
