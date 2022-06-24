<template>
  <div>
    <div
      v-if="offering.title != null"
      class="offering"
      :class="{ 'details-only': !coach.isSubscribed || !coach.paymentsActive }"
    >
      <!--START: Header-->
      <div class="header-wrapper">
        <router-link
          class="go-back"
          :to="`/${!$store.state.isSubDomain ? coach.slug + '/' : ''}`"
        >
          <unicon name="angle-left"></unicon>
          <span>Back To Offerings</span>
        </router-link>
        <div class="filler"></div>
        <a
          class="btn btn-text btn-small"
          href="https://coach.skipperfit.com/client/login"
          target="_blank"
        >
          <unicon name="user"></unicon>
          <span>Client Login</span>
        </a>
      </div>
      <!--END: Header-->

      <!--START: Hero-->
      <div class="hero-wrapper">
        <div class="hero-wrapper-block">
          <!--START: Cover-->
          <div
            class="cover-image-wrapper"
            :class="{
              extend:
                offering.coverVideoURL != undefined &&
                offering.offeringType != 'video-course',
            }"
            @click="showVideoPlayer"
          >
            <img
              :src="offering.coverImageURL"
              class="cover-image"
              alt="Cover Image"
            />
            <div
              v-if="
                offering.coverVideoURL != undefined &&
                offering.offeringType != 'video-course'
              "
              class="video-wrapper"
              :class="{ float: offering.coverImageURL != undefined }"
            >
              <unicon name="play" class="play-btn"></unicon>
              <div class="video-info">
                <span>Watch the Video</span>
                <h3>Plan Introduction</h3>
              </div>
            </div>
          </div>
          <!--END: Cover-->

          <div class="title-main-wrapper">
            <div class="title-info-wrapper">
              <!--START: Title-->
              <h1 class="title">{{ offering.title }}</h1>
              <!--END: Title-->
            </div>
            <!--END: Hero-->

            <!--START: Highlights-->
            <TypeHighlights
              :offeringType="offering.offeringType"
            ></TypeHighlights>
            <!--END: Highlights-->
          </div>

          <!--START: Variants-->
          <Variants
            v-if="offering.price.variants.length"
            :variants="offering.price.variants"
            :showModal="showOptions.variantsModal"
            @showVariantsModal="showVariantsModal"
            @changeVariant="changeVariant"
            @closeVariantsModal="closeVariantsModal"
          ></Variants>
          <!--END: Variants-->
        </div>
      </div>

      <!--START: Preview Type-->
      <TypePreview
        :offering="offering"
        :coachSlug="coach.slug"
        :showSampleWorkouts="showOptions.sampleWorkouts"
        @toggleSampleWorkouts="toggleSampleWorkouts"
        @playIntroVideo="showVideoPlayer"
      ></TypePreview>
      <!--END: Preview Type-->

      <!--START: Description-->
      <div class="description-wrapper">
        <h3 class="sub-title">Description</h3>
        <div
          class="description"
          :class="{ show: showOptions.description }"
          v-html="offering.description"
        ></div>
        <span class="read-more-btn" @click="toggleDescription">{{
          !showOptions.description ? "Read More" : "Read Less"
        }}</span>
      </div>
      <!--END: Description-->

      <!--START: Equipment-->
      <Equipment
        v-if="offering.equipment != undefined && offering.equipment != ''"
        :equipment="offering.equipment"
      ></Equipment>
      <!--END: Equipment-->

      <!--START: Features-->
      <TypeFeatures :offering="offering" :coachSlug="coach.slug"></TypeFeatures>
      <!--END: Features-->

      <!--START: Inclusions-->
      <Inclusions
        v-if="offering.inclusions.length > 0"
        :inclusions="offering.inclusions"
      ></Inclusions>
      <!--END: Inclusions-->

      <!--START: Highlights-->
      <Highlights
        v-if="offering.highlights.length > 0"
        :highlights="offering.highlights"
      ></Highlights>
      <!--END: Highlights-->

      <!--START: Testimonials-->
      <Testimonials
        v-if="offering.testimonials.length > 0"
        :testimonials="offering.testimonials"
        :coachName="coach.fullName"
      ></Testimonials>
      <!--END: Testimonials-->

      <!--START: FAQs-->
      <FAQs
        v-if="offering.faqs.length > 0"
        :faqs="offering.faqs"
        :coach="coach"
      ></FAQs>
      <!--END: FAQs-->

      <!--START: Video Player-->
      <VideoPlayer
        v-if="offering.coverVideoURL != undefined"
        :show="showOptions.videoPlayer"
        :videoLink="offering.coverVideoURL"
        @closePlayer="closeVideoPlayer"
      ></VideoPlayer>
      <!--END: Video Player-->

      <!--START: Internal Menu-->
      <InternalMenu :offering="offering"></InternalMenu>
      <!--END: Internal Menu-->

      <div v-if="coach.isSubscribed && coach.paymentsActive">
        <!--START: Price CTA-->
        <PriceBox
          class="price-box"
          :class="{ show: showOptions.priceBox }"
          :price="selectedVariant"
          :activatePayment="offering.activatePayment"
          :offeringType="offering.offeringType"
          @showBookingForm="showBookingForm"
        ></PriceBox>
        <!--END: Price CTA-->

        <!--START: Booking Form-->
        <BookingForm
          v-if="offering.activatePayment"
          :coach="coach"
          :offering="offering"
          :selectedVariant="selectedVariant"
          :selectedVariantIndex="selectedVariantIndex"
          :selectedSlot="selectedSlot"
          :show="showOptions.bookingForm"
          @updateBookingStatus="updateBookingStatus"
          @closeForm="closeBookingForm"
        ></BookingForm>
        <BookingDesktopForm
          :coach="coach"
          :offering="offering"
          :selectedVariant="selectedVariant"
          :selectedVariantIndex="selectedVariantIndex"
          :activatePayment="offering.activatePayment"
          @showBooking="showBookingForm"
        ></BookingDesktopForm>
        <!--END: Booking Form-->

        <!--START: Appointment Scheduler-->
        <AppointmentScheduler
          v-if="
            offering.offeringType == 'consultation-call' &&
            showAppointmentScheduler
          "
          :coachSlug="coach.slug"
          :consultationCall="offering.consultationCall"
          @slotBooked="appointmentSlotBooked"
        ></AppointmentScheduler>
        <!--END: Appointment Scheduler-->
      </div>
    </div>
    <PageLoader class="page-loader" v-else></PageLoader>
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";

//Importing CoachService
import CoachService from "@/controllers/CoachService";

//Import components
import PageLoader from "@/components/loaders/PageLoader";

import TypeHighlights from "@/components/Profile/Offerings/TypeHighlights";
import TypeFeatures from "@/components/Profile/Offerings/Features/Index";
import TypePreview from "@/components/Profile/Offerings/Preview/Index";

import Variants from "@/components/Profile/Offerings/Variants";
import Inclusions from "@/components/Profile/Offerings/Inclusions";
import Highlights from "@/components/Profile/Offerings/Highlights";
import Equipment from "@/components/Profile/Offerings/Equipment";
import Testimonials from "@/components/Profile/Offerings/Testimonials";
import FAQs from "@/components/Profile/Offerings/FAQs";
import PriceBox from "@/components/Profile/Offerings/PriceBox";
import VideoPlayer from "@/components/Profile/Offerings/VideoPlayer";

import InternalMenu from "@/components/Profile/Offerings/InternalMenu";

import BookingForm from "@/components/Profile/Offerings/BookingForm/Index";
import BookingDesktopForm from "@/components/Profile/Offerings/BookingForm/DesktopForm";

import AppointmentScheduler from "@/components/Profile/Offerings/AppointmentScheduler";

export default {
  name: "Offering",
  data() {
    return {
      offering: {},
      selectedVariant: null,
      selectedVariantIndex: -1,
      bookingInProgress: false,
      selectedSlot: {},
      showAppointmentScheduler: false,
      showOptions: {
        videoPlayer: false,
        bookingForm: false,
        variantsModal: false,
        priceBox: true,
        description: false,
        sampleWorkouts: false,
      },
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
  components: {
    PageLoader,
    TypeHighlights,
    TypeFeatures,
    TypePreview,
    Variants,
    Inclusions,
    Highlights,
    Equipment,
    Testimonials,
    FAQs,
    PriceBox,
    VideoPlayer,
    BookingForm,
    BookingDesktopForm,
    InternalMenu,
    AppointmentScheduler,
  },
  //Check for changes
  beforeRouteLeave(to, from, next) {
    if (
      this.showOptions.videoPlayer ||
      this.showOptions.variantsModal ||
      this.showOptions.sampleWorkouts ||
      (!this.bookingInProgress && this.showOptions.bookingForm)
    ) {
      this.toggleSampleWorkouts(false);
      this.closeBookingForm();
      this.closeVariantsModal();
      this.showOptions.videoPlayer = false;
      next(false);
    } else if (this.bookingInProgress) {
      next(false);
    } else {
      next();
    }
  },
  async created() {
    //Get coach and change meta details
    if (_.isEmpty(this.coach)) {
      this.coach = await this.getCoach();
    }

    this.getOffering();
  },
  methods: {
    async getOffering() {
      const offeringSlug = this.$route.params.offering;

      this.offering = await CoachService.GetOffering({
        offeringSlug: offeringSlug,
        coachSlug: this.coach.slug,
      });

      this.initVariant();

      this.meta.title = `${this.offering.title} | ${this.coach.fullName} - ${this.coach.coverTitle}`;
      this.meta.ogTitle = this.offering.title;
      this.meta.ogDescription = this.offering.description;
      this.meta.ogImage = this.offering.coverImageURL;

      //User Insights: Extacting user data for insights
      const isUniqueVisitor = !this.hasUserVisitedOffering(offeringSlug);
      CoachService.UpdateOfferingView({
        offeringSlug: offeringSlug,
        coachSlug: this.coach.slug,
        isUniqueVisitor: isUniqueVisitor,
      });
    },

    initVariant() {
      if (this.offering.price.variants.length) {
        this.selectedVariantIndex = 0;
        this.selectedVariant = this.offering.price.variants[0];
      } else {
        this.selectedVariant = {
          originalPrice: this.offering.price.originalPrice,
          discountedPrice: this.offering.price.discountedPrice,
        };
      }
    },

    changeVariant(newVariant, index) {
      this.selectedVariantIndex = index;
      this.selectedVariant = newVariant;
    },

    showVariantsModal() {
      this.showOptions.variantsModal = true;
      this.showOptions.priceBox = false;
    },

    closeVariantsModal() {
      this.showOptions.variantsModal = false;
      this.showOptions.priceBox = true;
    },

    showVideoPlayer() {
      if (this.offering.coverVideoURL != undefined)
        this.showOptions.videoPlayer = true;
    },

    closeVideoPlayer() {
      this.showOptions.videoPlayer = false;
    },

    toggleDescription() {
      this.showOptions.description = !this.showOptions.description;
    },

    appointmentSlotBooked(selectedSlot) {
      this.selectedSlot = selectedSlot;
      this.showBookingForm();
    },

    showBookingForm() {
      if (
        this.offering.offeringType == "consultation-call" &&
        _.isEmpty(this.selectedSlot)
      ) {
        this.showAppointmentScheduler = true;
      } else if (this.offering.activatePayment) {
        this.showAppointmentScheduler = false;
        this.showOptions.bookingForm = true;

        //User Insights: Extacting user data for insights
        CoachService.UpdateBookingAttempt({
          offeringSlug: this.offering.slug,
          coachSlug: this.coach.slug,
        });
      }
    },

    closeBookingForm() {
      this.showOptions.bookingForm = false;
    },

    toggleSampleWorkouts(value) {
      this.showOptions.sampleWorkouts = value;
    },

    updateBookingStatus(status) {
      this.bookingInProgress = status;
    },
  },
};
</script>

<style scoped lang="scss">
.page-loader /deep/ {
  .buffer-hero {
    padding: 2rem;
  }
  .buffer-page-image {
    display: none;
  }
}
.offering {
  padding-bottom: 6rem;
}

.price-box {
  display: none;

  &.show {
    display: flex;
  }
}

.header-wrapper {
  background-color: $blackColor;
  position: relative;
  z-index: 10;
  padding: 0.55rem 1rem;
  border-bottom: 1px solid lighten($blackColor, 5%);
  display: flex;
  flex-direction: row;
  align-items: center;

  .filler {
    flex-grow: 1;
  }

  .btn {
    color: lighten($blackColor, 50%);
    border: 1px solid lighten($blackColor, 30%);

    /deep/ .unicon svg {
      height: auto;
      width: 1.5rem;
      fill: lighten($blackColor, 50%);
    }

    &:hover {
      background-color: var(--brand-color);
      color: var(--brand-color-dark-50);
      border-color: var(--brand-color-dark-20);

      /deep/ .unicon svg {
        fill: var(--brand-color-dark-50);
      }
    }
  }
}

.go-back {
  text-decoration: none;
  border: none;
  line-height: 1;
  color: $whiteColor;
  display: flex;
  flex-direction: row;
  align-items: center;
  float: left;

  /deep/ .unicon svg {
    height: auto;
    width: 1.5rem;
    fill: var(--brand-color);
  }

  span {
    font-size: $smallerFontSize;
    color: $whiteColor;
    opacity: $lightOpacity;
  }
}

.hero-wrapper {
  background-color: $blackColor;
  padding: 0.75rem 1.5rem 2rem;
  margin-bottom: 1.5rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  // box-shadow: 0 0 2.7rem -0.15rem rgb(20, 20, 20);
}

.sub-title {
  color: $whiteColor;
  font-size: $normalFontSize;
  font-weight: $mediumFontWeight;
}

.cover-image-wrapper {
  position: relative;
  margin-left: -1rem;
  width: calc(100% + 2rem);

  .cover-image {
    display: block;
    width: 100%;
    border-radius: 1rem;
  }

  &.extend {
    padding-bottom: 3rem;
  }
}

.video-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;

  .unicon {
    margin-right: 0.5rem;

    /deep/ svg {
      fill: var(--brand-color);
      background-color: rgba(39, 39, 39, 1);
      height: auto;
      width: 1.75rem;
      padding: 0.5rem;
      border-radius: 50%;
    }
  }

  .video-info {
    span {
      display: block;
      color: $whiteColor;
      opacity: 0.65;
      font-size: $smallestFontSize;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
    }

    h3 {
      color: $whiteColor;
      font-size: 1rem;
      font-weight: $mediumFontWeight;
      opacity: 0.85;
    }
  }

  &.float {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 3rem 1rem 0.75rem;
    width: calc(100% - 2rem);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #181818 50%);
  }
}

.title-info-wrapper {
  position: relative;
  margin: 1rem 0 0;

  .title {
    font-size: 1.25rem;
    font-weight: $mediumFontWeight;
    color: $whiteColor;
    margin-bottom: 0;
  }
}

.description-wrapper {
  position: relative;
  margin: 0.5rem 1.5rem 3rem;

  .read-more-btn {
    position: absolute;
    cursor: pointer;
    font-size: $smallFontSize;
    color: var(--brand-color);
    bottom: 0;
    left: 0;
    z-index: 5;
  }

  .description {
    position: relative;
    max-height: 20vh;
    overflow: hidden;
    padding-bottom: 1rem;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 8rem;
      z-index: 1;
      background: linear-gradient(
        to bottom,
        rgba(39, 39, 39, 0) 0%,
        #272727 90%
      );
    }

    &.show {
      max-height: none;

      &::before {
        background: none;
      }
    }

    /deep/ {
      * {
        font-size: $normalFontSize;
        color: darken($whiteColor, 18%) !important;
      }

      p,
      li {
        line-height: 1.4;
      }

      ul {
        margin-left: 1rem;
      }

      li {
        position: relative;
        margin-bottom: 1rem;

        &::before {
          position: absolute;
          display: block;
          content: "";
          height: 6px;
          top: 0.25rem;
          left: -1rem;
          width: 6px;
          border-radius: 50%;
          background-color: var(--brand-color);
        }
      }

      h3,
      h4,
      h5,
      h6 {
        color: $whiteColor !important;
        font-size: $mediumFontSize;
        * {
          color: $whiteColor !important;
          font-size: $mediumFontSize;
        }
      }
    }
  }
}

/deep/ {
  .offering-type-highlights {
    .highlights-list {
      display: none;
    }
  }
}

.page-loader /deep/ {
  .buffer-hero {
    .buffer-line {
      height: 3rem;
      margin-bottom: 0.75rem;
    }
  }
}

//Light Theme styles
.light-theme {
  .offering {
    background: #f7f7f7;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 15rem;
      background-color: var(--brand-color);
      background-image: url("/assets/images/light-theme/cover-bg.jpg");
      background-repeat: no-repeat;
      background-size: 100% 110%;
      background-blend-mode: darken;
      margin-top: -1.5rem;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 11rem;
      left: 0;
      width: 100%;
      height: 3rem;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      background: #f7f7f7;
    }
  }

  .cover-image {
    border: 5px solid #ffffff;
    box-shadow: 0 0.5rem 0.7rem -0.5rem #b4b4b4;
    width: calc(100% - 10px);
  }

  .hero-wrapper-block {
    position: relative;
    z-index: 1;
  }

  .header-wrapper {
    position: relative;
    background: #eee;
    // margin: 1rem 1rem 0.5rem;
    // border-radius: 0.5rem;
    width: calc(100% - 2rem);
    border: 1px solid #e3e3e3;

    .btn {
      border-color: #cecece;
    }

    .go-back span {
      color: lighten($blackColor, 5%);
    }
  }

  .hero-wrapper {
    position: relative;
    z-index: 11;
    background-color: $lightWhiteColor;
    box-shadow: none;
    padding-bottom: 1rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: transparent;

    &::before {
      content: "";
      background-color: darken($whiteColor, 11%);
      position: absolute;
      height: 1px;
      bottom: -0.35rem;
      left: 1.5rem;
      width: calc(100% - 3rem);
    }
  }

  .video-wrapper .unicon /deep/ svg {
    fill: $whiteColor;
    background-color: var(--brand-color);
  }

  .title {
    color: $blackColor;
  }

  .sub-title {
    color: lighten($blackColor, 45%);
  }

  .description {
    &::before {
      background: linear-gradient(
        to bottom,
        rgba(247, 247, 247, 0) 0%,
        #f7f7f7 90%
      );
    }

    /deep/ {
      * {
        color: lighten($blackColor, 20%) !important;
      }

      h3,
      h4,
      h5,
      h6 {
        color: $blackColor !important;
        * {
          color: $blackColor !important;
        }
      }
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .offering-info-column {
    margin: 0;
  }

  .header-wrapper {
    position: fixed !important;
    top: 0;
    width: calc(100% - 2rem);

    .btn-small {
      font-size: $smallFontSize;
      padding: 0.75rem 1rem;
    }
  }

  .hero-wrapper {
    padding: 5.5rem 0 2rem;

    .cover-image-wrapper {
      margin-left: 1rem;
      width: calc(100% - 2rem);
    }
  }

  .hero-wrapper-block,
  .offering-type-preview,
  .description-wrapper,
  .equipments-wrapper,
  .offering-type-features,
  .offering-inclusions,
  .offering-highlights,
  .transformations-wrapper,
  .offering-faqs {
    width: 42vw;
    margin-left: 13.5vw;
  }

  .details-only {
    .hero-wrapper-block,
    .offering-type-preview,
    .description-wrapper,
    .equipments-wrapper,
    .offering-type-features,
    .offering-inclusions,
    .offering-highlights,
    .transformations-wrapper,
    .offering-faqs {
      width: 50%;
      margin: auto;
    }
  }

  .transformations-wrapper {
    position: relative;
    z-index: 2;
    padding-left: 0;
    padding-right: 0;
  }

  .video-wrapper {
    &.float {
      width: calc(100% - 3rem);
      padding: 3rem 1.5rem 1rem;
    }

    .unicon {
      margin-right: 1rem;
      /deep/ svg {
        width: 2rem;
      }
    }

    .video-info {
      h3 {
        font-size: 1rem;
      }
    }
  }

  .cover-image-wrapper.extend {
    border: 1px solid lighten($blackColor, 0%);
    overflow: hidden;
    border-radius: 1.5rem;

    &:hover {
      cursor: pointer;
      border: 1px solid lighten($blackColor, 15%);

      .video-info {
        h3 {
          opacity: 1;
          color: var(--brand-color);
        }
      }
    }
  }

  .title-main-wrapper {
    position: relative;
  }

  .title-info-wrapper {
    .title {
      width: calc(100% - 10rem);
      font-size: $largerFontSize;
      line-height: 1.2;
    }
  }

  /deep/ {
    .offering-type-highlights {
      height: auto;

      .title {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5rem;
        border: 1px solid lighten($blackColor, 50%);
        border-radius: 0.5rem;
      }

      .highlights-list {
        margin-top: 0.5rem;
      }
    }
  }

  .description-wrapper {
    margin-top: 3rem;

    .sub-title {
      font-size: 1.05rem;
    }
  }

  //Light theme
  .light-theme {
    .offering {
      &::before {
        display: none;
      }
    }

    .header-wrapper {
      left: 0;
      top: 0;
      width: calc(100% - 2rem);
      margin: 0;
      border-radius: 0;
    }

    .hero-wrapper {
      z-index: 2;
      padding: 6rem 0 3rem;
      background: #fff;
      border-bottom-left-radius: 2rem;
      border-bottom-right-radius: 2rem;
      box-shadow: 0 0 1.7rem -0.15rem #b4b4b4;

      .cover-image-wrapper {
        box-shadow: 0 -1rem 0.7rem -0.15rem rgba(41, 41, 41, 0.35);
        margin-left: 0;
        width: 100%;
      }

      &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 15rem;
        background-color: var(--brand-color);
        background-image: url("/assets/images/light-theme/cover-bg.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
        background-blend-mode: darken;
        margin-top: -1.5rem;
      }

      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 12rem;
        left: 0;
        width: 100%;
        height: 3rem;
        background-color: $whiteColor;
        border-top-left-radius: 2rem;
        border-top-right-radius: 2rem;
      }
    }
  }
}
</style>