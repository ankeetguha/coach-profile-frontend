<template>
  <div class="module-container">
    <!--START: Vue Headful-->
    <vue-headful :title="meta.title" :description="meta.description" />
    <!--END: Vue Headful-->

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
export default {
  name: "Links",
  data() {
    return {
      coach: {},
      meta: {
        title: "Skipper Coach",
        description:
          "Skipper helps you find the best personal trainers and coaches to help you meet your fitness goals from home. We've got coaches for S&C, Yoga, Weight Training, Nutrition and more.",
      },
    };
  },
  props: {
    show: Boolean,
  },
  components: {},
  async created() {
    //Get coach and change meta details
    const slug = this.$route.params.slug;
    this.coach = await this.getCoach({ slug: slug });
    this.meta.title = `Coach ${this.coach.fullName} - ${this.coach.description}`;
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
  border: 2px solid $purpleColor;
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
    color: $purpleColor;
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
  background-color: $purpleColor;
  padding: 1rem;
  border-radius: 1rem;
  color: darken($purpleColor, 50%);
  border: 1px solid darken($purpleColor, 10%);
  font-size: $normalFontSize;
  margin: 1rem 1rem;
  text-decoration: none;
}
</style>