<script setup>
  import GoogleAdSense from '@/components/ads/GoogleAdSense.vue';
  import Timer from '@/components/Timer.vue';
</script>

<template>
  <!-- === Timer Display and Control === -->
  <div class="content row align-items-center">
    <Timer />
  </div>

  <!-- === Google AdSense ad === -->
  <div class="row align-items-center justify-content-center mt-5">
    <GoogleAdSense
      adFormat="fluid"
      adLayoutKey="-fb+5w+4e-db+86"
      :adSlot="7471404401"
    />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  min-height: calc(60vh);
}

.adsbygoogle {
  min-width: 250px;
  width: 80vw;
}
</style>
