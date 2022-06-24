<template>
  <div class="specialities-wrapper">
    <label class="label-small">Areas Of Expertise</label>
    <div class="specialities-list">
      <div
        class="speciality-item"
        v-for="expertise in coachExpertise"
        :key="expertise.id"
      >
        <div class="speciality-img-wrapper">
          <font-awesome-icon
            :icon="`fa-fw fa-solid fa-${expertise.icon}`"
            class="speciality-img"
          />
        </div>
        <span>{{ expertise.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoachExpertise",
  props: {
    coachExpertise: Array,
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.specialities-wrapper {
  position: relative;
  padding: 3rem 1.5rem 0;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  background: $blackColor;
  text-align: center;

  .specialities-list {
    margin: 0;
  }

  .speciality-item {
    display: inline-block;
    vertical-align: top;
    width: calc(33.33% - 1rem);
    margin: 1rem 0.5rem;

    .speciality-img-wrapper {
      position: relative;
      display: table;
      margin: 0 auto 1.25rem;
      background-color: lighten($blackColor, 10%);
      border-radius: 50%;
      padding: 0.55rem;

      &::before {
        display: block;
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        height: calc(100% + 8px);
        width: calc(100% + 8px);
        border: 2px solid var(--brand-color);
      }

      .speciality-img {
        display: block;
        width: 1.35rem;
        height: 1.35rem;
        color: var(--brand-color);
      }
    }

    span {
      color: $lightWhiteColor;
      font-size: $smallFontSize;
      opacity: $lightOpacity;
    }
  }
}

//Light Theme styles
.light-theme {
  .specialities-wrapper {
    background-color: $lightWhiteColor;
    box-shadow: 0 -1rem 0.7rem -0.15rem rgba(162, 162, 162, 0.2);
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;

    .speciality-img-wrapper {
      background-color: #e8e8e8;

      &::before {
        border: 1px solid #cfcfcf;
      }
    }
    .speciality-img-wrapper {
      .speciality-img {
        color: #828282;
      }
    }
    
    span {
      color: $blackColor;
    }
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
    margin: 0 0 2rem;
  }

  .specialities-wrapper {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding-bottom: 2rem;
    background-color: transparent;

    &::before {
      content: "";
      display: block;
      position: absolute;
      background-color: $blackColor;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      top: calc(50% + 1.5rem);
      left: 0;
      height: 50%;
      width: 100%;
      z-index: -1;
    }

    .speciality-item {
      width: 10rem;
      border-radius: 0.75rem;
      padding: 0.5rem 0 1rem;
      border: 1px solid lighten($blackColor, 13%);
      background-color: lighten($blackColor, 10%);
      box-shadow: 0 0 0.7rem -0.1rem #181818;
      margin: 0 1rem;

      .speciality-img-wrapper {
        display: block;
        background-color: transparent;
        padding: 0;
        margin: auto;

        .speciality-img {
          width: 3.5rem;
          margin: auto;
        }

        &::before {
          display: none;
        }
      }

      span {
        display: block;
        margin-top: 0.5rem;
        padding-top: 1rem;
        border-top: 1px solid lighten($blackColor, 5%);
        font-size: $normalFontSize;
        font-weight: $mediumFontWeight;
      }
    }
  }

  .light-theme {
    .label-small {
      font-family: $bodyFont;
      font-size: $largeFontSize;
      font-weight: $normalFontWeight;
    }

    .speciality-item {
      background-color: $whiteColor;
      border: 1px solid #f1f1f1;
      box-shadow: 0 0 0.7rem -0.1rem #c3c3c3;

      span {
        border-top: 1px solid #e6e6e6;
        color: $greyColor;
      }
    }
  }
}
</style>
