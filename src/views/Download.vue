<template>
  <div class="module-container">
    <h3>{{ loaderInfo.title }}</h3>
    <p>{{ loaderInfo.description }}</p>
    <LineLoader :showLoader="showLoader"></LineLoader>
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";
import LineLoader from "@/components/loaders/LineLoader";

//Importing CoachService
import CoachService from "@/controllers/CoachService";

export default {
  name: "Download",
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
  data() {
    return {
      showLoader: true,
      loaderInfo: {
        title: "Converting Your E-Book",
        description: "Hold on! This will take a little time :)",
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
    show: Boolean,
  },
  components: {
    LineLoader,
  },
  async created() {
    //Get coach and change meta details
    if (_.isEmpty(this.coach)) {
      this.coach = await this.getCoach();
    }

    this.meta.title = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogTitle = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogDescription = this.coach.description;
    this.meta.ogImage = this.coach.offerings != undefined ? this.coach.offerings[0].coverImageURL : this.coach.plans[0].coverImageURL;

    this.downloadEBook();
  },
  methods: {
    async downloadEBook() {
      const urlParams = new URLSearchParams(window.location.search);
      const fields = {
        bookingID: urlParams.get("bookingID"),
        phone: urlParams.get("phone"),
      };

      setTimeout(
        () => (this.loaderInfo.title = "Preparing Your Download"),
        7500
      );

      const response = await CoachService.GetDownloads(fields);

      this.showLoader = false;
      this.loaderInfo.title = "Your E-Book is ready!";
      this.loaderInfo.description =
        "We've also sent you an e-mail with the attachment";

      if (!response.hasError) {
        const attachments = response.data;
        for (let i = 0; i < attachments.length; i++) {
          // Create an invisible element
          const a = document.createElement("a");
          a.style.display = "none";
          document.body.appendChild(a);
          // Set the HREF to a Blob representation of the data to be downloaded
          a.href = `data:application/pdf;base64,${attachments[i].blob}`;
          // Use download attribute to set set desired file name
          a.setAttribute("download", attachments[i].name);
          // Trigger the download by simulating click
          a.click();
          // Cleanup
          window.URL.revokeObjectURL(a.href);
          document.body.removeChild(a);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.module-container {
  text-align: center;
  max-width: 50rem;
  margin: auto;
  overflow: hidden;

  h3 {
    font-size: $largestFontSize;
    color: $whiteColor;
    margin-bottom: 0.5rem;
  }

  p {
    color: $whiteColor;
    opacity: 0.75;
  }
}

/deep/ .line-loader {
  position: relative;
  margin-top: 4rem;
}

//Light Theme styles
.light-theme {
  .module-container {
    h3,
    p {
      color: $blackColor;
    }
    p {
      opacity: $lightOpacity;
    }
  }
}
//Light Theme styles
</style>