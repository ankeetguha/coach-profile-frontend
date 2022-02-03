<template>
  <div>
    <div class="buffer-hero">
      <div class="buffer-page-image"></div>
      <div class="buffer-title"></div>
      <div class="buffer-line"></div>
      <div class="buffer-line"></div>
    </div>
    <div class="buffer-category"></div>
    <div class="buffer-category"></div>
  </div>
</template>

<script>
export default {
  name: "PageLoader",
};
</script>

<style scoped lang="scss">
.buffer-hero {
  background-color: $blackColor;
  text-align: center;
  padding: 2rem 5rem;
  margin-bottom: 2rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
}

.buffer-background {
  animation-duration: 2.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: bufferAnimation;
  animation-timing-function: linear;
  background: lighten($blackColor, 10%);
  background: linear-gradient(
    to right,
    lighten($blackColor, 8%) 8%,
    lighten($blackColor, 10%) 18%,
    lighten($blackColor, 15%) 74%
  );
  background-size: 800px 104px;
  height: 96px;
  border-radius: 0.3rem;
  position: relative;
}

.buffer-title {
  @extend .buffer-background;
  border-radius: 0.3rem;
  height: 2rem;
  width: 60%;
  margin: 0 auto 0.8rem;
}

.buffer-small-title {
  @extend .buffer-title;
  height: 1.4rem;
}

.buffer-image-small {
  @extend .buffer-title;
  height: 8rem;
  width: 100%;
}

.buffer-line {
  @extend .buffer-background;
  height: 1rem;
  width: 90%;
  margin: 0.3rem auto;
}

.buffer-category {
  @extend .buffer-background;
  border-radius: 1rem;
  height: 9rem;
  width: 80%;
  margin: 1rem auto 1rem;
}

.buffer-page-loader {
  transition: all $transitionSpeed;
  background-color: #f1f1f1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  transform: translateX(110%);
}

.buffer-page-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: -2rem auto 0;
}

.buffer-page-loader.show {
  transform: translateX(0);
}

.buffer-page-image::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(0);
  animation: 1.5s adjust-hue infinite linear;
}

.buffer-page-image img {
  display: block;
  width: 100%;
}

.buffer-page-image {
  @extend .buffer-background;
  position: relative;
  display: block;
  border-radius: 50%;
  background-color: $whiteColor;
  margin: 0 auto 1.5rem;
  width: 3.5rem;
  height: 3.5rem;
  padding: 1rem;
}

.buffer-page-wrapper span {
  display: block;
  text-align: center;
  font-weight: $boldFontWeight;
  color: $greyColor;
}

@keyframes bufferAnimation {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}


//Light theme
.light-theme {
  .buffer-hero {
    background-color: $whiteColor;
  }

  .buffer-background {
    background: linear-gradient(to right, #d4d4d4 8%, #cdcdcd 18%, #eaeaea 74%)
  }
}
</style>