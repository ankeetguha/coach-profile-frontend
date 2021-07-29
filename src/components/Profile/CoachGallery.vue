<template>
  <!--START: Gallery Images-->
  <div class="coach-gallery">
    <!--START: Gallery Images-->
    <VueSlickCarousel
      :arrows="false"
      :dots="false"
      :centerMode="true"
      class="coach-slider"
    >
      <div v-for="coachImage in galleryImages" :key="coachImage._id">
        <img
          :src="coachImage"
          alt="Cover Image"
          class="coach-highlight-image"
        />
      </div>
    </VueSlickCarousel>
    <!--END: Gallery Images-->
  </div>
  <!--END: Gallery Images-->
</template>

<script>
//Slick carousel for gallery images
import VueSlickCarousel from "vue-slick-carousel";

export default {
  name: "CoachGallery",
  props: {
    galleryImages: Array,
  },
  components: { VueSlickCarousel },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.coach-gallery {
  margin: 2rem 1.5rem 4rem;
  display: flex;
  flex-wrap: wrap;
}

.coach-slider {
  margin-top: 2rem;
  margin-left: -1.5rem;
  width: calc(100% + 3rem);
}

.coach-slider div {
  outline: none;
}

.coach-highlight-image {
  transition: all $transitionSpeed;
  display: block;
  border-radius: 1rem;
  margin: auto;
  width: 90%;
  transform: scale(0.8);
  transform-origin: center right;
}
.coach-slider .slick-current .coach-highlight-image {
  transform: scale(1);
}
.coach-slider .slick-current + .slick-slide .coach-highlight-image {
  transform-origin: center left;
}
</style>

            