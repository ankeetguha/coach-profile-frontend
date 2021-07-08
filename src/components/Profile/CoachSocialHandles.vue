<template>
  <div class="social-list">
    <a
      :href="handle.link"
      target="_blank"
      class="social-item"
      v-for="handle in socialHandles"
      :key="handle.id"
    >
      <unicon :name="socialIcons[handle.platform]" />
    </a>
  </div>
</template>

<script>
export default {
  name: "CoachSocialHandles",
  data() {
    return {
      socialIcons: {
        facebook: "facebook-f",
        instagram: "instagram",
        youtube: "youtube",
        twitter: "twitter",
        whatsapp: "whatsapp",
      },
    };
  },
  props: {
    socialHandles: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.social-list {
  position: relative;
  background-color: $blackColor;
  text-align: center;
  padding: .5rem 2rem 1rem;
}

.social-item {
  display: inline-block;
  vertical-align: middle;
  text-decoration: none;
  border: none;
  border-radius: 50%;
  padding: .55rem .55rem;
  margin: 0 .35rem;
  background-color: lighten($blackColor, 8%);

  .unicon /deep/ svg {
    width: $largestFontSize;
    fill: lighten($blackColor, 45%);
  }
}
</style>
