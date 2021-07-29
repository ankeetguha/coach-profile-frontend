<template>
  <div class="specialities-wrapper">
    <label class="label-small">Specialities</label>
    <div class="specialities-list">
      <div class="speciality-item" v-for="speciality in specialities" :key="speciality.id">
        <div class="speciality-img-wrapper">
          <svg
            :data-src="require('@/assets/images/icons/cardio.svg')"
            class="speciality-img"
          />
        </div>
        <span>{{ speciality }}</span>
      </div>
    </div>
  </div>
</template>

<script>
//Importing libraries
import "external-svg-loader";

export default {
  name: "CoachSpecialities",
  props: {
    specialities: Array,
  },
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
        border: 2px solid $purpleColor;
      }

      .speciality-img {
        display: block;
        width: 1.85rem;
        height: auto;
        fill: $purpleColor;

        /deep/ g {
          fill: $purpleColor;
        }
      }
    }

    span {
      color: $lightWhiteColor;
      font-size: $smallFontSize;
      opacity: $lightOpacity;
    }
  }
}
</style>
