<template>
  <div v-bind="$attrs" class="ranking-table">
    <div
      v-for="(user, index) in users"
      :key="user.id"
      class="ranking-card"
      @click="() => onRowClick(user)"
    >
      <span>{{ index + 1 }}</span>
      <span>{{ user.name }}</span>
      <span>{{ user.score }}</span>
    </div>
  </div>
  <SendMoneyModal
    v-if="moneyModal.isOpen.value && tradeUser"
    @close="handleModalClose"
    @finished="handleModalClose"
    :user="tradeUser"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ApiUser } from '@/shared/interfaces/api/apiUser';
import SendMoneyModal from '@/shared/components/ranking/SendMoneyModal.vue';
import { useOpenable } from '@/shared/composables/useOpenable';
import { useCurrentUser } from '@/shared/composables/useCurrentUser';

export default defineComponent({
  name: 'RankingCards',
  components: { SendMoneyModal },
  props: {
    users: Array as PropType<ApiUser[]>,
  },
  setup() {
    const { user } = useCurrentUser();
    const moneyModal = useOpenable(false);
    const tradeUser = ref<ApiUser>();

    const handleModalClose = () => {
      moneyModal.close();
      tradeUser.value = undefined;
    };

    const onRowClick = (clickedUser: ApiUser) => {
      if (user.value && user.value?.id !== clickedUser.id) {
        tradeUser.value = clickedUser;
        moneyModal.open();
      }
    };
    return { onRowClick, moneyModal, tradeUser, handleModalClose };
  },
});
</script>

<style scoped>
.ranking-card {
  box-shadow: -0.4rem 0.4rem rgb(130, 130, 158);
  @apply text-18 text-peach-50 rounded-2 bg-shark-200 flex justify-between p-5 font-medium;
  @apply hover:opacity-80 cursor-pointer select-none mb-3;
}

.ranking-card:nth-child(even) {
  box-shadow: -0.4rem 0.4rem rgb(86, 86, 103);
  @apply bg-shark-300;
}

.ranking-card:nth-child(1) {
  @apply text-shark-600;
  box-shadow: -0.4rem 0.4rem #fedb37;
  background: radial-gradient(
    ellipse farthest-corner at right bottom,
    #fdb931 30%,
    #fedb37 50%,
    #fdb931 70%
  );
}

.ranking-card:nth-child(2) {
  @apply bg-gray-300 text-shark-600;
  box-shadow: -0.4rem 0.4rem rgb(200, 204, 210);
  background: radial-gradient(
    ellipse farthest-corner at right bottom,
    rgb(180, 184, 190) 30%,
    rgb(200, 204, 210) 50%,
    rgb(180, 184, 190) 70%
  );
}

.ranking-card:nth-child(3) {
  @apply text-shark-600;
  box-shadow: -0.4rem 0.4rem #dc8e41;
  background: radial-gradient(
    ellipse farthest-corner at right bottom,
    #af6114 30%,
    #dc8e41 50%,
    #af6114 70%
  );
}
</style>
