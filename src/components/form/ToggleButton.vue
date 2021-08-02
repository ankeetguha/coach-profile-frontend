<template>
  <div class="field-toggle-item" :class="{ error: toggleField.hasError }">
    <div class="field-toggle-button">
      <input
        type="checkbox"
        :value="toggleField.value"
        v-model="toggleField.value"
      />
      <span></span>
    </div>
    <label>{{ toggleField.placeholder }}</label>
  </div>
</template>

<script>
export default {
  name: "ToggleButton",
  props: {
    toggleField: {
      type: Object,
      required: true,
    },
    toggleName: {
      type: String,
      required: true,
    },
  },
};
</script>