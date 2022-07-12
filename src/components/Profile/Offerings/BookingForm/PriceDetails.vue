<template>
  <div>
    <div class="price-wrapper">
      <div class="line-item">
        <label>Price</label>
        <div class="price-item">
          <span
            class="amount"
            :class="{ 'slashed-amount': variant.discountedPrice != undefined }"
            >{{getCoachCurrency()}}<em>{{ convertToIndianNumber(variant.originalPrice) }}</em>
          </span>
          <span v-if="variant.discountedPrice != undefined" class="amount"
            >{{getCoachCurrency()}}<em>{{
              convertToIndianNumber(variant.discountedPrice)
            }}</em></span
          >
        </div>
      </div>

      <div v-if="discount.hasDiscount" class="line-item">
        <label>Discount</label>
        <div class="price-item">
          <span class="amount"
            >- {{getCoachCurrency()}}<em>{{ convertToIndianNumber(discount.amount) }}</em>
          </span>
        </div>
      </div>

      <div class="line-item">
        <label>Internet Handling Fees</label>
        <div class="price-item">
          <span class="amount"
            >+ {{getCoachCurrency()}}<em>{{ convertToIndianNumber(getTaxes) }}</em>
          </span>
        </div>
      </div>

      <div class="line-item total-price">
        <label>Total</label>
        <div class="price-item">
          <span class="amount"
            >{{getCoachCurrency()}}<em>{{ convertToIndianNumber(getPaymentPrice + getTaxes) }}</em>
          </span>
        </div>
      </div>
    </div>
    <div class="secure-wrapper">
      <unicon name="lock"></unicon
      ><span>Payments are secure and encrypted</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookingPrice",
  props: {
    variant: Object,
    discount: Object,
  },
  computed: {
    getPaymentPrice: function () {
      let paymentPrice = this.variant.originalPrice;
      if (this.variant.discountedPrice != undefined) {
        paymentPrice = this.variant.discountedPrice;
      }

      //Check if discounted amount has to be added
      if (this.discount.hasDiscount) paymentPrice -= this.discount.amount;

      return paymentPrice;
    },
    getTaxes: function () {
      return Math.ceil(
        this.getPaymentPrice * 1.05 - this.getPaymentPrice
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.price-wrapper {
  margin-top: 2rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid lighten($blackColor, 18%);
  background-color: lighten($blackColor, 8%);
}

.line-item {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 0.5rem;

  label {
    color: $whiteColor;
    opacity: 0.65;
  }

  .price-item {
    flex: 1;
    text-align: right;

    .amount {
      color: $whiteColor;
      font-weight: $mediumFontWeight;
      font-size: $smallFontSize;

      em {
        font-size: 1.1rem;
      }

      &.slashed-amount {
        display: block;
        font-weight: $normalFontWeight;
        font-size: $smallestFontSize;
        text-decoration: line-through;
        margin-bottom: 0.15rem;
        opacity: 0.65;
        em {
          font-size: $smallerFontSize;
        }
      }
    }
  }

  &.total-price {
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px dashed lighten($blackColor, 18%);
    label {
      opacity: 1;
      font-size: $mediumFontSize;
    }

    .amount {
      font-size: $normalFontSize;
      em {
        font-size: $largeFontSize;
      }
    }
  }
}

.secure-wrapper {
  margin-top: 0.5rem;
  text-align: center;

  .unicon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.25rem;

    /deep/ svg {
      fill: $whiteColor;
      opacity: 0.65;
      width: $normalFontSize;
      height: auto;
    }
  }

  span {
    display: inline-block;
    vertical-align: middle;
    font-size: $smallerFontSize;
    color: $whiteColor;
    opacity: 0.65;
  }
}

//Light Theme
.light-theme {
  .price-wrapper {
    background-color: $whiteColor;
    border: 1px solid darken($whiteColor, 8%);
  }

  .line-item {
    label,
    .amount {
      color: lighten($blackColor, 15%);
    }

    &.total-price {
      .amount {
        color: lighten($blackColor, 0%);
      }
    }
  }

  .secure-wrapper {
    span {
      color: lighten($blackColor, 20%);
    }

    .unicon /deep/ svg {
      fill: var(--brand-color);
    }
  }
}
</style>

            