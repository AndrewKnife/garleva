<template>
  <div class="bg-bridal h-full w-full">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePeople } from '@/shared/composables/usePeople';
import { usePolls } from '@/shared/composables/usePolls';

const UPDATE_DATA_EVERY = 10000;

export default defineComponent({
  setup() {
    const { fetchUsers } = usePeople();
    const { fetchPolls } = usePolls();
    setInterval(() => {
      fetchUsers();
      fetchPolls();
    }, UPDATE_DATA_EVERY);
  },
});
</script>
