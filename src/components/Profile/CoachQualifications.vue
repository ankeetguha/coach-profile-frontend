<template>
  <!--START: Qualifications-->
  <div class="coach-qualifications-wrapper" v-if="certifications.length">
    <label class="label-small"><em>🏆</em> Qualifications</label>
    <VueSlickCarousel
      :arrows="false"
      :dots="false"
      :infinite="false"
      :loop="false"
      :slidesToShow="certifications.length == 1 ? 1.1 : 1.15"
      class="coach-qualifications-slider"
    >
      <div
        v-for="certification in certifications"
        :key="certification.id"
        class="coach-qualification"
      >
        <div class="coach-qualification-badge">
          <svg
            :data-src="require('@/assets/images/icons/badge-flash-circle.svg')"
            class="coach-qualification-badge-text"
          />
          <svg :data-src="require('@/assets/images/icons/badge-flash.svg')" />
        </div>
        <div class="coach-qualification-description">
          <label class="label-small">{{ certification.category }}</label>
          <h3>{{ certification.title }}</h3>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
  <!--END: Qualifications-->
</template>

<script>
//Importing libraries
import "external-svg-loader";
import VueSlickCarousel from "vue-slick-carousel";

export default {
  name: "CoachQualifications",
  props: {
    certifications: Array,
  },
  components: {
    VueSlickCarousel,
  },
};
</script>

<style scoped lang="scss">
.coach-qualifications-wrapper {
  position: relative;
  overflow: hidden;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  background: $blackColor;
  padding: 3rem 1rem 3rem;
  margin: 0;
  width: calc(100% - 2rem);

  &.extended-wrapper {
    padding-top: 13rem;
    margin-top: -13rem;
  }
}

.coach-qualifications-wrapper > .label-small {
  text-align: left;
  margin-left: 0.5rem;
  margin-bottom: 1.5rem;
}

.coach-qualifications-list {
  margin: 0;
}

.coach-qualification {
  position: relative;
  text-align: left;
  outline: none;
}

.coach-qualification::before {
  background-color: $purpleColor;
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -0.5rem;
  height: 90%;
  width: 5px;
  border-radius: 1rem;
}

.coach-qualification-badge {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -0.5rem;
  width: 4.75rem;
}

.coach-qualification-badge svg {
  display: block;
  width: 70%;
  height: auto;
  margin: auto;

  /deep/ g {
    fill: $purpleColor;
  }
}

svg.coach-qualification-badge-text {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  top: 50%;
  left: 50%;
  width: 105%;
  height: auto;
  transform-origin: center center;
  animation-name: rotateBadgeText;
  animation-duration: 30s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  /deep/ g {
    fill: $lightWhiteColor;
    opacity: $lightOpacity;
  }
}

@keyframes rotateBadgeText {
  0% {
    transform: translateY(-50%) translateX(-50%) rotate(0);
  }

  100% {
    transform: translateY(-50%) translateX(-50%) rotate(360deg);
  }
}

.coach-qualification-description {
  margin-left: 5.75rem;
  margin-right: 0.5rem;
}

.coach-qualification h3 {
  color: $whiteColor;
  font-size: $titleFont;
  font-size: $largeFontSize;
  text-transform: capitalize;
}

.coach-qualification .label-small {
  color: $whiteColor;
  font-size: $smallestFontSize;
  font-weight: $mediumFontWeight;
  opacity: 0.7;
  margin-bottom: 0.3rem;
}

.coach-qualifications-slider {
  margin-left: -1.5rem;
  width: calc(100% + 3rem);
}

.coach-qualifications-slider /deep/ .slick-track {
  display: flex !important;
  flex-direction: row;
  align-items: stretch;
}

.coach-qualifications-slider /deep/ .slick-slide {
  position: relative;
  height: inherit !important;
  overflow: hidden;
  margin: 0 -0.5rem 0 2rem;
  background-repeat: no-repeat;
  padding: 1.75rem 2rem;
  box-shadow: inset 0 0 75px rgba(70, 70, 70, 0.75);
  border: 1px solid #404040;
  background-color: #1f1f1f;
  background-size: cover;
  border-radius: 1rem;
}
</style>
