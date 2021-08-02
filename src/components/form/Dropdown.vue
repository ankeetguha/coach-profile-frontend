<template>
  <div class="field-dropdown-wrapper">
    <div class="dropdown-info-wrapper">
      <label
        class="field-placeholder field-placeholder-value"
        v-if="field.value != null"
      >{{ field.value[0] }}</label>
      <label class="field-placeholder" v-else>{{ field.placeholder }}</label>
      <unicon class="field-icon" name="angle-down"></unicon>
      <select v-model="field.value">
        <option
          v-for="item in field.fields"
          :key="item._id"
          :value="[item.name, item.value]"
        >{{ item.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectDropdown",
  data() {
    return {
      showOptions: {
        dropdownWrapper: false,
      },
    };
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.dropdown-info-wrapper {
  position: relative;
  cursor: pointer;
  transition: all $transitionSpeed;
  display: block;
  font-size: $normalFontSize;
  outline: none;
  color: darken($purpleColor, 25%);
  background-color: #f7f6ff;
  width: calc(100% - 2.5rem);
  padding: 0.75rem 1.15rem;
  border: 1px solid #e7e6ef;
  border-radius: 0.75rem;
  -webkit-appearance: none;
}

.field-placeholder {
  display: block;
  cursor: pointer;
  font-size: $smallFontSize;
  color: $greyColor;
}

.field-placeholder-value {
  color: darken($purpleColor, 25%);
}

.field-icon {
  @include vertical-center-align;
  margin-top: 0.1rem;
  right: 0.5rem;

  /deep/ svg {
    fill: $purpleColor;
  }
}

.dropdown-info-wrapper:hover {
  border-color: lighten($purpleColor, 0%);
}

.error .dropdown-info-wrapper {
  border-color: $redColor !important;
}

select {
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;
  border: none;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>