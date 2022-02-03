<template>
  <div>
    <div
      class="message-floating-wrapper"
      :class="{ show: showForm && !showModal }"
      @click="showModal = true"
    >
      <span :class="{ show: showLabel }">Message</span>
      <unicon name="envelope" />
    </div>

    <div class="enquiry-modal-wrapper" :class="{ show: showModal }">
      <div v-if="!successMessage.show" class="enquiry-modal">
        <!--START: Message Form-->
        <div class="modal-wrapper">
          <div class="intro-wrapper">
            <h3>Ask a question</h3>
            <p>
              Questions about plans, coaching styles, timings. Ask me anything!
            </p>
          </div>
        </div>

        <form v-on:submit.prevent="sendMessage()" class="coach-form">
          <FormBuilder :fields="fields"></FormBuilder>

          <button class="btn btn-primary" type="submit">
            Send Message
          </button>
        </form>
        <!--END: Message Form-->
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

    <div
      class="bg-overlay"
      :class="{ show: showModal }"
      @click="showModal = false"
    ></div>
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
  name: "CoachEnquiry",
  props: {
    coach: Object,
  },
  data() {
    return {
      lastScrollPos: 0,
      showForm: false,
      showLabel: false,
      showModal: false,
      showLoader: false,
      fields: {
        name: {
          type: "text",
          title: "Your Name*",
          placeholder: "Enter your name",
          required: true,
          hasError: false,
        },
        phone: {
          type: "tel",
          title: "Phone Number*",
          placeholder: "Your 10 digit number",
          required: true,
          hasError: false,
        },
        email: {
          type: "email",
          title: "E-mail Address*",
          placeholder: "Your e-mail address",
          required: true,
          hasError: false,
        },
        message: {
          type: "textarea",
          title: "Your Message*",
          placeholder: "Ask your question",
          required: true,
          hasError: false,
        },
      },
      status: {
        show: false,
        isSuccess: true,
        successMessage: "🙌 I've got your message!",
        errorMessage: "😕 Something's not right. Try again",
      },
      successMessage: {
        show: false,
        title: "I've got your message",
        message: "I'll reach out to you soon enough",
      },
    };
  },
  components: {
    FormBuilder,
    LineLoader,
    StatusMessage,
    SuccessMessage,
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      var windowScrollVal = window.top.scrollY;

      //Show floating CTA on scroll
      if (windowScrollVal > window.innerHeight * 0.05) {
        this.showForm = true;
      } else this.showForm = false;

      //Show label if scrolling up
      if (windowScrollVal > this.lastScrollPos) this.showLabel = true;
      else this.showLabel = false;

      this.lastScrollPos = windowScrollVal <= 0 ? 0 : windowScrollVal;
    },

    async sendMessage() {
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
        const messageResult = await CoachService.SendMessage({
          slug: this.coach.slug,
          client: formFields,
        });
        if (messageResult.hasError == false) {
          this.status.isSuccess = true;
          this.resetFields(this.fields);

          setTimeout(() => (this.showModal = false), 2000);
        } else {
          this.status.isSuccess = false;
        }
      }

      this.status.show = true;
      this.disableButton = true;
      this.showLoader = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.message-floating-wrapper {
  transition: all 0.3s;
  z-index: 10;
  transform: translateX(10rem);
  position: fixed;
  bottom: 3.25rem;
  right: 0.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    transition: all 0.3s;
    background: $blackColor;
    border: 1px solid lighten($blackColor, 10%);
    margin-right: -2rem;
    border-radius: 1rem;
    white-space: nowrap;
    font-size: 1rem;
    max-width: 0;
    overflow: hidden;
    padding: 0.75rem 0;
    color: $blackColor;
    box-shadow: 0 0 0.7rem -0.1rem transparent;

    &.show {
      max-width: 15rem;
      color: darken($whiteColor, 15%);
      padding: 0.75rem 2.75rem 0.75rem 1rem;
      box-shadow: 0 0 1rem 0.1rem rgba(62, 62, 62, 0.8);
    }
  }

  &.show {
    transform: translateX(0);
  }

  .unicon /deep/ svg {
    background: var(--brand-color);
    fill: var(--brand-color-dark-50);
    border: 1px solid var(--brand-color-dark-10);
    height: auto;
    width: 1.85rem;
    padding: 0.5rem;
    border-radius: 50%;
  }
}

.enquiry-modal-wrapper {
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
  transform: translateY(calc(100vh + 7rem));
  z-index: 101;

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
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
  }

  &.show {
    transform: translateY(0);
  }

  /deep/ {
    .field-title {
      display: none;
    }
  }
}

.modal-wrapper {
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

.intro-wrapper {
  h3 {
    font-size: $mediumFontSize;
    color: $whiteColor;
  }

  p {
    font-size: $smallFontSize;
    color: $whiteColor;
    opacity: $lightOpacity;
  }
}

.btn-primary {
  width: 100%;
}

//Light Theme styles
.light-theme {
  .unicon /deep/ svg {
    width: 1.65rem;
    padding: 0.5rem;
  }

  .enquiry-modal-wrapper {
    background-color: $whiteColor;
    
    .modal-wrapper {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 1rem;
    }

    .intro-wrapper {
      h3 {
        color: $blackColor;
      }

      p {
        color: lighten($blackColor, 20%);
      }
    }
  }

  .message-floating-wrapper {
    span {
      padding: 0.55rem 0;
      &.show {
        padding: 0.55rem 2.75rem 0.55rem 1rem;
        box-shadow: 0 0 1rem 0.1rem rgba(62, 62, 62, 0.5);
      }
    }
  }
}
</style>