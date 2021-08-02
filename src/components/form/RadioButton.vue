<template>
  <div>
    <label
      class="field-label"
      v-if="radioField.placeholder != undefined"
    >{{ radioField.placeholder }}</label>
    <div
      class="field-radio-wrapper field-radio-highlight-wrapper"
      :class="radioField.isToggle != undefined && radioField.isToggle ? 'field-radio-toggle-wrapper':'' "
    >
      <div
        class="field-radio-item"
        v-for="radioOption in radioField.options"
        :class="{ error: radioField.hasError }"
        :key="radioOption.id"
      >
        <input
          :id="radioOption.name"
          :name="radioField.modelName"
          type="radio"
          :value="radioOption.name"
          @focus="radioField.hasError = false"
          @change="radioField.value = radioField.modelName"
          v-model="radioField.modelName"
        />
        <label :for="radioOption.name">{{ radioOption.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    radioField: {
      type: Object,
      required: true,
    },
  },
  created() {
    //Check the default option
    if (
      this.radioField.checkedField != undefined ||
      this.radioField.checkedField != null
    ) {
      this.radioField.modelName = this.radioField.checkedField;
      this.radioField.value = this.radioField.checkedField;
    }
  },
};
</script>