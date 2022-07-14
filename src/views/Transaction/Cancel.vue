<template>
  <div class="module-container">
    <h3>You cancelled your transaction!</h3>
    <p>You'll need to book again to complete your transaction</p>
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";

export default {
  name: "TransactionCancel",
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
  },
  components: {},
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
};
</script>

<style scoped lang="scss">
.module-container {
  text-align: center;
  max-width: 50rem;
  margin: auto;
  overflow: hidden;
  margin-bottom: 5rem;
  
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