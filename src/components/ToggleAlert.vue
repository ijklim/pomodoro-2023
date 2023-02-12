<template>
  <div
    class='modal'
    :class="{'show': showAlert}"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content align-items-center">
        <div class="modal-body" v-html="alertMessage"></div>
      </div>
    </div>
  </div>
</template>

<script>
// Ref: https://getbootstrap.com/docs/4.0/components/modal/
import { useControlPanel } from '@/store/useControlPanel'

export default {
  setup() {
    return {
      controlPanel: useControlPanel(),
    }
  },
  // variables
  data () {
    return {
      alertMessage: '',
      showAlert: false,
      bodyTextVariant: 'dark'
    }
  },
  watch: {
    'controlPanel.state.shouldAutostartNextInterval': {
      handler: function (value) {
        this.alertMessage = `
          Autostart Next Interval is
          <span class="badge badge-${value ? 'success">On' : 'danger">Off'}</span>
        `
        this.showAlert = true
      }
    },
    'controlPanel.state.isSoundOn': {
      handler: function (value) {
        this.alertMessage = `
          Sound is
          <span class="badge badge-${value ? 'success">On' : 'danger">Off'}</span>
        `
        this.showAlert = true
      }
    },
    /**
     * Turn off alert after a short period of time
     *
     * @param {boolean} value
     */
    showAlert: function (value) {
      if (value) {
        // Autoclose alert
        setTimeout(() => {
          this.showAlert = false
        }, 2000)
      }
    }
  },
}
</script>

<style scoped src="@/assets/css/modal.css"></style>
