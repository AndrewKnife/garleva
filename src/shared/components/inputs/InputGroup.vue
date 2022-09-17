<template>
  <div @submit.prevent="handlePollSubmit">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PollForm',
  setup() {
    const handlePollSubmit = () => {
      console.log('submittinPoll')
    };
    return { handlePollSubmit };
  },
});
</script>

<style scoped></style>
