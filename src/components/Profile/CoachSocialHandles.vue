<template>
  <div class="social-list">
    <div
      :key="handle.id"
      v-for="handle in socialHandles"
      class="social-item-wrapper"
    >
      <a
        v-if="handle.handle != null && handle.handle != ''"
        :href="handle.handle"
        target="_blank"
        class="social-item"
      >
        <unicon :name="socialIcons[handle.platform]" />
      </a>
    </div>

    <div
      v-if="phoneNumber && (showNumber == undefined || showNumber == true)"
      class="social-item-wrapper"
    >
      <a
        :href="`https://wa.me/${phoneNumber}`"
        target="_blank"
        class="social-item"
      >
        <unicon name="whatsapp" />
      </a>
    </div>
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
    phoneNumber: {
      type: String,
      required: false
    },
    showNumber: Boolean
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.social-list {
  position: relative;
  background-color: $blackColor;
  text-align: center;
  padding: 0.5rem 2rem 1rem;
}

.social-item-wrapper {
  display: inline-block;
  vertical-align: middle;
}

.social-item {
  display: inline-block;
  vertical-align: middle;
  text-decoration: none;
  border: none;
  border-radius: 50%;
  padding: 0.55rem 0.55rem;
  margin: 0 0.35rem;
  background-color: lighten($blackColor, 8%);

  .unicon /deep/ svg {
    width: $largestFontSize;
    fill: lighten($blackColor, 45%);
  }
}
</style>
