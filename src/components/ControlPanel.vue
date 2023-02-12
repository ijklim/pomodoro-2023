<script setup>
// script setup: https://vuejs.org/api/sfc-script-setup.html
import { useControlPanel } from '@/store/useControlPanel.js'

const controlPanel = useControlPanel()

// Note: Functions must be destructured
const {
  toggleAutostartNextInterval,
  toggleLogOpen,
  toggleSound,
} = controlPanel
</script>

<template>
  <div class='col-6 align-self-center text-right pr-0'>
    <!-- Button: Show Log -->
    <button class='btn btn-link' @click='toggleLogOpen' title='Show Log'>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3" y2="6"></line>
        <line x1="3" y1="12" x2="3" y2="12"></line>
        <line x1="3" y1="18" x2="3" y2="18"></line>
      </svg>
    </button>

    <!-- Button: Autostart -->
    <button
      class='btn btn-link'
      v-html='controlPanel.iconButtonAutostart.value'
      :title='controlPanel.titleButtonAutostart.value'
      @click='toggleAutostartNextInterval'
    ></button>

    <!-- Button: Sound -->
    <button
      class='btn btn-link'
      v-html='controlPanel.iconButtonSound.value'
      :title='controlPanel.titleButtonSound.value'
      @click='toggleSound'
    ></button>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  color: orange;
  padding-left: 0px;  /* Too much spacing between buttons */
}

.btn:hover {
  color: #FED8B1;
}
</style>