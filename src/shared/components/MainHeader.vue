<template>
  <div class="page">
    <MainHeader />
    <slot></slot>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageWrapper',
});
</script>

<style scoped></style>
