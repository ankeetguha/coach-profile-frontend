<template>
  <div class="payment-loader" :class="{ show: show }">
    <!--START: Modal -->
    <div class="payment-modal">
      <unicon name="lock" class="modal-icon"></unicon>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>

      <div class="vendor-info">
        Powered By
        <img src="@/assets/images/razorpay-logo.jpg" alt="Razorpay" />
      </div>

      <!--START: Line Loader -->
      <LineLoader :showLoader="true"></LineLoader>
      <!--END: Line Loader -->
    </div>
    <!--START: Modal -->

    <!--START: BG Overlay -->
    <div class="bg-overlay show"></div>
    <!--END: BG Overlay -->
  </div>
</template>

<script>
//Import components
import LineLoader from "@/components/loaders/LineLoader";

export default {
  name: "PaymentLoader",
  data() {
    return {
      title: this.paymentCompleted
        ? "DO NOT close this page"
        : "Redirecting To Payment Gateway",
      description: this.paymentCompleted
        ? "We're processing your booking."
        : "Don't close this page. We're sending you to the payment gateway",
    };
  },
  props: {
    show: Boolean,
    paymentCompleted: Boolean,
  },
  components: {
    LineLoader,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.payment-loader {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;

  &.show {
    display: block;
  }
}

.payment-modal {
  position: absolute;
  background-color: $whiteColor;
  text-align: center;
  top: 50%;
  left: 50%;
  width: 80%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  padding: 2rem 1rem 2rem;
  border-radius: 1rem;
  z-index: 101;

  .modal-icon {
    background-color: $darkGreenColor;
    padding: 0.65rem 0.75rem;
    border: 2px solid darken($darkGreenColor, 5%);
    border-radius: 50%;
    margin-bottom: 1rem;

    /deep/ svg {
      fill: darken($darkGreenColor, 25%);
      width: 2rem;
      height: auto;
    }
  }

  h3 {
    font-size: $largeFontSize;
    line-height: 1.2;
  }
  p {
    opacity: $lightOpacity;
  }
}

.vendor-info {
  margin-top: 3rem;
  text-align: center;
  font-size: $smallerFontSize;
  color: lighten($blackColor, 30%);

  img {
    display: block;
    margin: auto;
    width: 7rem;
  }
}
</style>

            