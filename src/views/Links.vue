<template>
  <div class="module-container">
    <div class="promotional-links-wrapper">
      <label class="label-small">My Links</label>
      <a
        class="promotional-link"
        target="_blank"
        v-for="link in coach.promotionalLinks"
        :key="link._id"
        :href="link.url"
        >{{ link.title }}</a
      >
    </div>
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";

export default {
  name: "Links",
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
  components: {},
  async created() {
    //Get coach and change meta details
    if (_.isEmpty(this.coach)) {
      this.coach = await this.getCoach();
    }

    this.meta.title = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogTitle = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogDescription = this.coach.description;
    this.meta.ogImage = this.coach.plans[0].coverImageURL;
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.module-container {
  text-align: center;
}

.profile-image {
  background-color: lighten($blackColor, 5%);
  position: relative;
  z-index: 1;
  border: 2px solid var(--brand-color);
  display: block;
  width: 5rem;
  padding: 0.5rem;
  margin: 2rem auto 0;
  border-radius: 50%;
}

.coach-stats {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.coach-stat {
  flex: 1;
  text-align: center;
  margin: 0 2rem 0.5rem;

  span {
    display: block;
    font-family: $titleFont;
    color: var(--brand-color);
    font-size: $largestFontSize;
    margin-bottom: 0.5rem;
  }

  label {
    font-size: $smallerFontSize;
    color: $lightWhiteColor;
    opacity: $mediumOpacity;
  }
}

.coach-name {
  position: relative;
  font-size: $largestFontSize;
  font-family: $titleFont;
  font-weight: $boldFontWeight;
  color: $whiteColor;
  margin-bottom: 1rem;
  margin-top: 1rem;
  text-transform: uppercase;

  span {
    display: block;
    position: relative;
  }

  &::before {
    display: block;
    content: "COACH";
    font-size: $largestFontSize;
    color: $blackColor;
    font-family: $titleFont;
    letter-spacing: 0.15rem;
    font-weight: 800;
    -webkit-text-stroke: 0.75px $whiteColor;
    opacity: $lightOpacity;
    margin-bottom: -1.5rem;
    z-index: -1;
  }
}

.promotional-link {
  display: block;
  background-color: var(--brand-color);
  padding: 1rem;
  border-radius: 1rem;
  color: var(--brand-color-dark-50);
  border: 1px solid var(--brand-color-dark-10);
  font-size: $normalFontSize;
  font-weight: $mediumFontWeight;
  margin: 1rem 1rem;
  text-decoration: none;
}

//Light Theme styles
.light-theme {
  .promotional-links-wrapper {
    position: relative;
    padding-bottom: 2.5rem;

    &::before {
      content: "";
      display: none;
      position: absolute;
      background: #EFEFEF;
      box-shadow: 0 -1rem 0.7rem -0.15rem rgba(212, 212, 212, .5);
      bottom: -1rem;
      left: 0;
      width: 100%;
      height: 3rem;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
    }
  }
  .promotional-link {
    background-color: $whiteColor;
    border: 1px solid darken($whiteColor, 10%);
    color: var(--brand-color);
  }
}

@media screen and (min-width: $mobileWidth) {
  .promotional-links-wrapper {
    margin: 0 auto;
    width: 50%;
    max-width: 30rem;
  }
}
</style>