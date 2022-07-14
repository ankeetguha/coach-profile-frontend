<template>
  <div>
    <div v-if="show & (status == 'processed')" class="success-message">
      <div class="rel-wrapper">
        <div class="info-wrapper">
          <em class="icon">🎉</em>
          <h3>{{ getContent.title }}</h3>
          <p>{{ getContent.description }}</p>
        </div>

        <!--START: Online Plan Details-->
        <div
          v-if="
            offeringType == 'diy-plan' ||
            offeringType == 'video-course' ||
            offeringType == 'online-course'
          "
          class="offering-type-details"
        >
          <h3>{{ offeringTitle }}</h3>
          <p>Login and access your plan to get started</p>
          <a
            class="btn btn-primary"
            href="https://dashboard.skipperfit.com/client/login"
            target="_blank"
          >
            <unicon name="user"></unicon>
            <span>Access Client Portal</span>
          </a>
        </div>
        <!--END: Online Plan Details-->

        <!--START: E-Book Details-->
        <div v-if="offeringType == 'e-book'" class="offering-type-details">
          <h3>{{ offeringTitle }}</h3>
          <p>Access your E-Book downloads from the email you've received</p>
        </div>
        <!--END: E-Book Details-->

        <!--START: Consultation Call-->
        <div
          v-if="offeringType == 'consultation-call'"
          class="offering-type-details"
        >
          <h3>{{ offeringTitle }}</h3>
          <p>You will receieve an e-mail with details of your scheduled call</p>
        </div>
        <!--END: Consultation Call-->
      </div>
    </div>
    <div v-else-if="show" class="success-message">
      <div class="rel-wrapper">
        <div class="info-wrapper">
          <em class="icon">🤔</em>
          <h3>Hmmm, your transaction hasn't completed</h3>
          <p>
            Wait for 24 hours and if you've been charged, reach out with the
            payment details via contact.
          </p>
        </div>
        <div class="offering-type-details">
          <h3>{{ offeringTitle }}</h3>
        </div>
      </div>
    </div>
    <div v-else>
      <PageLoader class="loader"></PageLoader>
    </div>
  </div>
</template>

<script>
//Import components
import PageLoader from "@/components/loaders/PageLoader";

//Importing CoachService
import CoachService from "@/controllers/CoachService";

export default {
  name: "TransactionSucccess",
  data() {
    return {
      mobilePlatform: this.getMobileOS,
      show: false,
      clientName: null,
      offeringTitle: null,
      offeringType: null,
      status: false,
    };
  },
  components: {
    PageLoader,
  },
  created() {
    this.getTransaction();
  },
  computed: {
    getContent: function () {
      var content = {
        title: "Booking Completed!",
        description: "Will reach out to you soon enough",
      };

      if (this.offeringType == "diy-plan" || this.offeringType == "e-book")
        content = {
          title: "Booking Completed!",
          description:
            "We've also sent you an email with details. Check Promotions and Spam folder if you can't find it",
        };

      return content;
    },

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
    async getTransaction() {
      const urlParams = new URLSearchParams(window.location.search);
      const booking = await CoachService.GetTransaction({
        sessionID: urlParams.get("session_id"),
      });
      console.log(booking);
      this.clientName = booking.client;
      this.offeringTitle = booking.offeringTitle;
      this.offeringType = booking.offeringType;
      this.status = booking.status;
      this.show = true;
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loader {
  margin: 0 15% 5rem;
  /deep/ {
    .buffer-hero {
      background-color: transparent;
      padding: 2rem 2rem 0;
      margin-bottom: 0;
    }

    .buffer-title,
    .buffer-line {
      width: 100%;
    }

    .buffer-page-image,
    .buffer-category {
      display: none;
    }
  }
}
.success-message {
  position: relative;
  background-color: $blackColor;
  border: 1px solid lighten($blackColor, 10%);
  padding: 2rem 1rem;
  width: calc(100% - 4rem);
  margin: 3rem auto 3rem;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 0.7rem -0.15rem rgba(41, 41, 41, 0.35);
  z-index: 105;
  text-align: center;

  &.show {
    display: block;
  }
}

.info-wrapper {
  .icon {
    display: block;
    font-size: 4rem;
    margin-top: -5rem;
  }

  h3 {
    color: $whiteColor;
    font-size: 1.5rem;
    margin-top: 1rem;
  }

  p {
    color: $whiteColor;
    opacity: 0.65;
  }
}

.offering-type-details {
  margin-top: 2rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid lighten($blackColor, 18%);
  background-color: lighten($blackColor, 8%);

  h3 {
    color: $whiteColor;
    font-size: $mediumFontSize;
    font-weight: $mediumFontWeight;
    margin-bottom: 0.15rem;
  }
  p {
    color: $whiteColor;
    opacity: 0.65;
  }

  .btn {
    display: block;
    margin-top: 1.5rem;
  }
}

.btn-close {
  display: block;
  position: absolute;
  top: calc(100% + 3rem);
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;

  /deep/ svg {
    padding: 0.75rem;
    border-radius: 50%;
    background-color: lighten($whiteColor, 8%);
    border: 1px solid lighten($blackColor, 20%);
    width: 2rem;
    height: auto;
    fill: $blackColor;
  }
}

.attachments-file-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  border-top: 1px solid #444;
  padding-top: 0.5rem;
  margin-top: 0.5rem;

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
    padding: 0;
    background-color: transparent;
    border: transparent;
    color: $blueColor;
    font-size: $smallerFontSize;

    text-align: right;
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

//Light Theme
.light-theme {
  .success-message {
    background-color: $whiteColor;
    border-color: darken($whiteColor, 10%);
  }

  .info-wrapper {
    h3 {
      color: $blackColor;
    }

    p {
      color: lighten($blackColor, 20%);
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .success-message {
    width: 35vw;
    right: 0;
  }
}
</style>

            