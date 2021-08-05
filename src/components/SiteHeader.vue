<template>
  <!--START: Hero Wrapper-->
  <div
    class="header-wrapper"
    :class="
      coach.offerTicker != undefined && coach.offerTicker.showOffer ? 'extend-header' : ''
    "
  >
    <div class="hero-wrapper">
      <div class="profile-image-wrapper">
        <img
          v-if="coach.profilePictureURL != undefined"
          :src="coach.profilePictureURL"
          class="profile-image"
          :alt="coach.fullName"
        />
      </div>
      <div class="coach-details-wrapper">
        <h1 class="hero-title">
          <span>{{ coach.fullName }}</span>
        </h1>
        <p v-if="coach.coverTitle != undefined" class="hero-description">
          {{ coach.coverTitle }}
        </p>
        <!--START: Social Handles-->
        <CoachSocialHandles
          :socialHandles="coach.socialHandles"
          :phoneNumber="coach.phone"
          :showNumber="coach.showNumber"
        ></CoachSocialHandles>
        <!--END: Social Handles-->
      </div>
    </div>
    <!--END: Hero Wrapper-->

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
  padding: 2.5rem 0 0;
  text-align: center;

  .profile-image-wrapper {
    position: relative;
    width: 4rem;
    height: 4rem;
    border: 2px solid $purpleColor;
    padding: 0.5rem;
    border-radius: 50%;
    margin: 0 auto 0.75rem;
    z-index: 1;
    overflow: hidden;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      border-radius: 50%;
      border: 5px solid lighten($blackColor, 5%);
      z-index: 2;
    }
  }

  .profile-image {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.coach-details-wrapper {
  text-align: center;
  margin: 0 0 0.5rem;
}

.hero-title {
  font-family: $titleFont;
  font-weight: $boldFontWeight;
  color: $whiteColor;
  margin-bottom: 0.5rem;
  text-transform: uppercase;

  span {
    line-height: 1;
    font-size: $largestFontSize;
    position: relative;
    display: block;
    margin-top: -0.95rem;
  }

  &::before {
    display: block;
    content: "COACH";
    font-size: $largeFontSize;
    color: $blackColor;
    font-family: $titleFont;
    letter-spacing: 0.15rem;
    font-weight: 800;
    -webkit-text-stroke: 0.75px $whiteColor;
    opacity: $lightOpacity;
  }
}

.hero-description {
  font-size: $smallFontSize;
  color: $lightWhiteColor;
  margin: 0 1.5rem;
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
    font-size: $smallFontSize;
    padding: 0.25rem 1.15rem;
    cursor: pointer;
    text-align: center;
    border-bottom: 2px solid transparent;

    &.router-link-exact-active {
      opacity: 1;
      padding: 0.35rem 1.15rem;
      color: darken($darkPurpleColor, 35%);
      background-color: $purpleColor;
      border-radius: 3rem;
    }
  }
}

@media screen and (min-width: $mobileWidth) {
  .extend-header {
    padding-top: 3rem;
  }
  .header-wrapper {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .profile-image-wrapper,
  .coach-details-wrapper {
    display: inline-block;
    vertical-align: top;
  }

  .hero-wrapper {
    display: block;
    .profile-image-wrapper {
      width: 5.5rem;
      height: 5.5rem;
    }

    .coach-details-wrapper {
      text-align: left;
      margin-left: 2rem;
    }

    .social-list {
      text-align: left;
      padding: 1rem 0;
    }

    .hero-description {
      margin: 0;
    }
  }
}
</style>