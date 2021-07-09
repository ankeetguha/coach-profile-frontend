<template>
  <div>
    <!--START: Vue Headful-->
    <vue-headful :title="meta.title" :description="meta.description" />
    <!--END: Vue Headful-->

    <!--START: Header-->
    <div class="cover-image-wrapper">
      <img
        :src="coach.coverImage.url"
        class="cover-image"
        :alt="`${coach.name} Cover Image`"
      />
      <!-- <img src="@/assets/images/profile-bg.jpg" class="cover-image" :alt="`${coach.name} Cover Image`" /> -->
    </div>
    <!--END: Header-->

    <!--START: Profile Wrapper-->
    <div
      class="profile-content-wrapper"
      :class="[
        coach.promotion != undefined ? 'promotion-container' : '',
        { shrink: showRouteModal },
      ]"
    >
      <!--START: Hero Wrapper-->
      <div class="hero-wrapper">
        <h1 class="hero-title">{{ coach.heroData.title }}</h1>
        <p class="hero-description">{{ coach.heroData.description }}</p>
      </div>
      <!--END: Hero Wrapper-->

      <!--START: Social Handles-->
      <CoachSocialHandles
        :socialHandles="coach.socialHandles"
      ></CoachSocialHandles>
      <!--END: Social Handles-->

      <!--START: Profile Menu-->
      <div class="profile-menu-list">
        <router-link
          v-for="(menuItem, index) in profileMenu"
          :class="{ selected: index === 0 }"
          :to="menuItem.toLowerCase()"
          :key="menuItem.id"
          class="profile-menu-item"
        >
          {{ menuItem }}
        </router-link>
      </div>
      <!--END: Profile Menu-->

      <!--START: Plans List-->
      <CoachPlans :plans="coach.plans"></CoachPlans>
      <!--END: Plans List-->

      <!--START: Scroll End-->
      <MessageCoach :name="coach.name" :gender="coach.gender"></MessageCoach>
      <!--END: Scroll End-->

      <!--START: Specialities-->
      <CoachSpecialities :specialities="coach.specialities"></CoachSpecialities>
      <!--END: Specialities-->

      <!--START: Transformations-->
      <CoachTransformations
        :transformations="coach.transformations"
        :coachName="coach.name"
      ></CoachTransformations>
      <!--END: Transformations-->

      <!--START: Qualifications-->
      <CoachQualifications
        :qualifications="coach.qualifications"
      ></CoachQualifications>
      <!--END: Qualifications-->
    </div>
    <!--END: Profile Wrapper-->

    <!--START: Router Wrapper-->
    <div
      v-if="showRouteModal"
      class="modal-route"
      :class="{ show: showRouteModal }"
    >
      <router-link to="/">
        <unicon class="close-router" name="times" />
      </router-link>
      <div class="modal-content">
        <router-view></router-view>
      </div>
    </div>
    <!--END: Router Wrapper-->

    <!--START: Social Handles-->
    <CoachPromotions :promotion="coach.promotion"></CoachPromotions>
    <!--END: Social Handles-->
  </div>
</template>

<script>
//Import components
import MessageCoach from "@/components/Profile/MessageCoach";
import CoachSocialHandles from "@/components/Profile/CoachSocialHandles";
import CoachPlans from "@/components/Profile/CoachPlans";
import CoachSpecialities from "@/components/Profile/CoachSpecialities";
import CoachQualifications from "@/components/Profile/CoachQualifications";
import CoachTransformations from "@/components/Profile/CoachTransformations";
import CoachPromotions from "@/components/Profile/CoachPromotions";

export default {
  name: "Profile",
  data() {
    return {
      coach: {},
      meta: {
        title: "Skipper Coach",
        description:
          "Skipper helps you find the best personal trainers and coaches to help you meet your fitness goals from home. We've got coaches for S&C, Yoga, Weight Training, Nutrition and more.",
      },
      showRouteModal: false,
      profileMenu: ["Plans", "About", "Testimonials", "Partners"],
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (newVal) {
        this.showRouteModal = newVal.meta && newVal.meta.showRouteModal;
      },
    },
  },
  components: {
    MessageCoach,
    CoachPlans,
    CoachSocialHandles,
    CoachSpecialities,
    CoachQualifications,
    CoachTransformations,
    CoachPromotions,
  },
  async created() {
    //Get coach and change meta details
    this.coach = this.getCoach();
    this.meta.title = `Coach ${this.coach.name} - ${this.coach.heroData.description}`;
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.cover-image {
  position: fixed;
  display: block;
  width: 100%;
  top: 0;
  left: 0;
  filter: blur(7px);
}

.profile-content-wrapper {
  background-color: rgba(39, 39, 39, 0.95);
  position: relative;
  box-shadow: 0 0 1.5rem 1.5rem rgba(0, 0, 0, 0.5);
  transform: scale(1);
  transform-origin: bottom center;
  transition: all 0.15s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &.shrink {
    overflow: hidden;
    border-radius: 3rem;
    transform: scale(0.99);
  }

  &.promotion-container > div:last-child {
    padding-bottom: 5.5rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(183, 183, 183, 0.5);
    filter: blur(10px);
    opacity: 0.65;
  }
}

.hero-wrapper {
  position: relative;
  background: $blackColor;
  padding: 2rem 0 1rem;
  text-align: center;

  .hero-title {
    font-size: $extraLargeFontSize;
    font-family: $titleFont;
    font-weight: $boldFontWeight;
    color: $whiteColor;
    margin-bottom: 0rem;
    text-transform: uppercase;

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
  }
}

.profile-menu-list {
  position: relative;
  display: block;
  text-align: center;
  margin: 0;
  padding: 0.5rem 0 1rem;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
  background: $blackColor;

  .profile-menu-item {
    display: inline-block;
    margin: 0 1rem;
    color: $whiteColor;
    opacity: $lightOpacity;
    padding: 1rem 0;
    cursor: pointer;
    text-align: center;
    border-bottom: 2px solid transparent;

    &.selected {
      opacity: 1;
      padding: 0.45rem 1.5rem;
      color: darken($darkPurpleColor, 35%);
      background-color: $purpleColor;
      border-radius: 3rem;
    }
  }
}

.modal-route {
  width: calc(100% - 1rem);
  height: calc(100vh - 3.5rem);
  background-color: lighten($blackColor, 5%);
  box-shadow: 0 0 1rem 4rem rgba(0, 0, 0, 0.5);
  border-radius: 3rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 0.5rem;
  position: fixed;
  top: calc(100vh + 3rem);
  left: 0;
  z-index: 1;
  transform-origin: bottom center;

  &.show {
    animation-name: showRouteModal;
    animation-duration: 0.3s;
    animation-delay: 0.01s;
    animation-fill-mode: forwards;
  }

  .modal-content {
    border-radius: 2.5rem;
    width: calc(100% - 1rem);
    height: calc(100% - 1rem);
    position: absolute;
    overflow-y: scroll;
    top: 0.5rem;
    left: 0.5rem;
  }

  .close-router {
    position: absolute;
    z-index: 10;
    top: -0.5rem;
    right: 0.5rem;

    &/deep/ svg {
      background-color: $purpleColor;
      fill: $blackColor;
      width: $largestFontSize;
      height: auto;
      padding: 0.25rem;
      border-radius: 0.25rem;
    }
  }

  @keyframes showRouteModal {
    0% {
      top: calc(100vh + 3rem);
    }
    100% {
      top: calc(2.5rem);
    }
  }
}
</style>