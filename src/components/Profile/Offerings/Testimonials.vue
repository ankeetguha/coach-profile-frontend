<template>
  <!-- START: Transformation Images-->
  <div class="transformations-wrapper">
    <span class="title"><em>🔥</em> Reviews</span>
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
            <div
              class="transformation-image-info"
              v-if="!testimonial.testimonialImageURL"
            >
              <unicon name="lock" />
              Coach has requested to keep this image private
            </div>
          </div>
          <div class="transformation-info">
            <span class="transformation-name">{{ testimonial.name }}</span>
            <p
              v-if="
                testimonial.testimonial != null &&
                testimonial.testimonial != ' '
              "
            >
              {{ testimonial.testimonial }}
            </p>
            <span class="read-more" v-if="testimonial.testimonial != null">
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
  name: "OfferingsTestimonials",
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
.title {
  display: block;
  color: $whiteColor;
  font-size: $mediumFontSize;
  font-weight: $mediumFontWeight;
  margin: 0 0 1.5rem;
}

.transformations-wrapper {
  position: relative;
  background: $blackColor;
  padding: 1.5rem 2rem 3rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  width: calc(100% - 4rem);
}

.transformations-slider {
  margin-left: -2rem;
  width: calc(100% + 4rem);
}

.transformation-block {
  background-color: #262626;
  display: block !important;
  border: 1px solid #323232;
  overflow: hidden;
  width: calc(100% - 1rem) !important;
  border-radius: 1.5rem;
  margin-left: 1.5rem;
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
  color: var(--brand-color);
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
  background: -webkit-linear-gradient(top, rgba(53, 53, 53, 0) 0, #262626 90%);
}

.transformations-block.selected {
  .read-more {
    display: none;
  }

  .transformation-info p {
    height: auto;
  }
}

.transformation-name {
  color: $whiteColor;
  display: block;
  margin-bottom: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  padding-bottom: 3px;
  text-overflow: ellipsis;
}

.transformation-profile {
  color: $lightWhiteColor;
  opacity: $lightOpacity;
  display: block;
  font-size: $smallerFontSize;
  white-space: nowrap;
  padding-bottom: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.transformation-image-wrapper {
  position: relative;
  z-index: 10;

  .transformation-image-info {
    position: absolute;
    text-align: center;
    transform: translateY(-50%);
    color: $whiteColor;
    opacity: $mediumOpacity;
    margin: 0 2rem;
    top: 50%;
    left: 0;
    right: 0;

    /deep/ .unicon {
      display: block;
      margin-bottom: 0.5rem;

      svg {
        width: 2rem;
        height: auto;
        fill: $whiteColor;
      }
    }
  }
}

//Light Theme styles
.light-theme {
  .label-small,
  .transformations-slider {
    position: relative;
    z-index: 2;
  }

  .title {
    position: relative;
    color: $blackColor;
    z-index: 1;
  }

  .transformations-wrapper {
    position: relative;
    background-color: $lightWhiteColor;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding-bottom: 0;
    padding-top: 3rem;

    &::before {
      z-index: 1;
      content: "";
      display: block;
      position: absolute;
      background: #f7f7f7;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100% - 5rem);
      box-shadow: 0 1rem 1rem -0.1rem rgba(88, 88, 88, 0.1);
      border-bottom-left-radius: 2rem;
      border-bottom-right-radius: 2rem;
    }

    &::after {
      z-index: 0;
      content: "";
      display: block;
      position: absolute;
      background: #f7f7f7;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .transformation-block {
    background-color: $whiteColor;
    border-color: lighten($greyBorderColor, 5%);
  }

  .transformation-info .read-more::before {
    background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0, #fff);
  }

  .transformation-profile,
  .transformation-name,
  .transformation-info p {
    color: $blackColor;
  }

  .transformation-info p {
    border-color: $greyBorderColor;
  }
}

@media screen and (min-width: $mobileWidth) {
  .label-small {
    font-family: $titleFont;
    font-size: $largerFontSize;
    font-weight: $mediumFontWeight;
    color: lighten($whiteColor, 10%);
    letter-spacing: 0;
    text-transform: none;
    margin: 0 0 1.5rem;
  }

  .transformations-wrapper {
    width: auto;
    padding: 3rem 20% 4rem;
  }

  /deep/ {
    .slick-track {
      width: 100% !important;
    }

    .slick-slide {
      width: 33% !important;
    }
  }

  .light-theme {
    .label-small {
      font-family: $bodyFont;
      font-size: $largeFontSize;
      font-weight: $normalFontWeight;
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .transformations-wrapper {
    .title {
      font-size: 1.05rem;
      margin-left: 1rem;
    }
  }

  .transformations-slider {
    margin-left: -3rem;
    width: calc(100% + 7rem);

    &::after {
      content: "";
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 25%;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        rgb(39, 39, 39) 80%
      );
    }
  }

  //Light theme
  .light-theme {
    .transformations-slider {
      &::after {
        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, #f7f7f7 80%);
      }
    }
  }
}
</style>
