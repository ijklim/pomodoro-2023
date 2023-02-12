<template>
  <div
    class='modal'
    :class="{'show': controlPanel.state.isLogOpen}"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content align-items-center">
        <!-- Modal Body -->
        <div class="modal-body w-100">
          <table class='table table-bordered table-sm mb-0'>
            <thead class='thead-dark'>
              <tr>
                <th>Interval</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='(logItem, index) in log' :key='index' :class='{ "table-success": logItem.name === "Pomodoro" }'>
                <td>{{ logItem.name }}</td>
                <td>{{ isNaN(logItem.startTime) ? logItem.startTime : '...' }}</td>
                <td>{{ isNaN(logItem.endTime) ? logItem.endTime : '...' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer w-100">
          <button type="button" class="btn btn-secondary" @click="handleClose">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useControlPanel } from '@/store/useControlPanel.js'
import { useTimer } from '@/store/useTimer.js'

export default {
  setup() {
    return {
      controlPanel: useControlPanel(),
      timer: useTimer(),
    }
  },
  data () {
    return {
      log: [],
    }
  },
  watch: {
    'timer.state.currentIntervalIndex': {
      handler: function (value) {
        console.log('[TimerLog.vue::watch::currentIntervalIndex] value', value)

        // Set end time
        this.log[0].endTime = (new Date()).toLocaleTimeString()

        // New log entry at the FRONT of the array
        this.addToLog(value)
      }
    },
    'timer.state.isTimerOn': {
      handler: function (value) {
        console.log('[TimerLog.vue::watch::isTimerOn] value', value)

        if (value && this.log[0].startTime === 0) {
          // Timer is on and start time has not been set
          // Scenario #1: When app first started
          // Scenario #2: Autostart Next Interval is off, user clicks on Start
          this.log[0].startTime = (new Date()).toLocaleTimeString()
        }
      }
    }
  },
  methods: {
    addToLog(intervalIndex) {
      console.log('[TimerLog.vue::addToLog()] intervalIndex', intervalIndex)

      // Note: New log entry is added to the FRONT of the array
      this.log.unshift(
        Object.assign(
          {
            startTime: this.timer.state.isTimerOn ? (new Date()).toLocaleTimeString() : 0,
            endTime: 0
          },
          this.timer.state.pomodoroIntervals[intervalIndex]
        )
      )
    },
    handleClose() {
      this.controlPanel.state.isLogOpen = false
    }
  },
  mounted () {
    this.addToLog(0)
  }
}
</script>

<style scoped src="@/assets/css/modal.css"></style>
