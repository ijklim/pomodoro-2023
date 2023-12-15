<script setup>
  import { onMounted, reactive } from 'vue';
  import Timer from '@/components/Timer.vue';
  // import VueAdsRandom from '@/components/VueAds/Random.vue';


  // === Data ===
  const state = reactive({
    isAdLoaded: false,
  });


  // === Lifecycle Hooks ===
  /**
   * Start interval to count down timer if it is switched on
   */
  onMounted(() => {
    setTimeout(() => {
      // Resize iframe that displays ad from https://ads.ivan-lim.com
      // @ts-ignore, iFrameResize is made available by iframeResizer.min.js
      iFrameResize({ log: false }, 'iframe.ads');

      // Display ad element
      state.isAdLoaded = true;
    }, 1000);
  });
</script>

<template>
  <!-- === Timer Display and Control === -->
  <div class="content row align-items-center">
    <Timer />

    <!-- === Random Advertisement === -->
    <iframe
      class="col-12 ads mt-5"
      frameborder="0"
      src="https://ads.ivan-lim.com"
      v-show="state.isAdLoaded"
    />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  /* Middle pane should be full screen height, removing heights of header, footer, and footer top margin (mt-5 = 3rem) */
  min-height: calc(100vh - 54px - 40px - 3rem) ;
}
</style>
