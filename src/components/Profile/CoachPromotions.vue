<template>
  <div
    class="promotion-wrapper"
    v-if="offerTicker != undefined && offerTicker.showOffer == true"
  >
    <div class="ticker">
      <a class="ticker-item" :href="offerTicker.url">
        <span>{{ offerTicker.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoachPromotions",
  props: {
    offerTicker: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$duration: 10s;

@-webkit-keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

.promotion-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(
    to right,
    var(--brand-color),
    var(--brand-color-dark-10)
  );
  padding-left: 100%;
  z-index: 1;
  box-sizing: content-box;

  .ticker {
    display: inline-block;
    white-space: nowrap;
    padding-right: 100%;
    box-sizing: content-box;

    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-name: ticker;
    animation-duration: $duration;

    .ticker-item {
      display: inline-block;
      padding: 0.7rem 2rem 0.85rem;
      font-size: 1rem;
      border: none;
      color: var(--brand-color-dark-50)
    }
  }
}

//Light Theme Styles
.light-theme {
  .promotion-wrapper .ticker .ticker-item {
    color: var(--brand-color-light-45)
  }
}

@media screen and (min-width: $mobileWidth) {
  .promotion-wrapper {
    bottom: auto;
    top: 0;
    z-index: 10;
    padding: 0;
    text-align: center;

    .ticker {
      padding: 0;
      animation: none;
    }
  }
}
</style>
