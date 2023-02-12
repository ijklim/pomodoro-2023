<template>
  <div class='col-12'>
    <div class='timer text-center'>
      <div
        :class="{
          'invisible': !timer.state.shouldShowTimer,
          'text-break': isOnBreak,
        }"
        @click='timer.toggleTimer'
      >
        {{ displayTimer }}
      </div>

      <TimerButton />
    </div>

    <TimerSound />

    <TimerLog />
  </div>
</template>

<script>
import TimerButton from './TimerButton.vue'
import TimerLog from './TimerLog.vue'
import TimerSound from './TimerSound.vue'

import { useTimer } from '@/store/useTimer.js'

export default {
  components: {
    TimerButton,
    TimerLog,
    TimerSound,
  },

  setup() {
    return {
      timer: useTimer(),
    }
  },

  computed: {
    displayTimer() {
      let minutes = Math.floor(this.timer.state.timer / 60);
      let seconds =this.timer.state.timer - minutes * 60;
      // Pad 0
      minutes = ('0' + minutes).slice(-2);
      seconds = ('0' + seconds).slice(-2);

      return minutes + ':' + seconds;
    },
    isOnBreak() {
      return !(this.timer.state.pomodoroIntervals[this.timer.state.currentIntervalIndex].name === 'Pomodoro')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* To allow font to look decent for all screen sizes, Chrome font quality slightly worse than other 2 browsers */
  .timer {
    font-size: 21.3rem;
    text-shadow: 0.5rem 1.0rem 0 #000;
  }

  /* Landscape or portrait screen up to 1024px */
  @media screen and (max-width: 1024px) {
    .timer {
      font-size: 32vw;
    }
  }

  /* Most likely mobile landscape mode */
  @media screen and (max-height: 700px) and (min-width: 700px) {
    .timer {
      font-size: 42vh;
    }
  }

  .timer:hover {
    cursor: pointer;
  }

  .text-break {
    color: #aaa;
  }
</style>