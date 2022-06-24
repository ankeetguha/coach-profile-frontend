<template>
  <div>
    <!--START: Cover Image Wrapper-->
    <CoverImage v-if="coach.coverImageURL" :coach="coach"></CoverImage>
    <!--END: Cover Image Wrapper-->

    <div class="main-body">
      <!--START: Coach Header-->
      <SiteHeader :coach="coach"></SiteHeader>
      <!--END: Coach Header-->

      <!--START: Router Wrapper-->
      <div
        v-if="showRouteModal"
        class="modal-route"
        :class="{ show: showRouteModal }"
      >
        <div class="modal-content">
          <router-view
            :coach="coach"
            @messageCoach="messageCoach"
          ></router-view>
        </div>
      </div>
      <!--END: Router Wrapper-->

      <!--START: Social Handles-->
      <CoachPromotions :offerTicker="coach.offerTicker"></CoachPromotions>
      <!--END: Social Handles-->

      <!--START: Enquiry Form-->
      <CoachEnquiry ref="coachEnquiry" :coach="coach"></CoachEnquiry>
      <!--END: Enquiry Form-->

      <!--START: Coach Header-->
      <SiteFooter
        :coach="coach"
        :class="
          coach.offerTicker != undefined && coach.offerTicker.showOffer
            ? 'extended-footer'
            : ''
        "
      ></SiteFooter>
      <!--END: Coach Header-->
    </div>
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";

//Import components
import CoachPromotions from "@/components/Profile/CoachPromotions";
import CoachEnquiry from "@/components/Profile/CoachEnquiry";
import CoverImage from "@/components/CoverImage";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default {
  name: "Profile",
  metaInfo() {
    return {
      title: this.meta.title,
      meta: [
        {
          name: "description",
          content: this.meta.ogDescription,
          vmid: "description",
        },
        {
          property: "og:title",
          content: this.meta.ogTitle,
          vmid: "og:title",
        },
        {
          property: "og:image",
          content: this.meta.ogImage,
          vmid: "og:image",
        },
        {
          property: "og:description",
          content: this.meta.ogDescription,
          vmid: "og:description",
        },
        {
          property: "og:url",
          content: window.location.href,
          vmid: "og:url",
        },
        {
          property: "og:type",
          content: "website",
          vmid: "og:type",
        },
      ],
    };
  },
  data() {
    return {
      brandColorH: "257",
      brandColorS: "100%",
      brandColorL: "79%",
      showRouteModal: false,
      meta: {
        title: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
      },
    };
  },
  props: {
    coach: Object,
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
    CoverImage,
    SiteHeader,
    SiteFooter,
    CoachEnquiry,
    CoachPromotions,
  },
  async created() {
    //Get coach and change meta details
    if (_.isEmpty(this.coach)) {
      this.coach = await this.getCoach();
    }

    this.meta.title = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogTitle = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogDescription = this.coach.description;
    this.meta.ogImage =
      this.coach.offerings != undefined
        ? this.coach.offerings[0].coverImageURL
        : this.coach.plans[0].coverImageURL;
  },
  methods: {
    messageCoach() {
      this.$refs.coachEnquiry.showMessageModal();
    },
  },
};
</script>

<style lang="scss">
.main-body {
  position: relative;
  background-color: #272727;
  z-index: 5;
}

.modal-route {
  position: relative;
  padding: 2rem 0 0;
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
.app-wrapper {
  background-color: rgba(39, 39, 39, 0.95);
  box-shadow: 0 0 1.5rem 1.5rem rgba(0, 0, 0, 0.5);
  background-color: #272727;
  overflow-x: hidden;
  min-height: 100vh;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    box-shadow: inset 0 0 2000px rgba(183, 183, 183, 0.5);
    opacity: 0.45;
    z-index: -1;
  }
}

//Light Theme Styles
.light-theme {
  position: relative;
  background-color: #e8e8e8;

  .main-body {
    background-color: #e8e8e8;
  }

  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    box-shadow: inset 0 0 2000px rgba(183, 183, 183, 0.5);
    opacity: 0.45;
    z-index: -1;
  }
}

@media screen and (min-width: $mobileWidth) {
  .modal-route {
    padding: 3rem 0 0;
  }

  //Light Theme Styles
  .light-theme {
    position: relative;
    .main-body {
      background-color: #f9f9f9;
    }
  }
}
</style>