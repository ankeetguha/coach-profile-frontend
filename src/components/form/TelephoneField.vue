<template>
  <div class="field-wrapper">
    <div class="field-telephone-item">
      <span class="telephone-label">+91</span>
      <input
        type="number"
        :name="field.name"
        :placeholder="field.placeholder"
        :required="field.required"
        :class="{ error: field.hasError }"
        @focus="field.hasError = false"
        @input="fieldChanged"
        v-model="field.value"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TelephoneField",
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  methods: {
    fieldChanged() {
      this.$emit("fieldChanged");
    },
  },
};
</script>

<style scoped lang="scss">
.field-telephone-item {
  position: relative;

  .telephone-label {
    font-size: $normalFontSize;
    color: $greyColor;
    background-color: darken($whiteColor, 5%);
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    text-align: center;
    position: absolute;
    top: 1px;
    left: 1px;
    height: calc(100% - 2px);
    line-height: 2.5rem;
    width: 3rem;
  }

  input {
    padding: 0.75rem 1.15rem 0.75rem 3.5rem;
    width: calc(100% - 4.85rem);
  }
}
</style>