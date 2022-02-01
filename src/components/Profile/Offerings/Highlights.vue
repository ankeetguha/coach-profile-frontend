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
            <span class="label">Highlight</span>
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
  display: block;
  color: $whiteColor;
  font-size: $normalFontSize;
  font-weight: $mediumFontWeight;
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
  border: 1px solid #363636;
  background-color: #282828;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem 1rem;
  margin: 0 1.5rem 1rem;
  width: calc(100% - 5rem - 2px) !important;

  .highlight-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .icon-wrapper {
    position: relative;
    margin-right: 1.5rem;

    &::before {
      content: "";
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      border-radius: 50%;
      border: 1px dashed lighten($blackColor, 20%);
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
          fill: $yellowColor;
        }
      }
    }
  }
}

.info-wrapper {
  h3 {
    font-size: $smallFontSize;
    color: $whiteColor;
  }

  p {
    font-size: $smallerFontSize;
    color: $whiteColor;
    opacity: 0.65;
    margin-bottom: 1.25rem;
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

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .offering-highlights {
    margin-top: 5rem;

    .title {
      font-size: 1.05rem;
      margin-left: 0;
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
