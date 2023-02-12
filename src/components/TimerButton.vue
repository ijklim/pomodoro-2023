<template>
  <div class='col-12 col-sm-10 col-md-8 mx-auto'>
    <button
      class='btn btn-lg btn-block svg'
      v-html='buttonText'
      :class="{
        'btn-success': !timer.state.isTimerOn && !timer.isIntervalCompleted.value,
        'btn-light': !timer.state.isTimerOn && timer.isIntervalCompleted.value,
        'btn-warning': timer.state.isTimerOn
      }"
      @click='timer.toggleTimer'
    ></button>
  </div>
</template>

<script>
import { useTimer } from '@/store/useTimer'

export default {
  setup() {
    return {
      timer: useTimer(),
    }
  },

  computed: {
    buttonText() {
      // Note: converted from computed to methods to allow store to be injected for unit testing purpose
      const currentIntervalIndex = this.timer.state.currentIntervalIndex
      const pomodoroIntervals = this.timer.state.pomodoroIntervals
      const intervalName = pomodoroIntervals[currentIntervalIndex].name
      let svg = false
      let text = '...'

      // Dimension of svg canvas
      const VIEWPORT_DIMENSION = 18;
      // Where the top should start, should be more than 1 as text does not start at the top
      const SVG_TOP = 3;
      const SVG_HEIGHT = VIEWPORT_DIMENSION - SVG_TOP

      const SVG_PLAY_START_X = 1
      const SVG_PLAY = `
        <svg
          fill="currentColor"
          height="${VIEWPORT_DIMENSION}"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          viewBox="0 0 ${VIEWPORT_DIMENSION} ${VIEWPORT_DIMENSION}"
          width="${VIEWPORT_DIMENSION}"
        >
          <!-- Polygon coordinates: x,y -->
          <polygon points="${SVG_PLAY_START_X},${SVG_TOP} ${SVG_PLAY_START_X + SVG_HEIGHT / 2 + 2},${SVG_TOP + SVG_HEIGHT / 2} ${SVG_PLAY_START_X},${VIEWPORT_DIMENSION}"></polygon>
        </svg>
      `
      const SVG_PAUSE = `
        <svg
          fill="currentColor"
          height="${VIEWPORT_DIMENSION}"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          viewBox="0 0 ${VIEWPORT_DIMENSION} ${VIEWPORT_DIMENSION}"
          width="${VIEWPORT_DIMENSION}"
        >
          <rect x="1" y="${SVG_TOP}" width="4" height="${SVG_HEIGHT}"></rect>
          <rect x="10" y="${SVG_TOP}" width="4" height="${SVG_HEIGHT}"></rect>
        </svg>
      `
      const SVG_CHECK_SQUARE = `
        <svg
          fill="none"
          height="${VIEWPORT_DIMENSION}"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 ${VIEWPORT_DIMENSION} ${VIEWPORT_DIMENSION}"
          width="${VIEWPORT_DIMENSION}"
        >
          <polyline points="1,${SVG_TOP + SVG_HEIGHT / 2} ${SVG_HEIGHT / 3},${VIEWPORT_DIMENSION} ${SVG_HEIGHT},${SVG_TOP}"></polyline>
        </svg>
      `

      if (this.timer.isIntervalCompleted.value) {
        text = `${intervalName} is completed`
        svg = SVG_CHECK_SQUARE
      } else if (this.timer.state.isTimerOn) {
        text = `Pause ${intervalName}`
        svg = SVG_PAUSE
      } else if (this.timer.state.timer < pomodoroIntervals[currentIntervalIndex].time) {
        text = `Resume ${intervalName}`
        svg = SVG_PLAY
      } else {
        text = `Start ${intervalName}`
        svg = SVG_PLAY
      }

      return svg ? `${svg} &nbsp;${text}` : text
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:deep(svg) {
  margin-top: 2px;
  vertical-align: baseline;
}
</style>