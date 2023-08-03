<script setup>
  import Timer from '@/components/Timer.vue';
  import VueAdsRandom from '@/components/VueAds/Random.vue';
</script>

<template>
  <!-- === Timer Display and Control === -->
  <div class="content row align-items-center">
    <Timer />
  </div>

  <!-- === Random Advertisement === -->
  <div class="row pt-5">
    <div class="col-12 text-center">
      <VueAdsRandom />
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  min-height: calc(60vh);
}
</style>
