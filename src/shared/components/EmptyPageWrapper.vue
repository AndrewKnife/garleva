<template>
  <div id="page">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePeople } from '@/shared/composables/usePeople';

export default defineComponent({
  name: 'EmptyPageWrapper',
  setup() {
    const { users, fetchUsers } = usePeople();
    fetchUsers();
    return { users };
  },
});
</script>

<style scoped>
#page {
  @apply flex flex-col h-full bg-shark-500 m-auto;
}
</style>
