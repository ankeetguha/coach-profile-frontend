<template>
  <div class="social-list">
    <div
      :key="handle.id"
      v-for="handle in socialHandles"
      class="social-item-wrapper"
    >
      <a
        v-if="handle.handle != null && handle.handle != ''"
        :href="`${handle.handle}`"
        target="_blank"
        class="social-item"
      >
        <svg :data-src="getImageExtension(handle.platform)" />
      </a>
    </div>

    <div
      v-if="phoneNumber && (showNumber == undefined || showNumber == true)"
      class="social-item-wrapper"
    >
      <a
        :href="`https://wa.me/+91${phoneNumber}`"
        target="_blank"
        class="social-item"
      >
        <svg data-src="/assets/images/social-icons/whatsapp.svg" />
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
        facebook: ["facebook", ""],
        instagram: ["instagram", ""],
        youtube: ["youtube", ""],
        twitter: ["twitter", ""],
        medium: ["medium", ""],
        whatsapp: ["whatsapp", "https://wa.me/"],
        snapchat: ["snapchat", ""],
        josh: ["josh", ""],
        moj: ["moj", ""],
        takatak: ["takatak", ""],
        spotify: ["spotify", ""],
      },
    };
  },
  props: {
    socialHandles: Array,
    phoneNumber: {
      type: String,
      required: false,
    },
    showNumber: Boolean,
  },
  methods: {
    getImageExtension(fileName) {
      return "/assets/images/social-icons/" + fileName + ".svg";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.social-list {
  position: relative;
  background-color: $blackColor;
  text-align: center;
  padding: 1rem 2rem 1rem;
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
  padding: 7px 8px;
  margin: 0 0.35rem;
  background-color: lighten($blackColor, 8%);

  .unicon /deep/ svg {
    width: $largeFontSize;
    height: $largeFontSize;
    fill: lighten($blackColor, 45%);
  }
  svg {
    width: $largerFontSize;
    height: $largerFontSize;

    /deep/ g {
      fill: lighten($blackColor, 45%);
    }
  }
}

//Light Theme styles
.light-theme {
  .social-item {
    background-color: darken($whiteColor, 10%);

    .unicon /deep/ svg {
      fill: darken($whiteColor, 40%);
    }
  }
}
</style>
