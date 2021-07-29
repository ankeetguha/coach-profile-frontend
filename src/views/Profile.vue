<template>
  <div v-if="coach.fullName != undefined && coach.fullName != ''">
    <!--START: Vue Headful-->
    <vue-headful :title="meta.title" :description="meta.description" />
    <!--END: Vue Headful-->

    <!--START: Coach Header-->
    <CoachHeader :coach="coach"></CoachHeader>
    <!--END: Coach Header-->

    <!--START: Router Wrapper-->
    <div
      v-if="showRouteModal"
      class="modal-route"
      :class="{ show: showRouteModal }"
    >
      <div class="modal-content">
        <router-view :coach="coach"></router-view>
      </div>
    </div>
    <!--END: Router Wrapper-->

    <!--START: Social Handles-->
    <CoachPromotions :offerTicker="coach.offerTicker"></CoachPromotions>
    <!--END: Social Handles-->
  </div>
</template>

<script>
//Import components
import CoachPromotions from "@/components/Profile/CoachPromotions";
import CoachHeader from "@/components/Header";

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
    CoachHeader,
    CoachPromotions,
  },
  async created() {
    //Get coach and change meta details
    const slug = this.$route.params.slug;
    this.coach = await this.getCoach({ slug: slug });
    this.meta.title = `Coach ${this.coach.fullName} - ${this.coach.introTitle}`;
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.modal-route {
  position: relative;
  padding: 2rem 0 3rem;
  z-index: 1;

  .modal-content {
    border-radius: 2.5rem;
  }

  .close-router {
    position: absolute;
    z-index: 10;
    top: 0.25rem;
    right: 0.25rem;

    &/deep/ svg {
      background-color: $purpleColor;
      fill: $blackColor;
      width: 2rem;
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
      top: 0;
    }
  }
}
</style>