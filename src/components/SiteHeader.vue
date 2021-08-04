<template>
  <!--START: Hero Wrapper-->
  <div class="header-wrapper">
    <div class="hero-wrapper">
      <img
        v-if="coach.profilePictureURL != undefined"
        :src="coach.profilePictureURL"
        class="profile-image"
        :alt="coach.fullName"
      />
      <h1 class="hero-title">
        <span>{{ coach.fullName }}</span>
      </h1>
      <p v-if="coach.coverTitle != undefined" class="hero-description">
        {{ coach.coverTitle }}
      </p>
    </div>
    <!--END: Hero Wrapper-->

    <!--START: Social Handles-->
    <CoachSocialHandles
      :socialHandles="coach.socialHandles"
      :phoneNumber="coach.phone"
      :showNumber="coach.showNumber"
    ></CoachSocialHandles>
    <!--END: Social Handles-->

    <!--START: Profile Menu-->
    <div class="profile-menu-list">
      <router-link :to="`/${coach.slug}/`" class="profile-menu-item">
        Plans
      </router-link>
      <router-link :to="`/${coach.slug}/about`" class="profile-menu-item">
        About
      </router-link>
      <router-link
        v-if="
          coach.promotionalLinks != undefined &&
          coach.promotionalLinks.length > 0
        "
        :to="`/${coach.slug}/links`"
        class="profile-menu-item"
      >
        Links
      </router-link>
    </div>
    <!--END: Profile Menu-->
  </div>
</template>

<script>
//Import components
import CoachSocialHandles from "@/components/Profile/CoachSocialHandles";

export default {
  name: "CoachHeader",
  components: {
    CoachSocialHandles,
  },
  props: {
    coach: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.header-wrapper {
  position: relative;
  z-index: 5;
  background: $blackColor;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
  box-shadow: 0 1rem 0.7rem -0.15rem rgba(31, 31, 31, 0.5);
}

.hero-wrapper {
  position: relative;
  background: $blackColor;
  padding: 1.5rem 0 1rem;
  text-align: center;

  .profile-image {
    background-color: lighten($blackColor, 5%);
    position: relative;
    z-index: 1;
    border: 2px solid $purpleColor;
    display: block;
    width: 5rem;
    height: 5rem;
    padding: 0.5rem;
    margin: 0 auto 0.75rem;
    border-radius: 50%;
  }

  .hero-title {
    font-family: $titleFont;
    font-weight: $boldFontWeight;
    color: $whiteColor;
    margin-bottom: 0.5rem;
    text-transform: uppercase;

    span {
      line-height: 1;
      font-size: $extraLargeFontSize;
      position: relative;
      display: block;
      margin-top: -1.25rem;
    }

    &::before {
      display: block;
      content: "COACH";
      font-size: $largestFontSize;
      color: $blackColor;
      font-family: $titleFont;
      letter-spacing: 0.15rem;
      font-weight: 800;
      -webkit-text-stroke: 0.75px $whiteColor;
      opacity: $lightOpacity;
      margin-bottom: -1.25rem;
    }
  }

  .hero-description {
    font-size: $normalFontSize;
    color: $lightWhiteColor;
    margin: 0 1.5rem;
  }
}

.profile-menu-list {
  position: relative;
  display: block;
  text-align: center;
  margin: 0;
  padding: 0.5rem 0 1.25rem;

  .profile-menu-item {
    display: inline-block;
    color: $whiteColor;
    opacity: $lightOpacity;
    padding: 0.45rem 1.5rem;
    cursor: pointer;
    text-align: center;
    border-bottom: 2px solid transparent;

    &.router-link-exact-active {
      opacity: 1;
      padding: 0.45rem 1.5rem;
      color: darken($darkPurpleColor, 35%);
      background-color: $purpleColor;
      border-radius: 3rem;
    }
  }
}
</style>