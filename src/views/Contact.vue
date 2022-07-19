<template>
  <div class="module-container">
    <h3>Contact Us</h3>
    <!--START: Enquiry Form-->
    <CoachEnquiry ref="coachEnquiry" class="coach-contact" :coach="coach"></CoachEnquiry>
    <!--END: Enquiry Form-->
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";

//Import libraries
import CoachEnquiry from "@/components/Profile/CoachEnquiry";

export default {
  name: "Contact",
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
    CoachEnquiry,
  },
  async created() {
    //Get coach and change meta details
    if (_.isEmpty(this.coach)) {
      this.coach = await this.getCoach();
    }

    this.meta.title = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogTitle = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogDescription = this.coach.description;
    this.meta.ogImage =
      this.coach.offerings != undefined
        ? this.coach.offerings[0].coverImageURL
        : this.coach.plans[0].coverImageURL;
  },
  mounted: function () {
    this.$refs.coachEnquiry.showMessageModal();
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.module-container h3 {
    margin: 0 1.5rem .5rem;
    font-size: $largeFontSize;
    color: #FFF;
}
.coach-contact /deep/ {
    .bg-overlay {
        display: none;
    }

    .intro-wrapper h3 {
        display: none;
    }

    .enquiry-modal-wrapper {
        position: relative;
        box-shadow: none;
        background-color: transparent;
        padding: 0 1.5rem 5rem;

        &::before {
            display: none;
        }
    }
}

.module-container {
  max-width: 45rem;
  margin: auto;
}


//Light Theme styles
.light-theme {
  .module-container h3 {
    color: $blackColor;
  }
}
</style>