<script setup>
  import { appVersion } from '@/store/constants.js';
</script>

<template>
  <footer>
    Proudly brought to you by <a href="https://ivan-lim.com" target="_blank" class="mr-2">Ivan Lim</a>
    <small class="mx-2">© {{ new Date().getFullYear() }}</small>
    <small class="mx-2">🔖 {{ appVersion }}</small>
  </footer>
</template>

<style scoped>
  small {
    font-size: 0.6rem;
  }
</style>
