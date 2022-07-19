<template>
  <div class="module-container">
    <h3>{{ policy.title }}</h3>
    <div v-html="policy.description" class="description"></div>
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";

export default {
  name: "Policy",
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
      policy: {
        title: this.$route.name,
        description: null,
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

    this.getPolicy();
  },
  watch: {
    $route() {
      this.getPolicy();
    },
  },
  methods: {
    getPolicy() {
      let policyType = this.getPolicyType(this.$route.name);

      this.policy.title = this.$route.name;
      this.policy.description = this.coach.policies[policyType];
    },

    getPolicyType(policyName) {
      switch (policyName) {
        case "Privacy Policy":
          return "privacyPolicy";
        case "Terms Of Use":
          return "termsOfUse";
        case "Cancellation Policy":
          return "cancellationPolicy";
        default:
          return null;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.module-container {
  text-align: left;
  max-width: 50rem;
  margin: auto;
  padding: 0 2rem;
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

.description {
  position: relative;
  padding-bottom: 5rem;

  /deep/ {
    * {
      font-size: $normalFontSize;
      color: darken($whiteColor, 18%) !important;
    }

    p,
    li {
      line-height: 1.4;
    }

    ul {
      margin-left: 1rem;
    }

    li {
      position: relative;
      margin-bottom: 1rem;

      &::before {
        position: absolute;
        display: block;
        content: "";
        height: 6px;
        top: 0.25rem;
        left: -1rem;
        width: 6px;
        border-radius: 50%;
        background-color: var(--brand-color);
      }
    }

    h3,
    h4,
    h5,
    h6 {
      color: $whiteColor !important;
      font-size: $mediumFontSize;
      * {
        color: $whiteColor !important;
        font-size: $mediumFontSize;
      }
    }
  }
}

//Light Theme styles
.light-theme {
  .module-container {
    h3,
    p {
      color: $blackColor;
    }
  }

  .description {
    /deep/ {
      * {
        color: $blackColor !important;
      }
    }
  }
}
//Light Theme styles
</style>