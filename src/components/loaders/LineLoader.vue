<template>
  <div class="line-loader" :class="{ animate: showLoader }">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "LineLoader",
  props: {
    showLoader: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
$loaderColor: $greenColor;

.line-loader {
  transition: all $transitionSpeed;
  width: 100%;
  height: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  overflow: hidden;
  z-index: 47;
  > div {
    display: block;
    position: absolute;
    height: 100%;
    left: 50%;
  }
  div:nth-child(1) {
    background-color: darken($loaderColor, 0%);
  }
  div:nth-child(2) {
    background-color: darken($loaderColor, 10%);
  }
  div:nth-child(3) {
    background-color: darken($loaderColor, 20%);
  }
  div:nth-child(4) {
    background-color: darken($loaderColor, 30%);
  }
}

.line-loader.animate {
  height: 13px;
  opacity: 1;
  div:nth-child(1) {
    animation: stretch 2.8s ease 0s infinite;
  }
  div:nth-child(2) {
    animation: stretch 2.8s ease 0.4s infinite;
  }
  div:nth-child(3) {
    animation: stretch 2.8s ease 0.5s infinite;
  }
  div:nth-child(4) {
    animation: stretch 2.8s ease 0.9s infinite;
  }
}

@keyframes stretch {
  0% {
    padding: 0 0 0 0;
    left: 50%;
    z-index: 4;
  }
  25% {
    z-index: 3;
  }
  50% {
    padding: 0 50% 0 50%;
    left: 0;
    z-index: 2;
  }
  100% {
    padding: 0 50% 0 50%;
    left: 0;
    z-index: 1;
  }
}
</style>