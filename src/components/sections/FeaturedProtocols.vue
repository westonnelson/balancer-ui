<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { EXTERNAL_LINKS } from '@/constants/links';

const { t } = useI18n();

const featuredProtocols = [
  {
    title: 'AAYC',
    description: t('featuredProtocols.Xave.description'),
    linkText: t('featuredProtocols.Xave.linkText'),
    imgSrc: '/images/banners/xave.jpg',
    link: EXTERNAL_LINKS.Xave.Home,
  },
  {
    title: 'Google Cloud Platform',
    description: t('featuredProtocols.Gcp.description'),
    linkText: t('featuredProtocols.Gcp.linkText'),
    imgSrc: '/images/banners/gcp.png',
    link: EXTERNAL_LINKS.Copper.Home,
  },
  {
    title: 'WHITE HAT DAO',
    description: t('featuredProtocols.Gyroscope.description'),
    linkText: t('featuredProtocols.Gyroscope.linkText'),
    imgSrc: '/images/banners/gyroscope.jpg',
    link: EXTERNAL_LINKS.Gyroscope.Home,
  },

  {
    title: 'LAYER2DAO',
    description: t('featuredProtocols.L2DAO.description'),
    linkText: t('featuredProtocols.L2DAO.linkText'),
    imgSrc: '/images/banners/L2DAO.jpg',
    link: EXTERNAL_LINKS.Beets.Home,
  },
];
</script>

<template>
  <div v-once class="featured-protocols">
    <h3 class="mb-4">
      {{ $t('featuredProtocols.title') }}
    </h3>
    <div class="grid grid-cols-12 gap-4">
      <div
        v-for="{
          title,
          imgSrc,
          description,
          linkText,
          link,
        } in featuredProtocols"
        :key="title"
        class="col-span-12 xs:col-span-6 lg:col-span-3"
      >
        <BalCard
          :title="title"
          :imgSrc="imgSrc"
          class="hover:shadow-xl transition-shadow"
          hFull
          growContent
        >
          <p class="text-sm leading-5">
            {{ description }}
          </p>
          <template #footer>
            <BalLink :href="link" external>
              <span class="text-sm font-medium">{{ linkText }}</span>
              <BalIcon
                name="arrow-up-right"
                size="sm"
                class="relative top-0.5 ml-0.5"
              />
            </BalLink>
          </template>
        </BalCard>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.card-container) {
  justify-content: space-between;
  height: 100%;
}

.featured-protocols :deep(.feature) {
  height: 8rem;
}

.featured-protocols :deep(.content) {
  @apply pt-1;
}
</style>
