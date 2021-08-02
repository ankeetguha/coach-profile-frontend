<template>
  <div class="field-wrapper">
    <div class="field-money-item">
      <span class="money-label">₹</span>
      <input
        type="number"
        :name="field.name"
        :placeholder="field.placeholder"
        :required="field.required"
        :class="{ error: field.hasError}"
        @focus="field.hasError = false;"
        v-model="field.value"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MoneyField",
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
};
</script>