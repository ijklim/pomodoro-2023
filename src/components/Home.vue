<template>
  <div class="content row align-items-center">
    <Timer />
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue'

export default {
  components: {
    Timer,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  min-height: calc(100vh - 24px - 10px - 64px);
}
</style>
