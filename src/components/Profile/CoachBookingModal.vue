<template>
  <div class="plan-book-modal" :class="{ show: showModal }">
    <div v-if="!successMessage.show">
      <!--START: Booking Form-->
      <span class="coach-name">Coach {{ coach.fullName }}</span>
      <div class="booking-modal-wrapper">
        <div class="intro-wrapper">
          <h3 class="plan-title">{{ plan.title }}</h3>
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

      <form
        v-on:submit.prevent="bookPlan()"
        class="coach-form"
        @change="formChanged"
      >
        <FormBuilder :fields="fields" @fieldChanged="formChanged"></FormBuilder>
        <button class="btn btn-primary" type="submit">
          Book Plan <unicon name="angle-right"></unicon>
        </button>
      </form>
      <!--END: Booking Form-->
    </div>

    <!--START: Status Message-->
    <SuccessMessage :successForm="successMessage"></SuccessMessage>
    <!--END: Status Message-->

    <!--START: Line Loader -->
    <LineLoader :showLoader="showLoader"></LineLoader>
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
</template>

<script>
//Importing CoachService
import CoachService from "@/controllers/CoachService";

//Import components
import FormBuilder from "@/components/form/FormBuilder";
import StatusMessage from "@/components/modals/StatusMessage";
import SuccessMessage from "@/components/modals/SuccessMessage";
import LineLoader from "@/components/loaders/LineLoader";

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
        successMessage: "🙌 We've got your booking!",
        errorMessage: "😕 Something's not right. Try again",
      },
      successMessage: {
        show: false,
        title: "We've got your booking",
        message: "We'll reach out to you soon enough",
      },
    };
  },

  components: {
    FormBuilder,
    LineLoader,
    StatusMessage,
    SuccessMessage,
  },

  methods: {
    formChanged() {
      console.log("");
    },

    async bookPlan() {
      var timeoutHandler = null;

      clearTimeout(timeoutHandler);

      this.status.show = false;
      this.successMessage.show = false;
      this.isSuccess = false;
      this.showLoader = true;

      //Check if the form has valid input
      var formFields = {
        ...this.fields,
      };

      var formValidation = this.validateForm(formFields);

      if (formValidation.hasErrors) {
        this.status.isSuccess = false;
      } else {
        formFields = {
          client: this.fields,
          plan: this.plan,
          coachSlug: this.coach.slug,
        };
        if (await CoachService.SendMessage(formFields)) {
          this.successMessage.show = true;
          this.resetFields(this.fields);
        } else {
          this.isSuccess = false;
          this.status.show = true;
        }
      }

      this.status.show = true;
      this.disableButton = true;
      this.showLoader = false;

      //Hide the notification
      timeoutHandler = setTimeout(() => (this.status.show = false), 3000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.plan-book-modal {
  transition: all 0.3s;
  background-color: $blackColor;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 2rem 1.25rem 1rem;
  width: calc(100% - 2.5rem);
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

.booking-modal-wrapper {
  border-bottom: 1px solid lighten($blackColor, 10%);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
}

form {
  margin: 1rem 0 0;
}

.plan-title {
  color: $whiteColor;
  font-size: $mediumFontSize;
}

.plan-dates {
  color: $whiteColor;
  opacity: $lightOpacity;
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
  background-color: $purpleColor;
  font-size: $smallerFontSize;
  padding: 0.55rem 0.75rem;
  border-radius: 0.75rem;
  margin-top: -2.5rem;
  margin-bottom: 0.05rem;
}

.btn-primary {
  display: block;
  width: 100%;
  margin-top: 2rem;
}
</style>

            