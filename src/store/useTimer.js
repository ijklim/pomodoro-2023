import { computed, reactive } from 'vue'
import { useControlPanel } from './useControlPanel'

// time is in seconds
const POMODORO = { name: 'Pomodoro', time: 25 * 60 }
const SHORT_BREAK = { name: 'Short Break', time: 5 * 60 }
const LONG_BREAK = { name: 'Long Break', time: 20 * 60 }
const POMODORO_INTERVALS = [
  POMODORO,
  SHORT_BREAK,
  POMODORO,
  SHORT_BREAK,
  POMODORO,
  SHORT_BREAK,
  POMODORO,
  LONG_BREAK
]

const state = reactive({
  currentIntervalIndex: 0,
  isTimerOn: false,
  pomodoroIntervals: POMODORO_INTERVALS,
  shouldPlaySound: false,
  shouldShowTimer: true,
  timer: POMODORO_INTERVALS[0].time,
})

export function useTimer() {
  return {
    state,
    // === Computed
    isIntervalCompleted: computed(() => {
      return (state.timer === 0)
    }),
    // === Methods
    initiateNextInterval: () => {
      if (state.isTimerOn) {
        // Prevent repeat executions
        state.isTimerOn = false

        // Blink counter
        const blinkTimer = setInterval(() => {
          state.shouldShowTimer = !state.shouldShowTimer
        }, 350)

        // Play sound
        state.shouldPlaySound = true

        // Initialize next interval settings after a short timeout
        setTimeout(() => {
          // Stop timer from blinking
          clearInterval(blinkTimer)
          state.shouldShowTimer = true

          // Increment current interval index, loop if necessary
          state.currentIntervalIndex = ++state.currentIntervalIndex % state.pomodoroIntervals.length

          // Reset timer
          state.timer = state.pomodoroIntervals[state.currentIntervalIndex].time

          // If autostart is on, turn on timer
          const controlPanel = useControlPanel()
          if (controlPanel.state.shouldAutostartNextInterval) state.isTimerOn = true
        }, 3000)
      }
    },
    toggleTimer: () => {
      state.isTimerOn = !state.isTimerOn
    },
    updateTimer: () => {
      if (state.timer > 0) state.timer--
    },
  }
}
