<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ControlPanel from '@/components/ControlPanel.vue'
import ToggleAlert from '@/components/ToggleAlert.vue'
// import DebugWindow from '@/components/DebugWindow.vue'

import { useTimer } from '@/store/useTimer.js'

const timer = useTimer()

const appNameAndVersion = ref('Pomodoro Timer v.2.0.3')
let intervalName = ref('')

// Vue Lifecycles: https://vuejs.org/api/composition-api-lifecycle.html
onMounted(() => {
  // Update page title
  document.title = appNameAndVersion.value

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
    <header class='row'>
      <h1 class='col-6 pt-2'>Pomodoro<span class='d-none d-md-inline'> Timer</span></h1>

      <ControlPanel />
    </header>

    <ToggleAlert />

    <RouterView />

    <!-- <debug-window></debug-window> -->
    <footer>
      Proudly brought to you by <a href="https://ivan-lim.com" target="_blank">Ivan Lim</a>
    </footer>
  </div>
</template>

<style>
@import 'https://fonts.googleapis.com/css?family=Contrail+One';

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
</style>