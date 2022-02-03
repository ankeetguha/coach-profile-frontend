<template>
  <!--START: Qualifications-->
  <div
    class="coach-qualifications-wrapper"
    :class="certifications.length > 1 ? 'multiple' : ''"
    v-if="certifications.length"
  >
    <label class="label-small"><em>🏆</em> Qualifications</label>
    <VueSlickCarousel
      :arrows="false"
      :dots="false"
      :infinite="false"
      :loop="false"
      :slidesToShow="certifications.length == 1 ? 1.1 : 1.15"
      class="coach-qualifications-slider"
      v-if="this.isMobile()"
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

    <div class="qualifications-wrapper" v-else>
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
    </div>
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
  display: flex !important;
  flex-direction: row;
  align-items: stretch;
}

.coach-qualification::before {
  background-color: var(--brand-color);
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
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 5rem;
  height: 5rem;
}

.coach-qualification-badge svg {
  display: block;
  width: 70%;
  height: auto;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /deep/ g {
    fill: var(--brand-color);
  }
}

svg.coach-qualification-badge-text {
  position: absolute;
  transform: rotate(0);
  top: 0;
  left: -2.5%;
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
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.coach-qualification-description {
  margin-left: 1.5rem;
  margin-right: 0.5rem;
  width: calc(100% - 7rem);
  display: inline-block;
  vertical-align: middle;
}

.coach-qualification h3 {
  color: $whiteColor;
  font-size: $titleFont;
  font-size: 1.15rem;
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

//Light Theme styles
.light-theme {
  .coach-qualifications-slider /deep/ .slick-slide {
    background-color: $whiteColor;
    box-shadow: 0 1.5rem 0.7rem -0.1rem rgba(183, 183, 183, 0.5);
    border: 1px solid #e2e2e2;
  }
  .coach-qualifications-wrapper {
    background-color: #E8E8E8;
    padding-bottom: 1rem;
    border-radius: 0;
    overflow: visible;

    .coach-qualification {
      h3 {
        color: $blackColor;
        opacity: $mediumOpacity;
      }

      svg.coach-qualification-badge-text /deep/ g {
        fill: $blackColor;
      }
    }

    &.extended-wrapper {
      margin-top: 0;
      padding-top: 0;
    }

    &::before {
      content: "";
      display: block;
      position: absolute;
      background: #efefef;
      box-shadow: 0 -1rem 0.7rem -0.15rem rgba(208, 208, 208, 0.5);
      left: 0;
      width: 100%;
      top: 50%;
      height: 51%;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
    }
  }
}

@media screen and (min-width: $mobileWidth) {
  .coach-qualifications-wrapper {
    padding: 6rem 25% 4rem;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: stretch;

    & > .label-small {
      display: block;
      font-family: $titleFont;
      font-size: $largerFontSize;
      font-weight: $mediumFontWeight;
      color: lighten($whiteColor, 10%);
      letter-spacing: 0;
      text-transform: none;
      margin: 0 5rem 1rem 0;
      border-bottom: 1px solid lighten($blackColor, 10%);
    }

    &.multiple {
      display: block;
      text-align: left;
      padding: 6rem 15% 4rem;

      & > .label-small {
        text-align: left;
        display: inline-block;
        padding-bottom: 1rem;
        padding-right: 0.5rem;
      }
    }

    &.extended-wrapper {
      padding-top: 13rem;
      margin-top: -10rem;
    }
  }

  .qualifications-wrapper {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;

    .coach-qualification {
      position: relative;
      height: inherit !important;
      overflow: hidden;
      margin: 0 -0.5rem 0 0;
      background-repeat: no-repeat;
      padding: 1.75rem 2rem;
      box-shadow: inset 0 0 75px rgba(70, 70, 70, 0.75);
      border: 1px solid #404040;
      background-color: #1f1f1f;
      background-size: cover;
      border-radius: 1rem;

      &::before {
        right: 1.25rem;
        height: 50%;
        width: 4px;
      }
    }

    .coach-qualification-description {
      margin-left: 4.5rem;
    }

    .coach-qualification-badge {
      width: 6rem;
      left: 1.25rem;
      height: 5rem;
    }
  }

  .multiple {
    .coach-qualification {
      display: inline-block;
      width: calc(50% - 5.5rem);
      margin: 0 0.5rem 1rem;
    }
  }

  .light-theme {
    .label-small {
      color: $blackColor;
      opacity: $mediumOpacity;
      font-family: $bodyFont;
      font-size: $largeFontSize;
      font-weight: $normalFontWeight;
      border-bottom-color: #ececec;
    }

    .coach-qualification {
      background-color: $whiteColor;
      box-shadow: 0 0 0.9rem -0.2rem rgb(183, 183, 183);
      border: 1px solid #e2e2e2;
    }

    .coach-qualifications-wrapper {
      &.multiple {
        padding-bottom: 1rem;
      }

      &::before {
        top: 13em;
        height: calc(100% - 11rem);
      }
    }
  }
}
</style>
