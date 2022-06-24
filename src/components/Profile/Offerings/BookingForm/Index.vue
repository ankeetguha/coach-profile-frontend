<template>
  <div class="booking-wrapper" :class="{ show: show }">
    <div class="booking-modal" :class="{ show: !showOptions.successMessage }">
      <div class="scroll-wrapper">
        <!--START: Title Wrapper-->
        <div class="hero-wrapper">
          <h3>{{ offering.title }}</h3>
          <span v-if="selectedVariant.title != undefined">{{
            selectedVariant.title
          }}</span>
        </div>
        <!--END: Title Wrapper-->

        <!--START: Form-->
        <ClientForm :fields="fields"></ClientForm>
        <DiscountForm
          ref="discountForm"
          :coachSlug="coach.slug"
          :offeringSlug="offering.slug"
          :selectedVariantIndex="selectedVariantIndex"
          @discountApplied="addDiscount"
          @discountRemoved="removeDiscount"
        ></DiscountForm>
        <!--END: Form-->

        <!--START: Price Details-->
        <PriceDetails
          :variant="selectedVariant"
          :discount="discountDetails"
        ></PriceDetails>
        <!--END: Price Details-->
      </div>

      <!--START: Button Actions-->
      <div class="btn-wrapper">
        <button
          type="button"
          class="btn btn-border"
          :disabled="disableButton"
          @click="closeForm"
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="disableButton"
          @click="saveBooking"
        >
          Make Payment
        </button>
      </div>
      <!--END: Button Actions-->

      <!--START: Payment Loader -->
      <PaymentLoader
        :paymentCompleted="paymentCompleted"
        :show="showOptions.paymentLoader"
      ></PaymentLoader>
      <!--END: Payment Loader -->

      <!--START: Line Loader -->
      <LineLoader :showLoader="showOptions.lineLoader"></LineLoader>
      <!--END: Line Loader -->
    </div>

    <!--START: Status Message-->
    <StatusMessage
      class="status-message"
      :show="showOptions.status"
      :isSuccess="status.isSuccess"
      :successMessage="status.successMessage"
      :errorMessage="status.errorMessage"
    ></StatusMessage>
    <!--END: Status Message-->

    <!--START: Success Message-->
    <SuccessMessage
      :show="showOptions.successMessage"
      :coachSlug="coach.slug"
      :offeringTitle="offering.title"
      :offeringType="offering.offeringType"
      :attachments="attachmentsResponse"
      @closeModal="closeSuccessMessage"
    ></SuccessMessage>
    <!--END: Success Message-->

    <!--START: BG Overlay-->
    <div class="bg-overlay show"></div>
    <!--END: BG Overlay-->
  </div>
</template>

<script>
//Importing CoachService
import CoachService from "@/controllers/CoachService";

//Import components
import ClientForm from "./ClientForm";
import DiscountForm from "./DiscountForm";
import PriceDetails from "./PriceDetails";
import PaymentLoader from "./PaymentLoader";
import SuccessMessage from "./SuccessMessage";

import StatusMessage from "@/components/modals/StatusMessage";
import LineLoader from "@/components/loaders/LineLoader";
// import StatusMessage from "@/components/modals/StatusMessage";

export default {
  name: "OfferingBookingForm",
  data() {
    return {
      disableButton: false,
      showOptions: {
        lineLoader: false,
        paymentLoader: false,
        status: false,
        successMessage: false,
      },
      discountDetails: {
        code: null,
        hasDiscount: false,
        amount: 0,
      },
      paymentCompleted: false,
      fields: {
        name: {
          type: "text",
          title: "Your Name*",
          placeholder: "Enter your name",
          required: true,
          hasError: false,
        },
        email: {
          type: "email",
          title: "E-mail Address*",
          placeholder: "Your confirmation will be sent here",
          required: true,
          hasError: false,
        },
        phone: {
          type: "tel",
          title: "Phone Number*",
          placeholder: "Your 10 digit number",
          errorMessage: "Enter only a 10 digit number",
          required: true,
          hasError: false,
        },
      },
      status: {
        isSuccess: true,
        successMessage: "🙌 I've got your booking!",
        errorMessage: "😕 Something's not right. Try again",
      },
      attachmentsResponse: {},
    };
  },

  components: {
    ClientForm,
    DiscountForm,
    PriceDetails,
    PaymentLoader,
    StatusMessage,
    SuccessMessage,
    LineLoader,
  },

  props: {
    coach: Object,
    offering: Object,
    selectedVariant: Object,
    selectedVariantIndex: Number,
    selectedSlot: Object,
    show: Boolean,
  },

  watch: {
    show: function (val) {
      if (val) setTimeout(() => (this.showModal = true), 10);
      else this.showModal = false;
    },
  },

  created() {
    if (
      this.coach.isSubscribed &&
      this.coach.paymentsActive &&
      this.offering.activatePayment
    ) {
      this.initPaymentGateway();
    }
  },

  methods: {
    async saveBooking() {
      if (!this.disableButton) {
        var timeoutHandler = null;
        clearTimeout(timeoutHandler);

        this.$emit("updateBookingStatus", true);
        this.disableButton = true;
        this.showOptions.lineLoader = true;
        this.showOptions.status = false;
        this.showOptions.successMessage = false;

        var formValidation = this.validateForm(this.fields);
        if (formValidation.hasErrors) {
          this.$emit("updateBookingStatus", false);
          this.disableButton = false;
          this.status.isSuccess = false;

          this.showOptions.status = true;
          this.showOptions.lineLoader = false;

          timeoutHandler = setTimeout(
            () => (this.showOptions.status = false),
            3000
          );
        } else {
          //Form is valid
          await this.completeBooking();
        }
      }
    },

    //Complete Booking
    async completeBooking() {
      const formFields = {
        client: this.fields,
        coachSlug: this.coach.slug,
        offeringSlug: this.offering.slug,
        selectedVariantIndex: this.selectedVariantIndex,
        discountCode: this.discountDetails.code,
        selectedSlot: this.selectedSlot
      };

      //Show the payment loader
      if (
        this.coach.isSubscribed &&
        this.coach.paymentsActive &&
        this.offering.activatePayment
      ) {
        this.showOptions.paymentLoader = true;
        this.paymentCompleted = false;
      }

      const bookingResult = await CoachService.BookOffering(formFields);
      if (
        this.coach.isSubscribed &&
        this.coach.paymentsActive &&
        this.offering.activatePayment
      ) {
        this.launchPayment(bookingResult);
      }
    },

    //Setup Razorpay
    initPaymentGateway() {
      window.app = this;

      let rzpScript = document.createElement("script");
      rzpScript.setAttribute(
        "src",
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      document.head.appendChild(rzpScript);
    },

    //Launch Razorpay Modal
    launchPayment(bookingResult) {
      var razorpayOptions = {
        key: process.env.VUE_RZP_KEY,
        name: this.coach.fullName,
        description: this.offering.title,
        order_id: bookingResult.rzpOrderID,
        prefill: {
          name: this.fields.name.value,
          email: this.fields.email.value,
          contact: this.fields.phone.value,
        },
        handler: function (response) {
          window.app.registerPayment(response, bookingResult.orderID);
        },
        modal: {
          ondismiss: function () {
            window.app.resetPaymentModal();
          },
        },
        notes: {
          "Coach Name": this.coach.fullName,
          "Plan Name": this.offering.title,
        },
        theme: {
          color: "#1e1e1e",
        },
      };

      var rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
      this.showOptions.paymentLoader = false;
      this.showOptions.lineLoader = true;

      //Handle failed payments
      rzp.on("payment.failed", function (response) {
        window.app.failedPayment(response, bookingResult.orderID);
      });
    },

    //Verify and register a payment
    async registerPayment(response, orderID) {
      this.paymentCompleted = true;
      this.showOptions.paymentLoader = true;

      const paymentStatus = await CoachService.VerifyPayment({
        paymentResponse: response,
        orderID: orderID,
      });

      if (!paymentStatus.hasError) {
        if (this.offering.offeringType == "e-book") {
          this.attachmentsResponse = paymentStatus;
        }

        this.showOptions.status = false;
        this.showOptions.successMessage = true;
        this.resetFields(this.fields);
      } else {
        this.showOptions.status = true;
        this.showOptions.successMessage = false;
      }

      this.$emit("updateBookingStatus", true);
      this.disableButton = true;
      this.showOptions.paymentLoader = false;
      this.showOptions.lineLoader = false;
    },

    //Payment modal closed event
    resetPaymentModal() {
      this.showOptions.successMessage = false;
      this.showOptions.lineLoader = false;
      this.showOptions.paymentLoader = false;
      this.showOptions.status = false;
      this.$emit("updateBookingStatus", false);
      this.disableButton = false;
    },

    //Handle a failed payment
    async failedPayment(response, orderID) {
      await CoachService.FailedPayment({
        paymentError: response,
        orderID: orderID,
      });

      this.showOptions.successMessage = false;
      this.$emit("updateBookingStatus", true);
      this.disableButton = true;
      this.showOptions.lineLoader = false;
    },

    addDiscount(discount) {
      this.discountDetails.code = discount.code;
      this.discountDetails.hasDiscount = true;
      this.discountDetails.amount = discount.amount;
    },

    removeDiscount() {
      this.discountDetails.code = null;
      this.discountDetails.hasDiscount = false;
      this.discountDetails.amount = 0;
    },

    closeSuccessMessage() {
      this.$emit("updateBookingStatus", false);
      this.disableButton = false;
      this.showOptions.successMessage = false;
      this.closeForm();
    },

    closeForm() {
      this.$refs.discountForm.removeDiscount();
      if (!this.disableButton) this.$emit("closeForm");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.booking-wrapper,
.bg-overlay {
  display: none;
  &.show {
    display: block;
  }
}
.booking-modal {
  transition: all 0.3s;
  background-color: $blackColor;
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100%);
  height: 100%;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
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
    box-shadow: inset 0 0 2000px rgba(183, 183, 183, 0.15);
    opacity: 0.45;
    z-index: -1;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }

  &.show {
    transform: translateY(0);
    z-index: 105;
  }
}

.scroll-wrapper {
  padding: 1rem 1.25rem 1rem;
  height: calc(100vh - 6rem);
  overflow-y: scroll;
}

.hero-wrapper {
  border-bottom: 1px solid lighten($blackColor, 15%);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;

  h3 {
    font-size: $largeFontSize;
    font-weight: $mediumFontWeight;
    color: $whiteColor;
  }

  span {
    display: table;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    font-weight: $mediumFontWeight;
    color: var(--brand-color-dark-45);
    background-color: var(--brand-color);
  }
}

.btn-wrapper {
  background-color: $blackColor;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 1rem;
  width: calc(100% - 2rem);

  .btn-border {
    color: $whiteColor;
    opacity: 0.65;
  }

  .btn-primary {
    flex: 1;
  }

  .btn {
    margin: 0 0.25rem;

    &[disabled] {
      color: $whiteColor !important;
      background-color: transparent !important;
      opacity: 0.25;
    }
  }
}

.status-message {
  /deep/ &.status-message.show {
    z-index: 105;
    top: 6rem;
  }
}

//Light Theme
.light-theme {
  .client-form /deep/ {
    .field-title {
      color: $whiteColor;
    }
  }
  // .booking-modal {
  //   background-color: #e9e9e9;
  // }

  // .hero-wrapper {
  //   border-bottom-color: darken($whiteColor, 8%);
  //   h3 {
  //     color: $blackColor;
  //   }
  // }

  // .btn-wrapper {
  //   background-color: darken($whiteColor, 3%);

  //   .btn-border {
  //     color: lighten($blackColor, 10%);
  //     border-color: lighten($blackColor, 40%);
  //   }
  // }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .header-wrapper {
    position: fixed;
  }

  .booking-modal {
    top: 0;
    bottom: auto;
    left: auto;
    right: 0;
    border: 1px solid lighten($blackColor, 15%);
    width: 35vw;
    padding: 0 1.5rem;
    height: 100%;
    border-radius: 1.5rem;
    padding-bottom: 0;

    &.show {
      transform: translateY(0);
      z-index: 105;
    }

    .btn-border {
      width: 10rem;
    }

    .scroll-wrapper {
      padding: 1rem 0;
      overflow-y: scroll;
    }

    &::before {
      height: auto;
      border-radius: 1.5rem;
    }
  }

  .status-message.status-message.show {
    position: fixed;
    top: auto;
    bottom: 4rem;
    right: 1rem;
    left: auto;
    padding: 1rem;
    width: calc(38vw - 4rem + 2px);
    text-align: center;
  }

  //Light Theme
  .light-theme {
    .hero-wrapper {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
}
</style>

            