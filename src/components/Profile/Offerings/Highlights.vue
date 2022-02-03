<template>
  <div class="offering-highlights">
    <span class="title">🎉 Highlights</span>
    <!--START: Highlights-->
    <div class="highlights">
      <div
        class="highlight"
        v-for="highlight in highlights"
        :key="highlight.id"
      >
        <div class="highlight-wrapper">
          <div class="icon-wrapper">
            <svg :data-src="require('@/assets/images/icons/badge-flash.svg')" />
          </div>
          <div class="info-wrapper">
            <h3>{{ highlight.title }}</h3>
            <p>{{ highlight.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--END: Highlights-->
  </div>
</template>

<script>
export default {
  name: "OfferingHighlights",
  props: {
    highlights: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.title {
  position: relative;
  display: block;
  color: $whiteColor;
  font-size: $mediumFontSize;
  font-weight: $mediumFontWeight;
  z-index: 5;
  margin: 0 1.5rem 1.5rem;
}

.offering-highlights {
  position: relative;
  margin: 3rem 0 0;
  padding-bottom: 2rem;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 5rem;
    left: 0;
    width: 100%;
    height: calc(100% - 5rem);
    background-color: $blackColor;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }
}

.highlight {
  position: relative;
  background-color: #f4d03f;
  border-color: #e0bc2f;
  border-radius: 0.75rem;
  padding: 1.05rem 1.25rem 1.25rem;
  margin: 0 1.5rem 1rem;
  width: calc(100% - 5rem - 2px) !important;

  .highlight-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .icon-wrapper {
    position: relative;
    margin-right: 1.15rem;

    &::before {
      content: "";
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      border-radius: 0.5rem;
      background: #e4be22;
    }

    /deep/ {
      svg {
        position: relative;
        display: block;
        margin: auto;
        width: 3rem;
        padding: 0.25rem;
        height: auto;

        g {
          fill: #675404;
        }
      }
    }
  }
}

.info-wrapper {
  h3 {
    font-size: $mediumFontSize;
    color: #372c00;
  }

  p {
    font-size: $normalFontSize;
    color: #574700;
  }
}

.label {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  font-size: $smallestFontSize;
  display: table;
  background: #181818;
  padding: 0.35rem;
  border-radius: 0.25rem;
  color: #7a7a7a;
}

//Light Theme
.light-theme {
  .title {
    color: $blackColor;
  }

  .offering-highlights {
    &::before {
      background-color: $whiteColor;
      border-top-left-radius: 1.5rem;
      border-top-right-radius: 1.5rem;
    }
  }

}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .offering-highlights {
    margin-top: 5rem;

    &::before {
      left: -13.5vw;
      width: 100vw;
      height: calc(100% + 3rem);
      top: -2rem;
      border-radius: 0;
    }

    .title {
      font-size: 1.05rem;
      margin-left: 0;
    }

    .highlight {
      margin: 0 0 1rem;
      padding: 1.5rem;
      width: calc(100% - 2rem - 2px) !important
    }
  }

  .info-wrapper {
    h3 {
      font-size: $normalFontSize;
    }
    p {
      font-size: $smallFontSize;
    }
  }
}
</style>
