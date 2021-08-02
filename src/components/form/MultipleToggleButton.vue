<template>
  <div>
    <label
      class="field-label"
      v-if="radioField.placeholder != undefined"
    >{{ radioField.placeholder }}</label>
    <div
      class="field-radio-wrapper field-radio-toggle-wrapper"
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
          :name="radioField.placeholder"
          :type="radioField.type"
          :value="radioOption.name"
          @focus="radioField.hasError = false"
          @change="(radioField.changeEvent != undefined && radioField.changeEvent == true) ? changeEvent() : null"
          v-model="radioField.placeholder"
        />
        <label :for="radioOption.name">{{ radioOption.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleToggleButton",
  props: {
    radioField: {
      type: Object,
      required: true,
    },
  },
  created() {
    //Check the default option
    if (this.radioField.checkedField != undefined)
      this.radioField.placeholder = this.radioField.checkedField;
  },
  methods: {
      changeEvent() {
          this.$emit("changeEvent", this.radioField.placeholder);
      }
  }
};
</script>