<template>
  <div class="plan-book-modal" :class="{ show: showModal }">
    <div class="rel-wrapper">
      <span class="coach-name">{{ coach.fullName }}</span>

      <!--START: Booking Form-->
      <div v-if="!successMessage.show" class="plan-book-container">
        <div class="booking-modal-wrapper">
          <div class="intro-wrapper">
            <h3 class="plan-title" v-if="isMobile()">{{ plan.title }}</h3>
            <h3 class="plan-title" v-else>Book This Plan</h3>

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

          <div v-if="!coach.paymentsActive" class="price-wrapper">
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

        <form v-on:submit.prevent="bookPlan()" class="coach-form">
          <FormBuilder :fields="fields"></FormBuilder>

          <div v-if="coach.paymentsActive" class="payment-summary">
            <div class="price-wrapper">
              <label>Plan Price</label>
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
            </div>
            <div class="price-wrapper">
              <label>Internet Handling Fees</label>
              <span class="plan-price">
                + ₹<em>{{
                  plan.isDiscountedPlan != undefined && plan.isDiscountedPlan
                    ? convertToIndianNumber(
                        Math.ceil(
                          plan.discountedPrice / (0.9764 * 0.9764) -
                            parseInt(plan.discountedPrice)
                        )
                      )
                    : convertToIndianNumber(
                        Math.ceil(
                          plan.planPrice / (0.9764 * 0.9764) -
                            parseInt(plan.planPrice)
                        )
                      )
                }}</em>
              </span>
            </div>
            <div class="price-wrapper total-price-wrapper">
              <label>Total</label>
              <span class="plan-price">
                ₹<em>{{
                  plan.isDiscountedPlan != undefined && plan.isDiscountedPlan
                    ? convertToIndianNumber(
                        Math.ceil(plan.discountedPrice / (0.9764 * 0.9764))
                      )
                    : convertToIndianNumber(
                        Math.ceil(plan.planPrice / (0.9764 * 0.9764))
                      )
                }}</em>
              </span>
            </div>
          </div>
        </form>
        <!--END: Booking Form-->
      </div>

      <!--START: Button Container-->
      <div
        v-if="!successMessage.show"
        class="btn-container"
        @click="bookPlan()"
      >
        <button class="btn btn-primary" type="submit">
          {{ ctaButtonText }} <unicon name="angle-right"></unicon>
        </button>
        <div v-if="coach.paymentsActive" class="payment-ssl-info">
          <unicon name="lock"></unicon
          ><span>Payments are secure and encrypted</span>
        </div>
      </div>
      <!--END: Button Container-->

      <!--START: Status Message-->
      <SuccessMessage :successForm="successMessage"></SuccessMessage>

      <!--START: Plan Attachments Details-->
      <div
        v-if="plan.hasAttachments && !plan.hasOnlinePlan"
        class="attachments-wrapper"
        :class="{ show: successMessage.show }"
      >
        <div class="attachments-file-wrapper" v-if="mobilePlatform != 'iOS'">
          <img src="@/assets/images/icons/file.png" alt="Attachment" />
          <label>{{ attachment.name }}</label>
          <a
            :href="attachment.path"
            target="_blank"
            class="btn btn-primary"
            ref="pdfDownloadButton"
          >
            Download >
          </a>
        </div>
        <div class="email-attachments-wrapper" v-else>
          <div class="email-attachments-file">
            <img src="@/assets/images/icons/file.png" alt="Attachment" />
            <label>{{ attachment.name }}</label>
          </div>
          <div class="email-attachments-info">
            Attachment has been mailed! Make sure to check your
            <span>Promotions</span> folder and your <span>Spam</span> folder
          </div>
        </div>
      </div>
      <!--END: Plan Attachments Details-->

      <!--START: Online Plan Details-->
      <div
        v-else-if="plan.hasOnlinePlan"
        class="client-login-wrapper"
        :class="{ show: successMessage.show }"
      >
        <p>Login and access your plan to get started</p>
        <a
          class="btn btn-primary"
          href="https://coach.skipperfit.com/client/login"
          target="_blank"
        >
          <unicon name="user"></unicon>
          <span>Login</span>
        </a>
      </div>
      <!--END: Online Plan Details-->

      <!--END: Status Message-->

      <!--START: Line Loader -->
      <ModalLoader
        :show="modalLoader.show"
        :content="modalLoader.content"
      ></ModalLoader>
      <LineLoader :showLoader="showLoader"></LineLoader>
      <div class="bg-overlay" :class="{ show: modalLoader.show }"></div>
      <!--END: Line Loader -->

      <!--START: Status Message-->
      <StatusMessage
        :show="status.show"
        :isSuccess="status.isSuccess"
        :successMessage="status.successMessage"
        :errorMessage="status.errorMessage"
      ></StatusMessage>
      <!--END: Status Message-->
    </div>
  </div>
</template>

<script>
//Importing CoachService
import CoachService from "@/controllers/CoachService";

//Import components
import FormBuilder from "@/components/form/FormBuilder";
import StatusMessage from "@/components/modals/StatusMessage";
import SuccessMessage from "@/components/modals/SuccessMessage";
import LineLoader from "@/components/loaders/LineLoader";
import ModalLoader from "@/components/loaders/ModalLoader";

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
      showStatus: false,
      showLoader: false,
      isSuccess: false,
      disableButton: false,
      ctaButtonText: this.coach.paymentsActive ? "Make Payment" : "Book Plan",
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
        show: false,
        isSuccess: true,
        successMessage: "🙌 I've got your booking!",
        errorMessage: "😕 Something's not right. Try again",
      },
      modalLoader: {
        show: false,
        content: {},
      },
      customerPhone: null,
      mobilePlatform: this.getMobileOS,
      attachment: { name: null, path: null },
      successMessage: {
        show: false,
        title:
          this.coach.paymentsActive || this.plan.hasAttachments
            ? "Booking Completed!"
            : "I've got your booking",
        message:
          this.coach.paymentsActive || this.plan.hasAttachments
            ? "We've also sent you an email with details. Check Promotions and Spam folder if you can't find it"
            : "Will reach out to you soon enough",
      },
    };
  },

  components: {
    FormBuilder,
    LineLoader,
    StatusMessage,
    SuccessMessage,
    ModalLoader,
  },

  mounted() {
    this.initPaymentGateway();
  },
  computed: {
    getMobileOS: function () {
      const ua = navigator.userAgent;
      if (
        /iPad|iPhone|iPod/.test(ua) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
      )
        return "iOS";
      else return "other";
    },
  },
  methods: {
    async bookPlan() {
      var timeoutHandler = null;

      clearTimeout(timeoutHandler);

      this.status.show = false;
      this.successMessage.show = false;
      this.isSuccess = false;
      this.modalLoader.show = false;

      //Show Payments loading modal
      if (this.coach.paymentsActive) {
        this.modalLoader.content.title = "Redirecting To Payment Gateway";
        this.modalLoader.content.description =
          "Don't close this page. We're sending you to the payment gateway";
        this.modalLoader.show = true;
      } else this.showLoader = true;

      //Check if the form has valid input
      var formFields = {
        ...this.fields,
      };

      var formValidation = this.validateForm(formFields);

      if (formValidation.hasErrors) {
        this.status.isSuccess = false;
        this.status.show = true;
        this.disableButton = true;
        this.showLoader = false;
        this.modalLoader.show = false;

        //Hide the notification
        timeoutHandler = setTimeout(() => (this.status.show = false), 3000);
      } else {
        formFields = {
          client: this.fields,
          plan: this.plan,
          coachSlug: this.coach.slug,
        };

        this.customerPhone = this.fields.phone.value;

        const bookingResult = await CoachService.BookPlan(formFields);
        if (!this.coach.paymentsActive) {
          this.successMessage.show = true;
          this.resetFields(this.fields);

          this.status.show = true;
          this.status.isSuccess = true;
          this.disableButton = true;
          this.showLoader = false;

          if (bookingResult.name != undefined) {
            this.modalLoader.content.description =
              "You're E-Book download will start shortly";
            this.successMessage.message =
              "We've also sent you an e-mail with the E-Book. Check SPAM folder if you can't find it";
            this.initAttachment(bookingResult.bookingID, bookingResult.name);
          }

          //Hide the notification
          timeoutHandler = setTimeout(() => (this.status.show = false), 3000);
        } else {
          this.launchPayment(bookingResult);
        }
      }
    },

    initPaymentGateway() {
      if (this.coach.paymentsActive) {
        window.app = this;

        let rzpScript = document.createElement("script");
        rzpScript.setAttribute(
          "src",
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        document.head.appendChild(rzpScript);
      }
    },

    launchPayment(bookingResult) {
      var razorpayOptions = {
        key: process.env.VUE_RZP_KEY,
        name: this.coach.fullName,
        description: this.plan.title,
        order_id: bookingResult.rzpOrderID,
        prefill: {
          name: this.fields.name.value,
          email: this.fields.email.value,
          contact: this.fields.phone.value,
        },
        handler: function (response) {
          window.app.registerPayment(response, bookingResult.orderID);
        },
        notes: {
          "Coach Name": this.coach.fullName,
          "Plan Name": this.plan.title,
        },
        theme: {
          color: "#1e1e1e",
        },
      };

      var rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
      this.modalLoader.show = false;
      this.showLoader = true;

      //Handle failed payments
      rzp.on("payment.failed", function (response) {
        window.app.failedPayment(response, bookingResult.orderID);
      });
    },

    //Verify and register a payment
    async registerPayment(response, orderID) {
      this.modalLoader.content.title = "DO NOT close this page";
      this.modalLoader.content.description = "We're processing your booking.";
      this.modalLoader.show = true;
      this.showLoader = false;

      const paymentStatus = await CoachService.VerifyPayment({
        paymentResponse: response,
        orderID: orderID,
      });

      if (!paymentStatus.hasError) {
        if (paymentStatus.name != undefined) {
          this.modalLoader.content.description =
            "You're E-Book download will start shortly";
          this.successMessage.message =
            "We've also sent you an e-mail with the E-Book. Check SPAM folder if you can't find it";
          this.initAttachment(paymentStatus.bookingID, paymentStatus.name);
        }

        this.successMessage.show = true;
        this.resetFields(this.fields);
      } else {
        this.successMessage.show = false;
      }
      this.status.show = true;
      this.disableButton = true;
      this.showLoader = false;
      this.modalLoader.show = false;
    },

    //Handle a failed payment
    async failedPayment(response, orderID) {
      await CoachService.FailedPayment({
        paymentError: response,
        orderID: orderID,
      });

      this.successMessage.show = false;
      this.disableButton = true;
      this.showLoader = false;
    },

    initAttachment(bookingID, fileName) {
      this.attachment.name = fileName;
      this.attachment.path = "/download";
      if (
        process.env.VUE_APP_MODE == "development" ||
        process.env.VUE_APP_MODE == "staging"
      )
        this.attachment.path = `/${this.coach.slug}/download`;

      if (navigator.userAgent.includes("Instagram"))
        this.$refs.pdfDownloadButton.setAttribute("download", fileName);

      this.attachment.path += `?bookingID=${bookingID}&phone=${this.customerPhone}`;
    },
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

            