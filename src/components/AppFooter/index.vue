<script setup>
  import { appVersion } from '@/store/constants.js';
</script>

<template>
  <div class="footer row mt-5 py-2">
    <div class="col-12 text-center">
      Proudly brought to you by <a href="https://ivan-lim.com" target="_blank" class="mr-2">Ivan Lim</a>
      <small class="mx-2">© {{ new Date().getFullYear() }}</small>
      <small class="mx-2">🔖 {{ appVersion }}</small>
    </div>
  </div>
</template>

<style scoped>
  .footer {
    background-color: black;
  }

  small {
    font-size: 0.6rem;
  }
</style>
