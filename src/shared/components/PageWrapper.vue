<template>
  <div class="ranking-table">
    <div class="ranking-card" v-for="(user, index) in users" :key="user.id">
      <span>{{ index + 1 }}</span>
      <span>{{ user.name }}</span>
      <span>{{ user.score }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ApiUser } from '@/shared/interfaces/api/apiUser';

export default defineComponent({
  name: 'RankingCards',
  props: {
    users: Array as PropType<ApiUser[]>,
  },
});
</script>

<style scoped>
.ranking-table {
  @apply bg-white;
}

.ranking-card {
  @apply text-18 rounded-2 bg-shark-200 flex justify-between px-5 py-4;
}

.ranking-card:nth-child(even) {
  @apply bg-shark-100;
}
</style>
