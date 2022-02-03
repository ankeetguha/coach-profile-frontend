<template>
  <div class="ebook-preview-wrapper">
    <div class="pattern">
      <svg :data-src="require('@/assets/images/ebook-pattern.svg')" />
    </div>
    <div class="info-wrapper">
      <unicon name="paperclip"></unicon>
      <div>
        <h3>E-Book Download</h3>
        <p>
          You will receive your digital downloads on your e-mail after
          purchasing this!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EbookPreview",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ebook-preview-wrapper {
  position: relative;
  border: 1px solid #404040;
  background-color: #303030;
  padding: 1rem;
  border-radius: 0.75rem;
  padding: 0.75rem;
  overflow: hidden;

  .info-wrapper {
    position: relative;
    z-index: 1;
    padding: 0.5rem 0.25rem;
    display: flex;
    align-items: center;
  }

  .unicon /deep/ svg {
    fill: var(--brand-color);
    width: 2rem;
    height: auto;
    margin-right: 0.75rem;
  }

  h3 {
    font-size: 1rem;
    line-height: 1em;
    font-weight: $mediumFontWeight;
    color: $whiteColor;
  }

  p {
    font-size: $smallerFontSize;
    color: $whiteColor;
    opacity: 0.65;
  }
}

.pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /deep/ svg,
  /deep/ g {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: auto;
    fill: #1c1c1c;
    opacity: 0.5;
  }
}

//Light theme
.light-theme {
  .ebook-preview-wrapper {
    background-color: $whiteColor;
    border-color: darken($whiteColor, 10%);

     h3 {
       color: $blackColor;
     }

     p {
       color: lighten($blackColor, 10%);
     }
  }

  .pattern {
    /deep/ svg,
    /deep/ g {
      fill: darken($whiteColor, 5%);
    }
  }
}
</style>