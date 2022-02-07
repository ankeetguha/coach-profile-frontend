<template>
  <div class="booking-wrapper show">
    <div class="booking-modal show">
      <div class="scroll-wrapper">
        <!--START: Title Wrapper-->
        <div class="hero-wrapper">
          <h3>{{ offering.title }}</h3>
          <span v-if="selectedVariant.title != undefined">{{
            selectedVariant.title
          }}</span>
        </div>
        <!--END: Title Wrapper-->

        <!--START: Price Details-->
        <PriceDetails :variant="selectedVariant"></PriceDetails>
        <!--END: Price Details-->
      </div>

      <!--START: Button Actions-->
      <div class="btn-wrapper">
        <button type="button" class="btn btn-primary" @click="showBooking">
          Make Payment
        </button>
      </div>
      <!--END: Button Actions-->
    </div>
  </div>
</template>

<script>
//Import components
import PriceDetails from "./PriceDetails";

export default {
  name: "OfferingBookingDesktopForm",
  components: {
    PriceDetails,
  },

  props: {
    coach: Object,
    offering: Object,
    selectedVariant: Object,
    selectedVariantIndex: Number,
  },

  methods: {
    showBooking() {
      this.$emit("showBooking");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.booking-wrapper,
.bg-overlay {
  display: none !important;
  &.show {
    display: block;
  }
}
.booking-modal {
  transition: all 0.3s;
  background-color: $blackColor;
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100%);
  height: calc(100vh);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-shadow: 0 -1rem 0.7rem -0.15rem rgba(41, 41, 41, 0.35);
  transform: translateY(calc(100vh + 3rem));
  z-index: 5;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    box-shadow: inset 0 0 2000px rgba(183, 183, 183, 0.15);
    opacity: 0.45;
    z-index: -1;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }

  &.show {
    transform: translateY(0);
    z-index: 105;
  }
}

.hero-wrapper {
  border-bottom: 1px solid lighten($blackColor, 15%);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;

  h3 {
    font-size: $largeFontSize;
    font-weight: $mediumFontWeight;
    color: $whiteColor;
  }

  span {
    display: table;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    font-weight: $mediumFontWeight;
    background-color: var(--brand-color);
  }
}

.btn-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem;
  width: calc(100% - 2rem);

  .btn {
    margin: 0 0.25rem;

    &[disabled] {
      color: $whiteColor !important;
      background-color: transparent !important;
      opacity: 0.25;
    }
  }
}

//Light theme
.light-theme {
  .booking-modal {
    box-shadow: 0 0 0.7rem -0.15rem rgba(41, 41, 41, 0.35);
  }

  /deep/ .secure-wrapper span {
    color: $whiteColor;
  }

  .hero-wrapper {
    span {
      color: $whiteColor;
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .booking-wrapper {
    display: block !important;
  }

  .bg-overlay {
    display: none !important;
  }

  .header-wrapper {
    position: fixed;
  }

  .booking-modal {
    top: 6rem;
    bottom: auto;
    left: auto;
    border: 1px solid lighten($blackColor, 15%);
    padding: 1rem 1.25rem 1rem;
    left: calc(13.5vw + 42vw + 3rem);
    width: 27.5vw;
    height: auto;
    border-radius: 1.5rem;
    padding-bottom: 1.5rem;

    &.show {
      z-index: 10;
    }

    .client-form {
      display: none;
    }

    .btn-wrapper {
      position: relative;
      margin: 1.5rem 0 0;
      width: 100%;

      .btn {
        flex: 1;
      }
    }

    &::before {
      height: auto;
      border-radius: 1.5rem;
    }
  }

  //Light theme
  .light-theme {
    /deep/ .secure-wrapper span {
      color: $whiteColor;
    }
  }
}
</style>

            