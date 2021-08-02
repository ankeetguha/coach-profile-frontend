<template>
  <!--START: Profile Wrapper-->
  <div v-if="coach.fullName != undefined" class="plan-wrapper">
    <!--START: Vue Headful-->
    <vue-headful :title="meta.title" :description="meta.description" />
    <!--END: Vue Headful-->

    <div class="plan-block-wrapper" :class="{ blur: showModal }">
      <router-link class="go-back" :to="`/${coach.slug}`">
        <unicon name="angle-left"></unicon>
        <span>Back To Plans</span>
      </router-link>

      <div class="plan-intro-wrapper">
        <img :src="plan.coverImageURL" class="cover-image" :alt="plan.title" />

        <div class="cover-wrapper">
          <div class="intro-wrapper">
            <span class="coach-name">Coach {{ coach.fullName }}</span>
            <h3 class="plan-title">
              {{ plan.title }}
            </h3>
            <span
              v-if="plan.hasDates != undefined && plan.hasDates == true"
              class="plan-dates"
              >From {{ plan.startDate }}
              <span v-if="plan.endDate != undefined"
                >till - {{ plan.endDate }}</span
              ></span
            >
            <span v-else class="plan-dates"> Monthly Batches </span>
          </div>
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
        </div>
      </div>

      <div class="details-wrapper">
        <label class="label-small">About This Plan</label>
        <p class="plan-description">{{ plan.description }}</p>

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
    <div class="cta-sticky-wrapper">
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
        <span
          v-if="plan.hasDates != undefined && plan.hasDates == true"
          class="plan-dates"
        ></span>
        <span v-else class="plan-dates"> Monthly Batches </span>
      </div>
      <button class="btn btn-primary" @click="showBookingModal">
        Book Now
      </button>
    </div>
    <!--END: CTA Plan-->

    <!--START: Booking Modal-->
    <BookingModal :plan="plan" :coach="coach" :show="showModal"></BookingModal>
    <div
      class="bg-overlay"
      :class="{ show: showModal }"
      @click="closeModal"
    ></div>
    <!--END: Booking Modal-->
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";

//Import components
import BookingModal from "@/components/Profile/CoachBookingModal";

export default {
  name: "Plan",
  data() {
    return {
      coach: {},
      showModal: false,
      meta: {
        title: "Skipper Coach",
        description:
          "Skipper helps you find the best personal trainers and coaches to help you meet your fitness goals from home. We've got coaches for S&C, Yoga, Weight Training, Nutrition and more.",
      },
      plan: null,
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
      //Get coach and change meta details
      const slug = this.$route.params.slug;
      if (_.isEmpty(this.coach)) {
        this.coach = await this.getCoach({ slug: slug });
      }

      const planID = this.$route.params.plan;
      console.log(planID);
      this.plan = this.coach.plans.find((plan) => plan._id === planID);
      this.meta.title = `Coach ${this.coach.fullName} - ${this.coach.coverTitle}`;
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
    fill: $purpleColor;
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
  width: calc(100% - 2rem);
  margin: 1rem;
  border-radius: 1rem;
}

.cover-wrapper {
  margin: 0 1rem;
  // border-bottom: 1px solid lighten($blackColor, 10%);
  display: flex;
  flex-direction: row;
  align-items: center;
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

  .coach-name {
    position: relative;
    display: table;
    background-color: $purpleColor;
    font-size: $smallerFontSize;
    padding: 0.55rem 0.75rem;
    border-radius: 0.75rem;
    margin-top: -2rem;
    margin-bottom: 0.5rem;
  }

  .plan-title {
    font-size: $mediumFontSize;
    color: $whiteColor;
    margin-left: 0.15rem;
    margin-bottom: 0.15rem;
  }

  .plan-dates {
    color: $whiteColor;
    opacity: $lightOpacity;
  }
}

.price-wrapper {
  margin-right: 0.5rem;
  text-align: right;
}

.plan-price {
  font-size: $smallFontSize;
  font-weight: $mediumFontWeight;
  display: block;
  color: $whiteColor;

  em {
    font-size: $mediumFontSize;
    margin-left: 0.15rem;
  }

  &.slashed-price {
    opacity: $lightOpacity;
    text-decoration: line-through;
    margin-top: 0.15rem;

    em {
      font-size: $normalFontSize;
    }
  }
}

.details-wrapper {
  margin: 2rem 1.5rem 0;

  .plan-description {
    font-size: $smallFontSize;
    color: $whiteColor;
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
    background-color: $purpleColor;
    fill: darken($purpleColor, 35%);
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
  box-shadow: inset 0 0 50px rgba(183, 183, 183, 0.15);
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
</style>