<template>
  <div
    v-if="initializedOptimizely"
    class="flex flex-col h-full"
    :class="{ missingFeature: features.hideMissingFeatures }"
  >
    <router-view />
  </div>
  <BaseSpinner v-else />
  <NotificationsWrapper />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useFeatures } from '@/shared/composables/useFeatures';
import NotificationsWrapper from '@/shared/components/molecules/NotificationCard/NotificationsWrapper.vue';
import BaseSpinner from '@/shared/components/atoms/visual/BaseSpinner/BaseSpinner.vue';

export default defineComponent({
  components: { NotificationsWrapper, BaseSpinner },
  setup() {
    const { initializedOptimizely, features } = useFeatures();

    return { initializedOptimizely, features };
  },
});
</script>
<style>
.missingFeature .missing-feature {
  @apply opacity-40 pointer-events-none;
}
</style>
