<template>
  <div class="discount-form">
    <span
      v-if="!isDiscountApplied"
      class="show-discount"
      :class="{ show: showForm }"
      @click="showDiscountForm"
      ><unicon name="angle-down"></unicon>Have a discount code?</span
    >
    <div v-if="showForm" class="discount-form-wrapper">
      <div class="rel-wrapper">
        <FormBuilder
          class="discount-form"
          :fields="fields"
          @fieldChanged="fieldChanged"
        ></FormBuilder>
        <button class="btn btn-text" @click="validateDiscountCode">
          Apply
        </button>
      </div>

      <span v-if="showOptions.status" class="status-message">{{
        statusMessage
      }}</span>

      <!--START: Line Loader -->
      <LineLoader :showLoader="showOptions.lineLoader"></LineLoader>
      <!--END: Line Loader -->
    </div>

    <div v-if="isDiscountApplied" class="applied-discount-wrapper">
      <h3>{{ appliedDiscount.discountCode }}</h3>
      <span>Discount applied successfully!</span>
      <button class="btn btn-text btn-icon" @click="removeDiscount">
        <unicon name="times"></unicon> Remove
      </button>
    </div>
  </div>
</template>

<script>
//Importing CoachService
import CoachService from "@/controllers/CoachService";

//Import components
import FormBuilder from "@/components/form/FormBuilder";
import LineLoader from "@/components/loaders/LineLoader";

export default {
  name: "BookingDiscountForm",
  data() {
    return {
      showForm: false,
      disableButton: false,
      statusMessage: null,
      showOptions: {
        lineLoader: false,
        paymentLoader: false,
        status: false,
      },
      isDiscountApplied: false,
      appliedDiscount: {},
      fields: {
        discountCode: {
          type: "text",
          placeholder: "Enter discount code",
          required: true,
          hasError: false,
        },
      },
    };
  },
  props: {
    coachSlug: String,
    offeringSlug: String,
    selectedVariantIndex: Number,
    status: { message: String, show: Boolean },
  },
  components: {
    FormBuilder,
    LineLoader,
  },
  methods: {
    async validateDiscountCode() {
      var timeoutHandler = null;
      clearTimeout(timeoutHandler);

      this.disableButton = true;
      this.showOptions.lineLoader = true;
      this.showOptions.status = false;
      this.showOptions.successMessage = false;

      var formValidation = this.validateForm(this.fields);
      if (!formValidation.hasErrors) {
        const response = await CoachService.ValidateDiscountCode({
          coachSlug: this.coachSlug,
          offeringSlug: this.offeringSlug,
          selectedVariantIndex: this.selectedVariantIndex,
          discountCode: this.fields.discountCode.value,
        });

        if (response.hasError) {
          this.statusMessage = response.error;
          this.showOptions.status = true;
        } else {
          this.appliedDiscount = response.data;
          this.applyDiscountCode();
        }
      } else {
        this.showOptions.status = true;
        timeoutHandler = setTimeout(
          () => (this.showOptions.status = false),
          3000
        );
      }

      this.disableButton = false;
      this.showOptions.lineLoader = false;
    },

    applyDiscountCode() {
      this.isDiscountApplied = true;
      this.showForm = false;
      this.$emit('discountApplied', {
          code:this.appliedDiscount.discountCode,
          amount:this.appliedDiscount.discountAmount});
    },

    removeDiscount() {
      this.isDiscountApplied = false;
      this.fields.discountCode.value = null;
      this.appliedDiscount = {};
      this.showForm = false;
      this.$emit('discountRemoved');
    },

    fieldChanged() {
      this.showOptions.status = false;
    },

    showDiscountForm() {
      this.showForm = !this.showForm;
    },

    bookOffering() {
      this.$emit("bookOffering");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.discount-form-wrapper {
  margin-top: 0.5rem;
  position: relative;

  .btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    color: $blackColor;
  }
}

.status-message {
  display: block;
  color: $redColor;
  margin-top: -0.5rem;
  line-height: 1.4;
}

.discount-form {
  /deep/ input {
    text-transform: uppercase;

    &::placeholder {
      text-transform: none;
    }
  }
}

.show-discount {
  color: var(--brand-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  /deep/ {
    svg {
      fill: var(--brand-color);
    }
  }

  &.show /deep/ {
    svg {
      transform: rotate(180deg);
    }
  }
}

.applied-discount-wrapper {
  position: relative;
  margin-top: 0.5rem;
  padding: 0.75rem 1rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #494949;
  background-color: #2f2f2f;

  h3 {
    color: $whiteColor;
    margin-bottom: 0;
    font-size: $mediumFontSize;
  }

  span {
    display: block;
    color: $greenColor;
  }

  .btn-text {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.5rem;
    color: $whiteColor;
    opacity: 0.5;

    /deep/ svg {
      fill: $whiteColor;
      opacity: 1;
    }
  }
}
</style>

            