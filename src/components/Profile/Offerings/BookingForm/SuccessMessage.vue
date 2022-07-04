<template>
  <div class="success-message" :class="{ show: show }">
    <div class="rel-wrapper">
      <div class="info-wrapper">
        <em class="icon">🎉</em>
        <h3>{{ getContent.title }}</h3>
        <p>{{ getContent.description }}</p>
      </div>

      <!--START: Online Plan Details-->
      <div
        v-if="offeringType == 'diy-plan' || offeringType == 'video-course' || offeringType == 'online-course'"
        class="offering-type-details"
      >
        <h3>{{ offeringTitle }}</h3>
        <p>Login and access your plan to get started</p>
        <a
          class="btn btn-primary"
          href="https://coach.skipperfit.com/client/login"
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
        <p>Access your E-Book downloads</p>
        <div v-if="mobilePlatform != 'iOS'">
          <!--START: Attachments for Android-->
          <div
            v-for="attachment in attachments.list"
            :key="attachment.id"
            class="attachments-file-wrapper"
          >
            <img src="@/assets/images/icons/file.png" alt="Attachment" />
            <label>{{ attachment.name }}</label>
            <a
              :href="getAttachmentsPath"
              target="_blank"
              class="btn btn-primary"
              ref="pdfDownloadButton"
            >
              Download
            </a>
          </div>
        </div>
        <!--END: Attachments for Android-->

        <!--START: Attachments for iOS-->
        <div v-else>
          <div
            v-for="attachment in attachments.list"
            :key="attachment.id"
            class="attachments-file-wrapper"
          >
            <div class="email-attachments-file">
              <img src="@/assets/images/icons/file.png" alt="Attachment" />
              <label>{{ attachment.name }}</label>
            </div>
          </div>
          <div class="email-attachments-info">
            Attachment has been mailed! Make sure to check your
            <span>Promotions</span> folder and your <span>Spam</span> folder
          </div>
        </div>
        <!--END: Attachments for iOS-->
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

      <!--START: Close Modal-->
      <unicon name="times" class="btn-close" @click="closeModal"></unicon>
      <!--END: Close Modal-->
    </div>
  </div>
</template>

<script>
export default {
  name: "SucccessMessage",
  data() {
    return {
      mobilePlatform: this.getMobileOS,
    };
  },
  props: {
    show: Boolean,
    coachSlug: String,
    offeringTitle: String,
    offeringType: String,
    attachments: Object,
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
    //Initialise the attachments
    getAttachmentsPath: function () {
      let path = "/download";
      if (
        process.env.VUE_APP_MODE == "development" ||
        process.env.VUE_APP_MODE == "staging"
      )
        path = `/${this.coachSlug}/download`;

      if (navigator.userAgent.includes("Instagram"))
        this.$refs.pdfDownloadButton.setAttribute(
          "download",
          this.offeringTitle
        );

      path += `?bookingID=${this.attachments.bookingID}&phone=${this.attachments.customerPhone}`;
      return path;
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
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.success-message {
  display: none;
  position: fixed;
  background-color: $blackColor;
  border: 1px solid lighten($blackColor, 10%);
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  padding: 2rem 1rem;
  width: calc(100% - 4rem);
  max-height: calc(100vh - 4rem);
  border-radius: 2rem;
  box-shadow: 0 -1rem 0.7rem -0.15rem rgba(41, 41, 41, 0.35);
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
    margin: auto;
  }
}
</style>

            