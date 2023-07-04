<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AppHeader from '@/components/AppHeader/index.vue';
import ToggleAlert from '@/components/ToggleAlert.vue'
// import DebugWindow from '@/components/DebugWindow.vue'

import { name, version } from '@/store/constants.js';
import { useControlPanel } from '@/store/useControlPanel.js'
import { useTimer } from '@/store/useTimer.js'

const controlPanel = useControlPanel()
const route = useRoute()
const router = useRouter()
const timer = useTimer()

let intervalName = ref('')

// Vue Lifecycles: https://vuejs.org/api/composition-api-lifecycle.html
onMounted(async () => {
  // Update page title
  document.title = `${name} v.${version}`

  // Note: Must wait till router is ready to retrieve query info
  await router.isReady()
  // console.log('[App.vue::onMounted()] route', route)
  // console.log('[App.vue::onMounted()] route.query', route.query)

  // Set default values based on query string
  if (route.query.sound === 'off') {
    controlPanel.state.isSoundOn = false
  }
  if (route.query.autonext === 'on') {
    controlPanel.state.shouldAutostartNextInterval = true
  }
  if (route.query.autostart === 'on') {
    timer.state.isTimerOn = true
  }

  // Start interval that count down timer
  intervalName.value = setInterval(() => {
    if (timer.state.isTimerOn) {
      timer.updateTimer()
    }

    if (timer.state.isTimerOn && timer.isIntervalCompleted.value) {
      timer.initiateNextInterval()
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalName.value)
})
</script>

<template>
  <div id='app' class='container-fluid'>
    <AppHeader />

    <ToggleAlert />

    <RouterView />

    <!-- <DebugWindow /> -->

    <footer>
      Proudly brought to you by <a href="https://ivan-lim.com" target="_blank">Ivan Lim</a>
    </footer>
  </div>
</template>

<style>
:root {
  --color-background: #111;
  --color-background-light: #222;
  --color-background-lightest: #282828;
}

html {
  height: 100%;
}

body {
  background-repeat: repeat;
  color: white;
  background-color: var(--color-background);
  background: linear-gradient(
    to bottom,
    var(--color-background) 0%,
    var(--color-background-lightest) 18%,
    var(--color-background-lightest) 50%,
    var(--color-background-light) 78%,
    var(--color-background) 100%
  );
  font-family: 'Contrail One';
  text-rendering: optimizeLegibility;
}

button:hover {
  cursor: pointer;
}

header {
  background-color: black;
}

footer {
  position: fixed;
  width: 100%;
  text-align: center;
  bottom: 3px;
}

a:hover {
  text-decoration: none;
}

h1 {
  /* Dynamically adjust font based on screen width */
  font-size: clamp(2.0rem, 4cqi, 2.5rem);
}

small {
  /* Font size base on parent's font size */
  font-size: 50%;
  font-style: italic;
}
</style>