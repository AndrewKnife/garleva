<template>
  <PageWrapper>
    <DimensionalText :label="t('main_highscore_heading')" />
    <RankingCards v-if="users" :users="users" />
    <AdminController v-if="isAdmin()" />
    <PollGallery :polls="polls" class="mt-10" />
    <PrevPollGallery v-if="pastPolls && pastPolls.length" :polls="pastPolls" class="mt-10" />
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePeople } from '@/shared/composables/usePeople';
import RankingCards from '@/shared/components/ranking/RankingCards.vue';
import PageWrapper from '@/shared/components/PageWrapper.vue';
import { useTranslations } from '@/shared/composables/useTranslations';
import { useCurrentUser } from '@/shared/composables/useCurrentUser';
import AdminController from '@/shared/components/AdminController.vue';
import { usePolls } from '@/shared/composables/usePolls';
import PollGallery from '@/shared/components/poll_gallery/PollGallery.vue';
import PrevPollGallery from '@/shared/components/poll_gallery/PrevPollGallery.vue';
import DimensionalText from '@/shared/components/DimensionalText.vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    DimensionalText,
    PrevPollGallery,
    PollGallery,
    AdminController,
    PageWrapper,
    RankingCards,
  },
  setup() {
    const { users } = usePeople();
    const { polls, pastPolls, fetchPolls } = usePolls();
    const { isAdmin } = useCurrentUser();
    fetchPolls();
    const { t } = useTranslations();

    return { users, polls, pastPolls, t, isAdmin };
  },
});
</script>
