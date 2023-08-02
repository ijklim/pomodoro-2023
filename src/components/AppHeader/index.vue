<script setup>
  import ControlPanel from '@/components/ControlPanel.vue'
  import { appName } from '@/store/constants.js';
</script>

<template>
  <header class='row'>
    <h1 class='col-8 pt-2 d-flex align-items-baseline'>
      <img src="/favicon.png" />

      <span>{{ appName }}</span>
    </h1>

    <!-- Note: flex-grow-1 will allow column to take up remaining space -->
    <ControlPanel class='align-self-center text-right pr-0 flex-grow-1' />
  </header>
</template>

<style scoped>
  h1 {
    /* Dynamically adjust font based on screen width */
    font-size: clamp(1.5rem, 3cqi, 3rem);
    gap: clamp(0.5rem, 1cqi, 1rem);
  }

  h1 > img {
    height: clamp(1.3rem, 2.5cqi, 2.5rem);
  }
</style>