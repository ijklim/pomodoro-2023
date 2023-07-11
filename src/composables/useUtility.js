/**
 * Helper function to return the module or Vue component name
 */
export default (importMeta) => {
  // import.meta.url example (development): http://[::1]:5173/resources/js/components/InputHelpers/ImageGeneration.vue?t=1687718064846
  // import.meta.url example (production): https://chatgpt.ivan-lim.com/build/assets/ImageGeneration-0317397d.js
  const currentFileName = importMeta.url.match(/[^\/]+\.(js|vue)/i)[0];
  // Remove string after - to prevent cache key changing after every update
  const cacheKeyPrefix = currentFileName.match(/[^-.]+/i)[0];
  // console.log(`[${currentFileName}] cacheKeyPrefix: `, cacheKeyPrefix);

  return {
    cacheKeyPrefix,
    currentFileName,
  };
};
