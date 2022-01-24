<template>
  <div class="price-details">
    <span class="price-icon">₹</span>
    <!--START: Offering Price-->
    <div class="price-wrapper">
      <label>Get this for </label>
      <span
        class="slashed-price"
        v-show="getOfferingPrice.discountedPrice != null"
      >
        <em>₹</em>{{ getOfferingPrice.originalPrice }}
      </span>
      <span class="offering-price">
        ₹<em>{{
          getOfferingPrice.discountedPrice != null
            ? getOfferingPrice.discountedPrice
            : getOfferingPrice.originalPrice
        }}</em>
      </span>
    </div>
    <!--START: Offering Price-->
  </div>
</template>

<script>
export default {
  name: "OfferingPriceDetails",
  props: {
    price: Object,
  },

  computed: {
    getOfferingPrice: function () {
      var originalPrice = null,
        discountedPrice = null;

      //Check for variant pricing
      if (this.price.startingVariantOriginalPrice != undefined) {
        originalPrice = this.price.startingVariantOriginalPrice;
        if (this.price.startingVariantDiscountedPrice != undefined)
          discountedPrice = this.price.startingVariantDiscountedPrice;
      } else {
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
.price-details {
  flex: 1;
}

.price-icon {
  font-size: $normalFontSize;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
  color: darken($darkGreenColor, 30%);
  background-color: $darkGreenColor;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
}

.price-wrapper {
  display: inline-block;
  vertical-align: middle;

  label {
    display: block;
    font-size: $smallestFontSize;
    color: $whiteColor;
    opacity: 0.65;
    margin-bottom: .15rem;
  }
  .offering-price {
    color: $whiteColor;
    font-size: $smallestFontSize;
    font-weight: $mediumFontWeight;
    opacity: 0.85;

    em {
      font-size: 1rem;
    }
  }
}
.slashed-price {
  font-size: $smallerFontSize;
  color: $whiteColor;
  opacity: 0.65;
  text-decoration: line-through;
  margin-right: 0.25rem;

  em {
    font-size: $smallestFontSize;
  }
}
</style>
