<template>
  <!--START: Gallery Images-->
  <div class="coach-gallery">
    <!--START: Gallery Images-->
    <VueSlickCarousel
      :arrows="false"
      :dots="false"
      :centerMode="isMobile()"
      :infinite="isMobile()"
      :initialSlide="0"
      :slidesToShow="isMobile() ? 1.5 : 3"
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
  position: relative;
  margin: 2rem 1.5rem 4rem;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;

  * {
    outline: none !important;
  }
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

@media screen and (min-width: $mobileWidth) {
  .coach-gallery {
    margin: 3rem 0 0;
    padding: 0 0;
    width: auto;
    display: block;
  }

  .coach-slider {
    width: auto;
    margin: 3rem 0 0;
  }

  .coach-highlight-image {
    display: inline-block;
    // width: calc(33.33% - 1.5rem);
    margin: 0 0.75rem 1.5rem;
    transform: scale(1);
  }

  /deep/ {
    .slick-slide img {
      transform: scale(0.9) !important;
      transform-origin: center center;
    }

    .slick-slide:nth-child(2n) img {
      transform: scale(1) !important;
    }
  }
}
</style>

            