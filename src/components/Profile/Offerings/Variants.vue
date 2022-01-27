<template>
  <div class="offering-variants">
    <!--START: Selected Variant-->
    <div class="selected-variant-wrapper">
      <span class="title">Selected Variant</span>
      <div class="selected-variant" @click="showVariantsSelector">
        <unicon name="pathfinder" class="variant-icon"></unicon>
        <label>{{ selectedVariant.title }}</label>
        <div class="variant-length">
          <span>{{ variants.length }} more</span>
          <unicon name="angle-right"></unicon>
        </div>
      </div>
    </div>
    <!--END: Selected Variant-->

    <!--START: Variants Modal-->
    <div class="variants-selector-modal" :class="{ show: showVariantsModal }">
      <label class="label-small">Select Variant</label>

      <ul class="variants">
        <li
          v-for="(variant, index) in variants"
          :key="index"
          class="variant"
          :class="{ selected: index == selectedIndex }"
          @click="selectVariant(index)"
        >
          <span class="variant-check"></span>
          <h3>{{ variant.title }}</h3>
          <div
            class="variant-price"
            :class="{
              'has-discount': variant.discountedPrice != undefined,
            }"
          >
            <span class="original-price"
              ><span class="currency-icon">₹</span
              >{{ variant.originalPrice }}</span
            >
            <span
              v-if="variant.discountedPrice != undefined"
              class="discounted-price"
              ><span class="currency-icon">₹</span
              >{{ variant.discountedPrice }}</span
            >
          </div>
        </li>
      </ul>

      <div class="buttons-wrapper">
        <button type="button" class="btn btn-border" @click="hideVariantsModal">
          Cancel
        </button>
        <button type="button" class="btn btn-primary" @click="changeVariant">
          Select Variant
        </button>
      </div>
    </div>
    <!--END: Variants Modal-->

    <div
      class="bg-overlay"
      :class="{ show: showVariantsModal }"
      @click="hideVariantsModal"
    ></div>
  </div>
</template>

<script>
export default {
  name: "OfferingVariants",
  data() {
    return {
      selectedVariant: {},
      selectedIndex: 0,
      originalIndex: 0,
      showVariantsModal: false,
    };
  },
  watch: {
    showVariantsModal: function () {
      this.selectedIndex = this.originalIndex;
    },
  },
  props: {
    variants: Array,
  },
  created() {
    this.selectedVariant = this.variants[0];
  },
  methods: {
    showVariantsSelector() {
      this.showVariantsModal = true;
    },
    hideVariantsModal() {
      this.showVariantsModal = false;
    },
    selectVariant(index) {
      this.selectedIndex = index;
    },
    changeVariant() {
      this.originalIndex = this.selectedIndex;
      this.selectedVariant = this.variants[this.selectedIndex];
      this.hideVariantsModal();
      this.$emit("changeVariant", this.variants[this.selectedIndex]);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.selected-variant-wrapper {
  position: relative;
  margin-top: 1.5rem;

  .title {
    display: block;
    color: $whiteColor;
    opacity: 0.65;
    font-size: $smallestFontSize;
    letter-spacing: 0.05rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
}

.selected-variant {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3rem 0.75rem;
  border-radius: 0.5rem;
  background-color: lighten($blackColor, 8%);

  .variant-icon {
    margin-right: 0.5rem;

    /deep/ svg {
      fill: var(--brand-color);
      height: auto;
      width: $normalFontSize;
    }
  }

  label {
    font-size: $smallFontSize;
    color: $whiteColor;
    margin-bottom: 0;
  }

  .variant-length {
    flex: 1;
    text-align: right;

    span {
      display: inline-block;
      vertical-align: middle;
      font-size: $smallestFontSize;
      color: $whiteColor;
      margin-top: -0.15rem;
      opacity: 0.75;
    }

    .unicon {
      display: inline-block;
      vertical-align: middle;

      /deep/ svg {
        width: $largestFontSize;
        height: auto;
        fill: $whiteColor;
        opacity: 0.75;
      }
    }
  }
}

.variants-selector-modal {
  transition: all 0.3s;
  background-color: $blackColor;
  box-shadow: 0 -1rem 1.5rem -0.15rem rgba(50, 50, 50, 0.65);
  z-index: 101;
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1.5rem;
  width: calc(100% - 3rem);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  transform: translateY(110vh);

  &.show {
    transform: translateY(0);
  }
}

.variants {
  margin: 0;

  .variant {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: lighten($blackColor, 5%);
    border: 1px solid lighten($blackColor, 9%);
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;

    .variant-check {
      position: relative;
      display: block;
      margin-right: 1rem;
      height: 5px;
      width: 5px;
      border-radius: 50%;
      background-color: $whiteColor;
      opacity: 0.25;

      &::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        height: calc(100% + 2px);
        width: calc(100% + 2px);
        border-radius: 50%;
        border: 1px solid $whiteColor;
        display: block;
      }
    }

    h3 {
      font-size: $smallFontSize;
      font-weight: $mediumFontWeight;
      color: $whiteColor;
    }

    .variant-price {
      flex: 1;
      text-align: right;

      .original-price,
      .discounted-price {
        font-size: $smallFontSize;
        font-weight: $mediumFontWeight;
        color: $whiteColor;
      }

      .currency-icon {
        font-size: $smallestFontSize;
      }

      &.has-discount {
        .original-price {
          font-size: $smallestFontSize;

          opacity: 0.65;
          margin-right: 0.25rem;
          text-decoration: line-through;
        }
      }
    }

    &.selected {
      border-color: $darkGreenColor;

      .variant-check {
        background-color: $darkGreenColor;
        opacity: 1;

        &::before {
          border: 1px solid darken($darkGreenColor, 15%);
        }
      }
    }
  }
}

.buttons-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -0.5rem;
  margin-top: 2rem;
  width: calc(100% + 1rem);

  .btn {
    font-size: $smallerFontSize;
    margin: 0 0.5rem;
    flex: 1;
  }

  .btn-border {
    color: $whiteColor;
    opacity: 0.65;
  }
}
</style>
