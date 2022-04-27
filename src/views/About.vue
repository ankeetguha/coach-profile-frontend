<template>
  <div v-if="coach.fullName != undefined" class="module-container">
    <!--START: Hero-->
    <div v-if="coach.coverVideoURL != undefined" class="video-wrapper">
      <div class="video-button">
        <unicon name="play" />
        <span>Watch Video</span>
      </div>
      <video muted autoplay loop>
        <source :src="coach.coverVideoURL" type="video/mp4" />
      </video>
    </div>
    <!--END: Hero-->

    <!--START: Statistics-->
    <div class="coach-stats">
      <div class="coach-stat" v-if="coach.yearsOfExperience">
        <span>{{ coach.yearsOfExperience }}+</span>
        <label>Years Of Experience</label>
      </div>
      <div class="coach-stat" v-if="coach.clientsTrained">
        <span>{{ coach.clientsTrained }}+</span>
        <label>Clients Trained</label>
      </div>
    </div>
    <!--END: Statistics-->

    <div class="about-description-wrapper">
      <label class="label-small">About Coach</label>
      <p class="about-description">
        {{ coach.description }}
      </p>
    </div>

    <!--START: Gallery Images-->
    <CoachGallery
      v-if="coach.gallery != undefined && coach.gallery.length > 0"
      :galleryImages="coach.gallery"
    ></CoachGallery>
    <!--END: Gallery Images-->

    <!--START: Qualifications-->
    <CoachQualifications
      :class="
        coach.gallery != undefined && coach.gallery.length > 0
          ? 'extended-wrapper'
          : ''
      "
      :certifications="coach.certifications"
    ></CoachQualifications>
    <!--END: Qualifications-->
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";

//Imoprt components
import CoachGallery from "@/components/Profile/CoachGallery";
import CoachQualifications from "@/components/Profile/CoachQualifications";

export default {
  name: "About",
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
    CoachGallery,
    CoachQualifications,
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
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.module-container {
  text-align: center;
}

.video-wrapper {
  position: relative;
  overflow: hidden;
  height: 10rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  margin-bottom: -3rem;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.35);
    content: "";
    display: block;
  }

  .video-button {
    position: absolute;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: -1.25rem;
    filter: drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.7));

    .unicon {
      background: rgba(0, 0, 0, 0.35);
      border: 2px solid rgba(0, 0, 0, 0.15);
      border-radius: 50%;
      padding: 0.5rem 0.55rem;

      /deep/ svg {
        fill: $whiteColor;
        opacity: $lightOpacity;
      }
    }

    span {
      display: block;
      color: $whiteColor;
      font-size: $smallestFontSize;
      opacity: $lightOpacity;
      margin-top: 0.5rem;
    }
  }

  video {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 130%;
  }
}

.hero-image {
  width: 100%;
  display: block;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.about-description-wrapper {
  margin: 2rem 2rem 4rem;

  .label-small {
    font-size: $smallestFontSize;
    margin-bottom: 1rem;
  }

  .about-description {
    color: $whiteColor;
  }
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

.coach-stat {
  display: inline-block;
  vertical-align: bottom;
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

//Light Theme styles
.light-theme {
  .coach-stat label,
  .about-description {
    color: $blackColor;
    opacity: $lightOpacity;
  }

  .coach-gallery {
    margin: 3.5rem 1.5rem 4rem;
  }

  .coach-stats {
    margin-top: 1rem;
  }

}

@media screen and (min-width: $mobileWidth) {
  .coach-stats {
    margin: 0 20%;
    display: block;

    .coach-stat {
      display: inline-block;
      vertical-align: bottom;

      span {
        font-size: $extraLargeFontSize;
      }
    }
  }

  .about-description-wrapper {
    margin: 3rem auto;
    max-width: 30rem;

    .about-description {
      font-size: $mediumFontSize;
      line-height: 1.4;
    }
  }
}
</style>