<template>
  <div class="field-wrapper">
    <div
      class="field-country-telephone-item"
      :class="{ error: field.hasError }"
    >
      <VuePhoneNumberInput
        v-model="phone"
        v-bind="props"
        :no-example="true"
        :required="field.required"
        :disabled="field.readOnly != undefined ? field.readOnly : false"
        @phone-number-focused="field.hasError = false"
        @update="fieldChanged"
      />
    </div>
  </div>
</template>

<script>
//Importing libraries
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
  name: "CountryTelephoneField",
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fieldInit: false,
      initPhone: {},
      phone: null,
      props: {
        noExample: true,
        fetchCountry: true,
        translations: {
          countrySelectorLabel: "Country code",
          countrySelectorError: "Error",
          phoneNumberLabel: "Enter your phone",
        },
      },
    };
  },
  components: {
    VuePhoneNumberInput,
  },
  created() {
  },
  methods: {
    fieldChanged(phone) {
      if (this.fieldInit) {
        this.field.value = `+${phone.countryCallingCode}${phone.nationalNumber}`;
        this.field.isValid = phone.isValid;
        this.$emit("fieldChanged");
      }
      this.fieldInit = true;
    },
  },
};
</script>

<style scoped lang="scss">
input[readonly] {
  cursor: default;
  border: 1px solid #e7e6ef;
}

/deep/ {
  .country-selector,
  .input-tel {
    height: auto;
    min-height: auto;
  }

  .input-tel__label {
    top: 6px;
    left: 32px;
  }
  .country-selector__input,
  .input-tel__input {
    font-family: $bodyFont;
    transition: all $transitionSpeed;
    display: block;
    font-size: 1rem;
    font-weight: 500;
    outline: none;
    height: auto;
    color: #282828;
    background-color: #f7f6ff;
    padding: 0.75rem 1.15rem;
    border: 1px solid #e7e6ef;
    border-radius: 0.75rem !important;
    -webkit-appearance: none;
    margin-left: 1rem;
    width: calc(100% - 1rem);

    &:not(.no-country-selector) {
      border-top-left-radius: 0.75rem !important;
      border-bottom-left-radius: 0.75rem !important;
    }

    &::placeholder {
      font-size: $normalFontSize;
      font-weight: 400;
      color: #9390a7;
    }
  }

  .country-selector__input {
    margin-left: 0;
    width: calc(100%);
  }

  .country-selector__label {
    top: 6px;
  }

  .country-selector__country-flag,
  .country-selector__toggle {
    top: 50%;
    transform: translateY(-50%);
  }

  .country-selector__country-flag {
    margin-top: 4px;
  }
}

.error /deep/ {
  .country-selector__input,
  .input-tel__input {
    border-color: $redColor;
  }
}
</style>