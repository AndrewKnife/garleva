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
  @apply text-18 rounded-2 bg-shark-200 flex justify-between p-5 font-medium text-peach-50;
  @apply hover:opacity-80 cursor-pointer select-none;
}

.ranking-card:nth-child(even) {
  @apply bg-shark-100;
}

.ranking-card:nth-child(1) {
  background: radial-gradient(
    ellipse farthest-corner at right bottom,
    #8a6e2f 0%,
    #9f7928 8%,
    #fdb931 30%,
    #fedb37 50%,
    #fdb931 70%,
    #9f7928 92%,
    #8a6e2f 100%
  );
}

.ranking-card:nth-child(2) {
  background: radial-gradient(
    ellipse farthest-corner at right bottom,
    #cd7f32 0%,
    #be7023 8%,
    #af6114 30%,
    #dc8e41 50%,
    #af6114 70%,
    #be7023 92%,
    #cd7f32 100%
  );
}

.ranking-card:nth-child(3) {
  @apply text-shark-600;
  background: radial-gradient(
    ellipse farthest-corner at right bottom,
    #ffffff 16%,
    #dedede 21%,
    #ffffff 24%,
    #454545 27%,
    #dedede 36%,
    #ffffff 45%,
    #ffffff 60%,
    #dedede 72%,
    #ffffff 80%,
    #dedede 84%
  );
}
</style>
