<template>
  <!-- START: Transformation Images-->
  <div class="transformations-wrapper">
    <label class="label-small"><em>🔥</em> Transformations</label>
    <VueSlickCarousel
      class="transformations-slider"
      :arrows="false"
      :dots="false"
      :infinite="false"
      :slidesToShow="1.5"
    >
      <div
        class="transformations-block"
        v-for="testimonial in testimonials"
        :key="testimonial.id"
        :class="{ selected: testimonial.selected }"
        @click="$set(testimonial, 'selected', !testimonial.selected)"
      >
        <div class="transformation-block">
          <div class="transformation-image-wrapper">
            <img
              :src="testimonial.testimonialImageURL"
              :alt="testimonial.name + ' Testimonial'"
              v-if="testimonial.testimonialImageURL"
              class="transformation-image"
            />
            <img
              src="@/assets/images/no-transformation.jpg"
              :alt="testimonial.name + ' Testimonial'"
              v-else
              class="transformation-image"
            />
            <div class="transformation-image-info" v-if="!testimonial.testimonialImageURL">
              <unicon name="lock" />
              Coach {{ coachName | firstName }} requested to keep this image
              hidden
            </div>
          </div>
          <div class="transformation-info">
            <span class="transformation-name">{{ testimonial.name }}</span>
            <span class="transformation-profile">{{
              testimonial.designation
            }}</span>
            <p v-if="testimonial.testimonial != ''">
              {{ testimonial.testimonial }}
            </p>
            <span class="read-more" v-if="testimonial.testimonial != ''">
              <em>Read More</em>
            </span>
          </div>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
  <!--END: Transformation Images -->
</template>

<script>
//Importing libraries
import VueSlickCarousel from "vue-slick-carousel";

export default {
  name: "CoachTransformations",
  props: {
    testimonials: Array,
    coachName: String,
  },
  components: {
    VueSlickCarousel,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.transformations-wrapper {
  position: relative;
  background: $blackColor;
  padding: 3rem 2rem;
  width: calc(100% - 4rem);
}

.transformations-slider {
  margin-left: -2rem;
  width: calc(100% + 4rem);
}

.transformation-block {
  background-color: #353535;
  display: block !important;
  border: 1px solid #444;
  overflow: hidden;
  width: calc(100% - 1.5rem) !important;
  border-radius: 1.5rem;
  margin-left: 2rem;
}

.transformation-block img {
  display: block;
  padding: 5px;
  width: calc(100% - 10px);
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}

.transformation-info {
  text-align: center;
  padding: 0.5rem 1rem 1rem;
}

.transformation-info p {
  color: $lightWhiteColor;
  font-size: $smallerFontSize;
  border-top: 1px solid #5f5f5f;
  overflow: hidden;
  height: 3.2rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
}

.transformation-info .read-more {
  color: $purpleColor;
  position: relative;
  display: block;
  font-weight: $mediumFontWeight;
  font-size: $smallestFontSize;
  padding: 0.5rem 0 0;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  z-index: 1;
}

.transformation-info .read-more:before {
  display: block;
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7rem;
  z-index: -1;
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0, #353535);
}

.transformation-name {
  color: $whiteColor;
  display: block;
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.transformation-profile {
  color: $lightWhiteColor;
  opacity: $mediumOpacity;
  display: block;
  font-size: $smallFontSize;
}
</style>
