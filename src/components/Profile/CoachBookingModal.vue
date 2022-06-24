<template>
  <div class="plan-book-modal" :class="{ show: showModal }">
    <div class="rel-wrapper">
      <span class="coach-name">{{ coach.fullName }}</span>

      <!--START: Booking Form-->
      <div class="plan-book-container">
        <div class="booking-modal-wrapper">
          <div class="intro-wrapper">
            <h3 class="plan-title">{{ plan.title }}</h3>

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
              >Monthly Plan</span
            >
            <span class="plan-date" v-else></span>
          </div>

          <div v-if="!coach.isSubscribed || !coach.paymentsActive" class="price-wrapper">
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
        </div>
        <!--END: Booking Form-->
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "CoachBooking",
  props: {
    coach: Object,
    plan: Object,
    show: Boolean,
  },

  watch: {
    show: function (val) {
      if (val) setTimeout(() => (this.showModal = true), 10);
      else this.showModal = false;
    },
  },

  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bg-overlay {
  display: none;
  &.show {
    display: block;
  }
}
.plan-book-modal {
  transition: all 0.3s;
  background-color: $blackColor;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 2rem 1.25rem 1rem;
  width: calc(100% - 2.5rem);
  max-height: calc(100vh - 10rem);
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  box-shadow: 0 -1rem 0.7rem -0.15rem rgba(41, 41, 41, 0.35);
  transform: translateY(calc(100vh + 3rem));
  z-index: 5;

  &::before {
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
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
  }

  &.show {
    transform: translateY(0);
  }
}

.plan-book-container {
  overflow-y: scroll;
  height: calc(100vh - 15rem);
  padding-bottom: 5rem;
}

.booking-modal-wrapper {
  border-bottom: 1px solid lighten($blackColor, 10%);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
}

form {
  margin: 1rem 0 0;
}

.plan-title {
  color: $whiteColor;
  font-size: $mediumFontSize;
  text-transform: capitalize;
  line-height: 1.1;
  margin-top: 0.75rem;
}

.plan-date {
  display: block;
  font-size: $smallerFontSize;
  color: $lightWhiteColor;
  opacity: $lightOpacity;
  margin-top: 0.25rem;
}

.price-wrapper {
  margin-right: 0.5rem;
  text-align: right;
}

.intro-wrapper {
  flex: 1;
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

.coach-name {
  position: relative;
  display: table;
  background-color: var(--brand-color);
  font-size: $smallerFontSize;
  font-weight: $mediumFontWeight;
  padding: 0.55rem 0.75rem;
  border-radius: 0.75rem;
  margin-top: -2.5rem;
  margin-bottom: 0.05rem;
}

.btn-container {
  background-color: lighten($blackColor, 3%);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.btn-primary {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
}

.attachments-wrapper {
  margin: 0 1rem 1rem;
  display: none;

  &.show {
    display: flex;
  }
}

.client-login-wrapper {
  margin: 0 1rem 1rem;
  display: none;

  p {
    flex: 1;
    color: $whiteColor; 
    opacity: .75;
  }

  .btn {
    text-align: center;
    width: 5rem;
    margin-left: 1rem;
  }

  &.show {
    display: flex;
  }
}

.attachments-file-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 2rem;
  }
  label {
    display: block;
    color: $whiteColor;
    margin: 0 0.5rem;
    flex: 1;
    width: 100%;
  }
  .btn {
    text-align: center;
    width: auto;
  }
}

.email-attachments-wrapper {
  border: 1px solid #444;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: lighten($blackColor, 5%);

  .email-attachments-file {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
    label {
      display: block;
      color: $whiteColor;
      margin: 0 0.5rem;
      flex: 1;
      width: 100%;
    }
  }

  .email-attachments-info {
    color: darken($whiteColor, 10%);
    line-height: 1.4;
    border-top: 1px dashed #ececec;
    padding-top: 1rem;

    span {
      font-size: $smallerFontSize;
      font-weight: $mediumFontWeight;
      display: inline-block;
      padding: 0.05rem 0.25rem;
      border-radius: 0.25rem;
      background-color: $yellowColor;
      color: darken($yellowColor, 45%);
    }
  }
}

//Light Theme styles
.light-theme {
  .plan-book-modal {
    background-color: $whiteColor;
    border: 1px solid #d8d8d8;
    box-shadow: 0 1rem 1.5rem -0.1rem #cecece;
  }

  .plan-title {
    color: $blackColor;
    font-weight: 500;
  }

  .plan-price,
  .plan-date {
    color: $blackColor;
  }

  .slashed-price {
    opacity: $lightOpacity;
  }

  .booking-modal-wrapper {
    padding-bottom: 1rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .coach-name {
    color: $whiteColor;
  }

  .payment-ssl-info {
    color: $blackColor;
  }

  .btn-container {
    background-color: $whiteColor;
  }

  .payment-summary {
    background-color: $whiteColor;
    border: 1px solid darken($whiteColor, 10%);
    .price-wrapper label {
      color: $blackColor;
      opacity: $lightOpacity;
    }

    .total-price-wrapper {
      border-top-color: #ececec;
    }
  }

  .attachments-file-wrapper {
    label {
      color: $blackColor;
    }
  }

  .email-attachments-wrapper {
    background-color: darken($whiteColor, 5%);
    border-color: #ececec;

    .email-attachments-file label {
      font-weight: $mediumFontWeight;
      color: lighten($blackColor, 5%);
    }

    .email-attachments-info {
      color: lighten($blackColor, 15%);
      border-color: #cecece;
    }
  }
}

@media screen and (min-width: $mobileWidth) {
  .status-message {
    text-align: center;
  }

  .success-form {
    padding: 1rem 1rem 0;
  }

  .plan-book-modal {
    transform: none;
    bottom: auto;
    left: auto;
    right: 10%;
    top: 5rem;
    padding: 0;
    border-radius: 1.5rem;
    border: 1px solid lighten($blackColor, 5%);
    box-shadow: 0 0 1.5rem -0.1rem #181818;
    width: calc(30%);

    &::before {
      display: none;
    }
  }

  .price-wrapper,
  .coach-name {
    display: none;
  }

  .booking-modal-wrapper {
    margin-bottom: 0;
    padding-bottom: 0.5rem;
  }

  .btn-container {
    position: relative;
  }

  .plan-book-container {
    position: relative;
    height: auto;
    padding: 0.5rem 1.25rem 1.25rem;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      box-shadow: inset 0 0 2000px rgba(183, 183, 183, 0.5);
      opacity: 0.35;
      border-radius: 1.5rem;
      z-index: -1;
    }
  }

  .btn-container {
    background-color: transparent !important;
  }
}

.payment-summary {
  background-color: lighten($blackColor, 10%);
  border: 1px solid lighten($blackColor, 15%);
  border-radius: 0.75rem;
  margin-bottom: 0.25rem;
  padding: 1rem;
  margin-top: 1rem;

  .price-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 0.5rem;

    label {
      flex: 1;
      color: $whiteColor;
      opacity: $lightOpacity;
      font-size: $smallFontSize;
      text-align: left;
    }
    .plan-price em {
      font-size: $smallFontSize;
    }
    .slashed-price,
    .slashed-price em {
      margin-bottom: 2px;
      margin-top: -0.15rem;
      font-size: $smallestFontSize;
    }
  }

  .total-price-wrapper {
    border-top: 1px solid lighten($blackColor, 15%);
    margin: 1rem 0.5rem 0 0;
    padding: 1rem 0 0;
    label {
      font-size: $mediumFontSize;
      opacity: 1;
    }

    .plan-price em {
      font-size: $mediumFontSize;
    }
  }
}

.payment-summary + .btn-primary {
  margin-top: 0;
}

.payment-ssl-info {
  display: block;
  text-align: center;
  margin-top: 0.5rem;
  font-size: $smallestFontSize;
  color: $whiteColor;
  opacity: $lightOpacity;

  span {
    display: inline-block;
    vertical-align: middle;
  }

  /deep/ .unicon svg {
    height: auto;
    width: 0.75rem;
    fill: $whiteColor;
    vertical-align: middle;
    margin-right: 0.25rem;
  }
}
</style>

            