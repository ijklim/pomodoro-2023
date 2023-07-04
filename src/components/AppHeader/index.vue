<script setup>
  import ControlPanel from '@/components/ControlPanel.vue'
  import { name, version } from '@/store/constants.js';
</script>

<template>
  <header class='row'>
    <h1 class='col-8 pt-2'>
      {{ name }}
      <small>v.{{ version }}</small>
    </h1>

    <!-- Note: flex-grow-1 will allow column to take up remaining space -->
    <ControlPanel class='align-self-center text-right pr-0 flex-grow-1' />
  </header>
</template>

<style scoped>
  h1 {
    /* Dynamically adjust font based on screen width */
    font-size: clamp(1.5rem, 3cqi, 3rem);
  }

  small {
    /* Font size base on parent's font size */
    font-size: 30%;
    font-style: italic;
  }
</style>