<template>
  <!--START: Profile Wrapper-->
  <div v-if="coach.fullName != undefined" class="plan-wrapper">
    <div class="plan-block-wrapper" :class="{ blur: showModal }">
      <router-link
        class="go-back"
        :to="`/${!$store.state.isSubDomain ? coach.slug + '/' : ''}`"
      >
        <unicon name="angle-left"></unicon>
        <span>Back To Plans</span>
      </router-link>

      <div class="plan-intro-wrapper">
        <img :src="plan.coverImageURL" class="cover-image" :alt="plan.title" />

        <div class="cover-wrapper">
          <div class="intro-wrapper">
            <span class="coach-name">{{ coach.fullName }}</span>
            <h3 class="plan-title">
              {{ plan.title }}
            </h3>
            <span class="plan-schedule" v-if="plan.schedule != undefined">
              <unicon name="clock"></unicon>
              <em>{{ plan.schedule }}</em>
            </span>
          </div>
          <div class="price-wrapper">
            <div
              v-if="
                plan.isDiscountedPlan != undefined &&
                plan.isDiscountedPlan == true
              "
            >
              <span class="plan-price slashed-price">
                ₹<em>{{ convertToIndianNumber(plan.planPrice) }}</em>
              </span>
              <span class="plan-price">
                ₹<em>{{ convertToIndianNumber(plan.discountedPrice) }}</em>
              </span>
            </div>
            <div v-else>
              <span class="plan-price">
                ₹<em>{{ convertToIndianNumber(plan.planPrice) }}</em>
              </span>
            </div>
            <span
              class="plan-date"
              v-if="plan.hasDates == true && plan.startDate != undefined"
              >Starts {{ convertToMonthDate(plan.startDate) }}</span
            >
            <span
              class="plan-date"
              v-else-if="
                plan.isMonthlyPlan != null &&
                plan.planDuration != null &&
                plan.isMonthlyPlan == false
              "
              >{{ plan.planDuration }}</span
            >
            <span class="plan-date" v-else-if="plan.hasDates == false"
              >Per Month</span
            >
            <span class="plan-date" v-else></span>
          </div>
        </div>
      </div>

      <div class="details-wrapper">
        <div v-if="plan.hasAttachments" class="attachment-wrapper">
          <unicon name="paperclip"></unicon>
          <div>
            <h3>This plan has attachments</h3>
            <p>You will receive them on your e-mail after signing up</p>
          </div>
        </div>
        <label class="label-small">About This Plan</label>
        <div class="plan-description" v-html="plan.description"></div>
        <div
          v-if="
            plan.highlights.list != undefined && plan.highlights.list.length > 0
          "
        >
          <div class="highlights-wrapper">
            <label class="label-small">{{ plan.highlights.title }}</label>
            <div
              class="highlight-item"
              v-for="highlight in plan.highlights.list"
              :key="highlight._id"
            >
              <unicon name="check"></unicon>
              <span>{{ highlight.title }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="plan.equipment != undefined && plan.equipment != ''"
          class="equipments-wrapper"
        >
          <label class="label-small">Equipment</label>
          <div class="equipment-details">
            <unicon name="dumbbell"></unicon>
            <p>{{ plan.equipment }}</p>
          </div>
        </div>
      </div>
    </div>

    <!--START: CTA Plan-->
    <div v-if="this.isMobile()" class="cta-sticky-wrapper">
      <div class="cta-sticky-info">
        <div class="price-wrapper">
          <div
            v-if="
              plan.isDiscountedPlan != undefined &&
              plan.isDiscountedPlan == true
            "
          >
            <span class="plan-price">
              ₹<em>{{ convertToIndianNumber(plan.discountedPrice) }}</em>
            </span>
            <span class="plan-price slashed-price">
              ₹<em>{{ convertToIndianNumber(plan.planPrice) }}</em>
            </span>
          </div>
          <div v-else>
            <span class="plan-price">
              ₹<em>{{ convertToIndianNumber(plan.planPrice) }}</em>
            </span>
          </div>
        </div>
        <span class="plan-date" v-if="plan.hasDates == true"
          >Starts {{ convertToMonthDate(plan.startDate) }}</span
        >
        <span
          class="plan-date"
          v-else-if="
            plan.isMonthlyPlan != null &&
            plan.planDuration != null &&
            plan.isMonthlyPlan == false
          "
          >{{ plan.planDuration }}</span
        >
        <span class="plan-date" v-else>Per Month</span>
      </div>
      <button class="btn btn-primary btn-book" @click="showBookingModal">
        Book Now
      </button>
    </div>
    <!--END: CTA Plan-->

    <!--START: Booking Modal-->
    <BookingModal
      :plan="plan"
      :coach="coach"
      :show="isMobile() ? showModal : true"
    ></BookingModal>
    <div
      class="bg-overlay"
      :class="{ show: showModal }"
      @click="closeModal"
    ></div>
    <!--END: Booking Modal-->
  </div>
</template>

<script>
//Import components
import BookingModal from "@/components/Profile/CoachBookingModal";

export default {
  name: "Plan",
  data() {
    return {
      showModal: false,
      plan: {},
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
    BookingModal,
  },
  async created() {
    this.getPlan();
  },
  methods: {
    async getPlan() {
      const planID = this.$route.params.plan;
      this.plan = this.coach.plans.find((plan) => plan._id === planID);

      this.meta.title = `${this.plan.title} | ${this.coach.fullName} - ${this.coach.coverTitle}`;
      this.meta.ogTitle = this.plan.title;
      this.meta.ogDescription = this.plan.description;
      this.meta.ogImage = this.plan.coverImageURL;
    },

    showBookingModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped lang="scss">
.bg-overlay.show {
  z-index: 4;
}

.plan-block-wrapper {
  transition: all 0.3s;
  padding-top: 3rem;
  filter: blur(0);

  &.blur {
    filter: blur(3px);
  }
}

.plan-wrapper {
  padding-bottom: 7rem;
}

.go-back {
  text-decoration: none;
  border: none;
  line-height: 1;
  color: $whiteColor;
  background-color: $blackColor;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid lighten($blackColor, 5%);
  width: calc(100% - 2rem);
  display: flex;
  flex-direction: row;
  align-items: center;

  /deep/ .unicon svg {
    height: auto;
    width: 1.5rem;
    fill: var(--brand-color);
  }

  span {
    color: $whiteColor;
    opacity: $lightOpacity;
    margin-top: -0.15rem;
  }
}

.coach-plan {
  background-color: #1e1e1e;
}

.label-small {
  font-size: $smallerFontSize;
  margin-bottom: 0.75rem;
}

.cover-image {
  width: calc(100% - 1rem);
  margin: 1rem 0.5rem 0.5rem;
  border-radius: 1rem;
}

.cover-wrapper {
  margin: 0 1rem;
  // border-bottom: 1px solid lighten($blackColor, 10%);
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.plan-intro-wrapper {
  background-color: $blackColor;
  padding: 0 0.5rem 1.5rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
}

.intro-wrapper {
  flex: 1;
  margin-right: 2rem;

  .coach-name {
    position: relative;
    display: table;
    background-color: var(--brand-color);
    font-size: $smallerFontSize;
    font-weight: $mediumFontWeight;
    padding: 0.55rem 0.75rem;
    border-radius: 0.75rem;
    margin-top: -1.5rem;
    margin-bottom: 0.5rem;
  }

  .plan-title {
    font-size: $mediumFontSize;
    text-transform: capitalize;
    color: $whiteColor;
    line-height: 1.1;
    margin-left: 0.15rem;
  }

  .plan-dates {
    color: $whiteColor;
    opacity: $lightOpacity;
  }
}

.price-wrapper {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  text-align: right;
}

.plan-date {
  display: block;
  font-size: $smallestFontSize;
  color: $lightWhiteColor;
  opacity: $lightOpacity;
  margin-top: 0.25rem;
}

.plan-price {
  font-size: $smallFontSize;
  font-weight: $mediumFontWeight;
  display: block;
  color: $whiteColor;

  em {
    font-size: $normalFontSize;
    margin-left: 0.15rem;
  }

  &.slashed-price {
    opacity: $lightOpacity;
    text-decoration: line-through;
    margin-top: 0.15rem;

    em {
      font-size: $smallerFontSize;
    }
  }
}

.details-wrapper {
  margin: 2rem 1.5rem 0;

  .plan-description,
  .plan-description /deep/ *,
  .plan-description /deep/ {
    font-size: $smallFontSize;
    color: $whiteColor;
    line-height: 1.5;
    margin-bottom: 0.75rem;

    b,
    strong {
      font-weight: 900;
    }

    i,
    em {
      font-style: italic;
    }

    ul,
    ol {
      margin-left: 1.5rem !important;
    }

    ul li {
      list-style: disc !important;
    }

    ol li {
      list-style: decimal !important;
    }
  }
}

.highlights-wrapper {
  border: 1px solid lighten($blackColor, 19%);
  background-color: lighten($blackColor, 15%);
  padding: 1rem;
  border-radius: 0.75rem;
  margin-top: 2rem;
}

.highlight-item {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin-bottom: 1rem;

  /deep/ .unicon svg {
    fill: darken($greenColor, 35%);
    background-color: $greenColor;
    height: auto;
    width: 1rem;
    border-radius: 50%;
    margin-right: 0.75rem;
    margin-top: 0.25rem;
  }

  span {
    font-size: $smallFontSize;
    color: $whiteColor;
    opacity: $mediumOpacity;
    line-height: 1.4;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.equipments-wrapper {
  margin-top: 2rem;
}

.equipment-details {
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;

  .unicon /deep/ svg {
    background-color: var(--brand-color);
    fill: var(--brand-color-dark-35);
    width: 1.1rem;
    padding: 0.25rem;
    height: auto;
    border-radius: 0.5rem;
    margin-right: 1rem;
  }

  p {
    color: $whiteColor;
    opacity: $mediumOpacity;
    font-size: $smallFontSize;
  }
}

.cta-sticky-wrapper {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 1.5rem;
  bottom: 0;
  left: 0;
  width: calc(100% - 3rem);
  background-color: $blackColor;
  box-shadow: 0 -0.15rem 1rem 0.8rem rgba(51, 51, 51, 0.6);
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}
.cta-sticky-info {
  display: block;
  flex: 1;

  .price-wrapper {
    text-align: left;

    .plan-price {
      display: inline-block;
      vertical-align: bottom;
      margin-right: 0.5rem;

      &:not(.slashed-price) em {
        font-size: $mediumFontSize;
      }
    }
  }

  .plan-dates {
    display: block;
    font-size: $smallestFontSize;
    color: $whiteColor;
    opacity: $lightOpacity;
    margin-top: 0.35rem;
  }
}

.plan-schedule {
  display: block;
  margin-top: 0.75rem;
  color: $whiteColor;

  /deep/ .unicon svg {
    display: inline-block;
    vertical-align: topp;
    width: 1rem;
    height: auto;
    fill: $purpleColor;
    margin-right: 0.5rem;
  }

  em {
    width: calc(100% - 2rem);
    display: inline-block;
    vertical-align: top;
    font-size: $smallFontSize;
    opacity: $lightOpacity;
  }
}

.btn-book {
  position: relative;
  z-index: 10;
}

.attachment-wrapper {
  border: 1px solid lighten($blackColor, 19%);
  background-color: lighten($blackColor, 15%);
  padding: 1rem;
  border-radius: 0.75rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  .unicon /deep/ svg {
    fill: var(--brand-color);
    width: 2rem;
    height: auto;
    margin-right: 0.75rem;
  }

  h3 {
    font-size: $smallFontSize;
    color: $whiteColor;
  }

  p {
    font-size: $smallerFontSize;
    color: $whiteColor;
    opacity: $lightOpacity;
  }
}

//Light Theme styles
.light-theme {
  .plan-intro-wrapper {
    background-color: $whiteColor;
    box-shadow: 0 0.5rem 0.9rem -0.1rem rgba(0, 0, 0, 0.15);
  }

  .coach-name {
    color: $whiteColor;
  }

  .go-back {
    background-color: darken($whiteColor, 2%);
    border-color: darken($whiteColor, 5%);

    span {
      color: $blackColor;
      opacity: $lightOpacity;
    }
  }

  .equipment-details .unicon /deep/ svg {
    fill: $whiteColor;
  }

  .highlights-wrapper {
    border: 1px solid #e2e2e2;
    background-color: $whiteColor;

    .highlight-item span {
      color: $blackColor;
      opacity: $lightOpacity;
    }
  }

  .equipment-details p,
  .plan-price,
  .plan-date,
  .plan-schedule,
  .plan-title,
  .details-wrapper .plan-description,
  .details-wrapper .plan-description /deep/ * {
    color: $blackColor;
  }

  .details-wrapper .plan-description,
  .details-wrapper .plan-description /deep/ * {
    color: lighten($blackColor, 10%);
    line-height: 1.4;
  }

  .cta-sticky-wrapper {
    background-color: $whiteColor;
    box-shadow: 0 0 1rem -0.1rem rgb(210, 210, 210);
  }

  .plan-title {
    font-weight: 500;
  }

  .plan-price:not(.slashed-price) em {
    font-size: 1.1rem;
  }

  .slashed-price,
  .plan-schedule {
    opacity: $mediumOpacity;
  }

  .attachment-wrapper {
    border: 1px solid #e2e2e2;
    background-color: $whiteColor;

    h3 {
      color: $blackColor;
    }

    p {
      color: $blackColor;
      opacity: $lightOpacity;
    }
  }
}

@media screen and (min-width: $mobileWidth) {
  .plan-intro-wrapper {
    padding-left: 15%;
    padding-right: 45%;
  }

  .details-wrapper {
    margin-left: 16%;
    width: 39%;

    .plan-description,
    .plan-description /deep/ * {
      font-size: $normalFontSize;
      line-height: 1.6;
    }
  }

  .highlights-wrapper {
    margin: 3rem 0;
  }

  .cover-image {
    margin-top: 2rem;
  }

  .intro-wrapper {
    .plan-title {
      font-size: $largeFontSize;
    }
  }

  .plan-price {
    em {
      font-size: $mediumFontSize;
    }
  }
}
</style>