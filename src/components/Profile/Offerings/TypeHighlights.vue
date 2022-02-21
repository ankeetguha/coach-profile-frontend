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

      <!--START: Video Course-->
      <div
        v-show="offeringType == 'video-course'"
        class="highlights-list"
        :class="offeringType"
      >
        <div class="highlight">
          <unicon name="video"></unicon>
          <span>Guided Videos</span>
        </div>
        <div class="highlight">
          <unicon name="bolt-alt"></unicon>
          <span>Client Dashboard</span>
        </div>
      </div>
      <!--END: Video Course-->

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
        case "video-course":
          return "Video Course";
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
  display: block;
  font-size: $smallFontSize;
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
      font-size: $smallFontSize;
      opacity: 0.65;
    }
  }

  .highlights-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;

    &.e-book,
    &.diy-plan,
    &.video-course {
      /deep/ svg {
        fill: $yellowColor;
      }
    }
  }
}

//Light Theme styles
.light-theme {
  .offering-type-highlights {
    .title {
      color: #807e7e;
      opacity: 1;
      display: table;
      text-transform: none;
      letter-spacing: 0;
      background: #ececec;
      padding: 0.4rem 0.5rem;
      border-radius: 0.5rem;
    }

    .highlight {
      .unicon {
        /deep/ svg {
          fill: var(--brand-color);
        }
      }

      span {
        color: lighten($blackColor, 5%);
      }
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .offering-type-highlights {
    height: 3rem;
  }

  //Light theme
  .light-theme {
    .offering-type-highlights .title {
      background-color: var(--brand-color);
      border-color: var(--brand-color-light-10);
      color: $whiteColor;
    }
  }
}
</style>
