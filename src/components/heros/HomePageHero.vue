<script lang="ts" setup>
import AppHero from '@/components/heros/AppHero.vue';
</script>

<template>
  <AppHero class="h-44">
    <h1 class="headline" v-text="$t('NFTS on Layer2')" />
    <p class="mt-2 text-xl text-white" v-text="$t('Built on NFTEarth')" />
  </AppHero>
</template>

<style>
.headline {
  @apply text-white text-center text-4xl md:text-5xl pb-2 font-display font-normal;
}
</style>
