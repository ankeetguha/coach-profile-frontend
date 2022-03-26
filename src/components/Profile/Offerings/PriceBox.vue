<template>
  <div class="price-box" @click="showBookingForm">
    <div class="price-info-wrapper">
      <span class="price-icon">₹</span>
      <!--START: Offering Price-->
      <div class="price-wrapper">
        <label>Get this for </label>
        <span class="offering-price">
          ₹<em>{{
            getOfferingPrice.discountedPrice != null
              ? convertToIndianNumber(getOfferingPrice.discountedPrice)
              : convertToIndianNumber(getOfferingPrice.originalPrice)
          }}</em>
        </span>
        <span
          class="slashed-price"
          v-show="getOfferingPrice.discountedPrice != null"
        >
          <em>₹</em>{{ convertToIndianNumber(getOfferingPrice.originalPrice) }}
        </span>
      </div>
      <!--START: Offering Price-->
    </div>
    <div class="filler"></div>
    <button v-if="activatePayment" class="btn btn-primary">Book Now</button>
    <span v-else class="sold-out">
      Sold Out
    </span>
  </div>
</template>

<script>
export default {
  name: "OfferingPriceBox",
  props: {
    price: Object,
    activatePayment: Boolean
  },

  methods: {
    showBookingForm() {
      this.$emit("showBookingForm");
    },
  },

  computed: {
    getOfferingPrice: function () {
      var originalPrice = null,
        discountedPrice = null;

      //Check for variant pricing
      if (this.price.originalPrice != undefined) {
        originalPrice = this.price.originalPrice;
        if (this.price.discountedPrice != undefined)
          discountedPrice = this.price.discountedPrice;
      }

      return { originalPrice: originalPrice, discountedPrice: discountedPrice };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.price-box {
  background-color: $blackColor;
  position: fixed;
  z-index: 11;
  bottom: 0;
  left: 0;
  padding: 1rem 1.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  width: calc(100% - 3rem);
  box-shadow: 0 0 2.7rem -0.15rem #141414;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.filler {
  flex-grow: 1;
}

.price-info-wrapper {
  display: table;
  border-radius: 0.5rem;

  .angle-icon {
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.5rem;

    /deep/ svg {
      width: 1.25rem;
      height: auto;
      fill: $whiteColor;
      opacity: 0.65;
    }
  }
}

.price-icon {
  font-size: $mediumFontSize;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.75rem;
  color: darken($darkGreenColor, 30%);
  background-color: $darkGreenColor;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}

.price-wrapper {
  display: inline-block;
  vertical-align: middle;

  label {
    display: block;
    font-size: $smallerFontSize;
    color: $whiteColor;
    opacity: 0.65;
    margin-bottom: 0.15rem;
  }
  .offering-price {
    color: $whiteColor;
    font-size: $smallerFontSize;
    font-weight: $mediumFontWeight;
    opacity: 0.85;

    em {
      font-size: 1.15rem;
    }
  }
}
.slashed-price {
  font-size: $smallerFontSize;
  color: $whiteColor;
  opacity: 0.65;
  text-decoration: line-through;
  margin-left: 0.5rem;

  em {
    font-size: $smallestFontSize;
  }
}

.sold-out {
  display: inline-block;
  color: $redColor;
  background-color: #261b1a;
  padding: .75rem 1.5rem;
  border-radius: .75rem;
  border: 1px solid $redColor;
}

//Light Theme
.light-theme {
  .price-box {
    background-color: $whiteColor;
    box-shadow: 0 0 1rem 0.15rem #dbdbdb;
  }

  .price-icon {
    display: none;
  }

  .price-wrapper {
    label {
      color: lighten($blackColor, 25%);
    }

    .offering-price {
      color: $blackColor;
    }
    .slashed-price {
      font-weight: $mediumFontWeight;
      color: lighten($blackColor, 25%);
    }
  }
}


//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .price-box {
    display: none !important;
  }
}
</style>
