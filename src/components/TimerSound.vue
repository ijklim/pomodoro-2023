<template>
  <div>
    <audio id='timer-sound'>
      <source src="../assets/audios/3beeps.wav" type="audio/wav">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
import { useControlPanel } from '@/store/useControlPanel'
import { useTimer } from '@/store/useTimer'

export default {
  setup() {
    return {
      controlPanel: useControlPanel(),
      timer: useTimer(),
    }
  },

  watch: {
    /**
     * Play sound if both shouldPlaySound and isSoundOn are true
     */
    'timer.state.shouldPlaySound': {
      handler: function (value) {
        // console.log('[TimerSound.vue::watch()::shouldPlaySound] value', value)

        if (value && this.controlPanel.state.isSoundOn) {
          document.getElementById('timer-sound').play()

          // Turn off sound after a short interval
          setTimeout(() => {
            this.timer.state.shouldPlaySound = false
          }, 1000)
          return
        }

        // Stop sound that could potential be playing
        document.getElementById('timer-sound').pause()
        document.getElementById('timer-sound').currentTime = 0
      },
    },
  }
}
</script>
