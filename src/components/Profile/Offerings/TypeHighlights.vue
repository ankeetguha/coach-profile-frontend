<template>
  <div class="offering-type-highlights">
    <span class="title">{{ getOfferingType() }}</span>
    <div class="offering-highlights">
      <!--START: Online Plans-->
      <div
        v-show="offeringType == 'diy-plan'"
        class="highlights-list"
        :class="offeringType"
      >
        <div class="highlight">
          <unicon name="dumbbell"></unicon>
          <span>Workout Calendar</span>
        </div>
        <div class="highlight">
          <unicon name="bolt-alt"></unicon>
          <span>Client Dashboard</span>
        </div>
      </div>
      <!--END: Online Plans-->

      <!--START: E-Book-->
      <div
        v-show="offeringType == 'e-book'"
        class="highlights-list"
        :class="offeringType"
      >
        <div class="highlight">
          <unicon name="import"></unicon>
          <span>Digital E-Book Downloads</span>
        </div>
      </div>
      <!--END: E-Book-->
    </div>
  </div>
</template>

<script>
export default {
  name: "OfferingTypeHighlights",
  props: {
    offeringType: String,
  },

  methods: {
    getOfferingType() {
      switch (this.offeringType) {
        case "personal-training":
          return "Personal Training";
        case "e-book":
          return "E-Book";
        case "diy-plan":
          return "DIY Online Plan";
        default:
          return null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.offering-type-highlights {
  padding: 0;
  margin: 0;
}

.title {
  font-size: $smallestFontSize;
  font-weight: $mediumFontWeight;
  color: $whiteColor;
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  margin: 0.25rem 0 0;
}

.offering-highlights {
  display: flex;
  flex-direction: row;
  align-items: center;

  .highlight {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 1rem;

    /deep/ svg {
      height: auto;
      width: 1rem;
      margin-right: 0.25rem;
      fill: var(--brand-color);
    }

    span {
      color: $whiteColor;
      font-size: $smallerFontSize;
      opacity: 0.65;
    }
  }

  .highlights-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;

    &.e-book,
    &.diy-plan {
      /deep/ svg {
        fill: $yellowColor;
      }
    }
  }
}
</style>
