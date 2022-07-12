<template>
  <div class="offering-variants">
    <!--START: Selected Variant-->
    <div class="selected-variant-wrapper">
      <span class="title">Selected Variant</span>
      <div class="selected-variant" @click="showVariantsModal">
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
    <div class="variants-selector-modal" :class="{ show: showModal }">
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
              ><span class="currency-icon">{{getCoachCurrency()}}</span
              >{{ convertToIndianNumber(variant.originalPrice) }}</span
            >
            <span
              v-if="variant.discountedPrice != undefined"
              class="discounted-price"
              ><span class="currency-icon">{{getCoachCurrency()}}</span
              >{{ convertToIndianNumber(variant.discountedPrice) }}</span
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
      :class="{ show: showModal }"
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
    };
  },
  watch: {
    showModal: function () {
      this.selectedIndex = this.originalIndex;
    },
  },
  props: {
    variants: Array,
    showModal: Boolean,
  },
  created() {
    this.selectedVariant = this.variants[0];
  },
  methods: {
    showVariantsModal() {
      this.$emit("showVariantsModal");
    },

    hideVariantsModal() {
      this.$emit("closeVariantsModal");
    },
    selectVariant(index) {
      this.selectedIndex = index;
    },
    changeVariant() {
      this.originalIndex = this.selectedIndex;
      this.selectedVariant = this.variants[this.selectedIndex];
      this.$emit("closeVariantsModal");
      this.$emit(
        "changeVariant",
        this.variants[this.selectedIndex],
        this.selectedIndex
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bg-overlay {
  display: none;

  &.show {
    display: block;
  }
}

.selected-variant-wrapper {
  position: relative;
  margin-top: 2em;

  .title {
    display: block;
    color: $whiteColor;
    opacity: 0.65;
    font-size: $smallerFontSize;
    letter-spacing: 0.05rem;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
  }
}

.selected-variant {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  background-color: lighten($blackColor, 8%);
  border: 1px solid lighten($blackColor, 17%);

  .variant-icon {
    margin-right: 0.5rem;

    /deep/ svg {
      fill: var(--brand-color);
      height: auto;
      width: $normalFontSize;
    }
  }

  label {
    font-size: 1rem;
    font-weight: $mediumFontWeight;
    color: $whiteColor;
    margin-bottom: 0;
  }

  .variant-length {
    flex: 1;
    text-align: right;

    span {
      display: inline-block;
      vertical-align: middle;
      font-size: $smallerFontSize;
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
    padding: 0.75rem 1rem;

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
        font-size: 1rem;
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
      border-color: $darkGreenColor !important;

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
    margin: 0 0.5rem;
    flex: 1;
  }
}

//Light Theme styles
.light-theme {
  .selected-variant-wrapper {
    margin-top: 1.5rem;

    .title {
      color: lighten($blackColor, 45%);
      opacity: 1;
    }
  }

  .selected-variant {
    background-color: darken($whiteColor, 7%);
    border-color: darken($whiteColor, 10%);

    .variant-length span,
    label {
      color: lighten($blackColor, 10%);
    }

    .variant-length {
      .unicon /deep/ svg {
        fill: var(--brand-color);
      }
    }
  }

  .variants-selector-modal {
    background-color: darken($whiteColor, 5%);

    .variant {
      background-color: darken($whiteColor, 9%);
      border-color: darken($whiteColor, 15%);

      h3 {
        color: $blackColor;
      }

      .variant-check {
        background-color: lighten($blackColor, 10%);

        &::before {
          border-color: lighten($blackColor, 10%);
        }
      }

      .original-price,
      .discounted-price,
      .currency-icon {
        color: lighten($blackColor, 25%);
      }

      &.selected {
        background-color: $darkGreenColor;

        .original-price,
        .discounted-price,
        .currency-icon {
          color: lighten($blackColor, 5%);
        }
      }
    }

    .buttons-wrapper {
      .btn-border {
        color: lighten($blackColor, 30%);
      }
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .selected-variant {
    padding: 1rem;
    border: 1px solid transparent;

    &:hover {
      cursor: pointer;
      border: 1px solid var(--brand-color);
    }

    label {
      font-size: 1rem;
    }

    .variant-length {
      span {
        font-size: $normalFontSize;
      }
    }
  }

  .variants-selector-modal {
    width: 30rem;
    right: 0;
    margin: auto;
    top: 50%;
    bottom: auto;
    border-radius: 2rem;
    border: 1px solid lighten($blackColor, 10%);

    &.show {
      transform: translateY(-50%);
    }

    .variant {
      cursor: pointer;

      &:hover {
        border: 1px solid lighten($blackColor, 45%);
      }
    }
  }
}
</style>
