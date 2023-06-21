<template>
  <div class='col-12 col-sm-10 col-md-8 mx-auto'>
    <button
      v-html='buttonText'
      :class="buttonClasses"
      @click='timer.toggleTimer'
    ></button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTimer } from '@/store/useTimer'

const VIEWPORT_BREAKPOINT = {
  md: 768,
  sm: 400,
}

export default {
  setup() {
    const viewportHeight = ref(window.visualViewport.height);

    /**
     * Set viewportHeight when screen is resized
     *
     * @param {*} event
     */
    window.visualViewport.onresize = (event) => {
      // console.log(`[${import.meta.url.split('?')[0].split('/').slice(3).join('/')}::window.visualViewport.onresize()] event.target`, event.target);
      viewportHeight.value = event.target.height;
    }

    return {
      timer: useTimer(),
      viewportHeight,
    }
  },

  computed: {
    buttonClasses() {
      const results = [
        'btn',
        'btn-block',
        'svg',
      ];

      if (!this.timer.state.isTimerOn && !this.timer.isIntervalCompleted.value) {
        results.push('btn-success');
      }

      if (!this.timer.state.isTimerOn && this.timer.isIntervalCompleted.value) {
        results.push('btn-light');
      }

      if (this.timer.state.isTimerOn) {
        results.push('btn-warning');
      }

      // console.log(`[${import.meta.url.split('?')[0].split('/').slice(3).join('/')}::buttonClasses()] this.viewportHeight`, this.viewportHeight);
      if (this.viewportHeight > VIEWPORT_BREAKPOINT.md) {
        results.push('btn-lg');
      } else if (this.viewportHeight < VIEWPORT_BREAKPOINT.sm) {
        results.push('btn-sm');
      }

      return results.join(' ');
    },
    buttonText() {
      // Note: converted from computed to methods to allow store to be injected for unit testing purpose
      const currentIntervalIndex = this.timer.state.currentIntervalIndex
      const pomodoroIntervals = this.timer.state.pomodoroIntervals
      const intervalName = pomodoroIntervals[currentIntervalIndex].name
      let svg = false
      let text = '...'

      // Dimension of svg canvas
      const VIEWPORT_DIMENSION = this.viewportHeight > VIEWPORT_BREAKPOINT.md
        ? 18
        : (this.viewportHeight < VIEWPORT_BREAKPOINT.sm ? 14: 16);
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

      return (svg ? `${svg} &nbsp;${text}` : text) + this.viewportHeight;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:deep(svg) {
  margin-top: 2px;
  vertical-align: baseline;
}
</style>