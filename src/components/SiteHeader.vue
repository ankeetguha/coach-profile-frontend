<template>
  <!--START: Hero Wrapper-->
  <div
    class="header-wrapper"
    :class="
      coach.offerTicker != undefined && coach.offerTicker.showOffer
        ? 'extend-header'
        : ''
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
        <span
          class="workout-category"
          v-if="coach.workoutCategory != undefined"
          >{{ coach.workoutCategory }}</span
        >
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
      <router-link
        :to="`/${!this.$store.state.isSubDomain ? coach.slug + '/' : ''}`"
        class="profile-menu-item"
      >
        Plans
      </router-link>
      <router-link
        :to="`/${!this.$store.state.isSubDomain ? coach.slug + '/' : ''}about`"
        class="profile-menu-item"
      >
        About
      </router-link>
      <router-link
        v-if="
          coach.promotionalLinks != undefined &&
          coach.promotionalLinks.length > 0
        "
        :to="`/${!this.$store.state.isSubDomain ? coach.slug + '/' : ''}links`"
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
  padding: 1.5rem 0 0;
  text-align: center;

  .profile-image-wrapper {
    position: relative;
    width: 4rem;
    height: 4rem;
    border: 2px solid var(--brand-color);
    background-color: var(--brand-color);
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
  margin-top: 2rem;
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
    display: none;
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

.workout-category {
  display: block;
  font-size: $smallerFontSize;
  color: $lightWhiteColor;
  opacity: $lightOpacity;
  margin: -0.15rem 0 0.75rem;
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
  padding: 0 0 1.25rem;

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
      color: var(--brand-color-dark-35);
      background-color: var(--brand-color);
      border-radius: 3rem;
    }
  }
}

//Light Theme styles
.light-theme {
  .header-wrapper,
  .social-list,
  .hero-wrapper {
    background-color: #F7F7F7;
  }

  .profile-image-wrapper::before {
    border-color: $lightWhiteColor;
  }

  .header-wrapper {
    box-shadow: none;
  }

  .hero-title {
    color: $lightBlackColor;
    font-family: $bodyFont;
    text-transform: none;
  }

  .workout-category {
    color: lighten($blackColor, 30%);
  }

  .hero-description {
    color: lighten($blackColor, 20%);
  }

  .profile-image-wrapper {
    margin-top: -3.5rem;
  }

  .hero-wrapper {
    &::before {
      content: "";
      display: block;
      position: relative;
      height: 4.5rem;
      background-color: var(--brand-color);
      background-image: url("/assets/images/light-theme/cover-bg.jpg");
      background-repeat: no-repeat;
      background-size: 100%;
      background-blend-mode: darken;
      margin-top: -1.5rem;
    }
    &::after {
      box-shadow: 0 -1rem 1rem -0.5rem rgba(37, 37, 37, 0.2);
      content: "";
      display: block;
      height: 2rem;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      background: #f7f7f7;
      position: absolute;
      top: 3rem;
      left: 0;
      width: 100%;
    }
  }

  .profile-menu-list {
    padding: 0 0 0.25rem;

    .profile-menu-item {
      opacity: 1;
      color: lighten($blackColor, 30%);

      &.router-link-exact-active {
        border: 2px solid var(--brand-color-light-10);
        color: var(--brand-color-light-45);
      }
    }
  }
}

@media screen and (min-width: $mobileWidth) {
  .extend-header {
    padding-top: 2.5rem;
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
      margin-top: 0;
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