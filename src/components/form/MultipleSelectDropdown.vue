<template>
  <div class="field-dropdown-wrapper field-mutliselect-dropdown-wrapper">
    <!--START: Dropdown Info-->
    <div class="dropdown-info-wrapper" @click="showDropdown()">
      <label
        class="field-placeholder"
        v-if="field.selectedItems.length == 0"
      >{{ field.placeholder }}</label>
      <div v-else class="selected-dropdown-items">
        <span
          v-for="selectedItem in field.selectedItems"
          :key="selectedItem.id"
          class="selected-dropdown-item"
        >{{ selectedItem[0] }}</span>
      </div>
      <unicon class="field-icon" name="angle-down"></unicon>
    </div>
    <!--ENDz: Dropdown Info-->

    <!--START: Dropdown List-->
    <div
      class="dropdown-list-wrapper"
      v-click-outside="onClickOutsideDropdown"
      :class="{ show: showOptions.dropdownWrapper }"
    >
      <ul class="dropdown-list">
        <li v-for="listItem in field.fields" :key="listItem.id" class="dropdown-item">
          <div class="checkbox-field">
            <input
              type="checkbox"
              :id="listItem.value"
              :value="[listItem.name, listItem.value]"
              v-model="field.selectedItems"
            />
            <span class="checkmark"></span>
          </div>
          <label class="checkbox-label" :for="listItem.value">{{ listItem.name }}</label>
        </li>
      </ul>
    </div>
    <!--END: Dropdown List-->
  </div>
</template>

<script>
//Importing directives
import vClickOutside from "v-click-outside";

export default {
  name: "MultipleSelectDropdown",
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
  directives: {
    clickOutside: vClickOutside.directive,
  },
  created() {},
  methods: {
    showDropdown() {
      setTimeout(() => (this.showOptions.dropdownWrapper = true), 0);
    },

    onClickOutsideDropdown() {
      this.showOptions.dropdownWrapper = false;
    },

    changeEvent() {
      this.$emit("changeEvent", this.radioField.placeholder);
    },
  },
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
  color: #9390a7;
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

.field-mutliselect-dropdown-wrapper {
  position: relative;
}

.dropdown-list-wrapper {
  position: absolute;
  display: none;
  left: 0;
  top: 100%;
  width: 100%;
  z-index: 10;

  &.show {
    display: block;
  }
}

.dropdown-list {
  background-color: $whiteColor;
  box-shadow: 0 0 0.7rem -0.1rem rgba(0, 0, 0, 0.05);
  border: 1px solid lighten($purpleColor, 38%);
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  margin: 0;
}

.dropdown-item {
  position: relative;
  cursor: pointer;
  background-color: transparent;

  .checkbox-field {
    @include vertical-center-align;
    left: 0.5rem;
  }

  .checkbox-label {
    display: block;
    cursor: pointer;
    color: $greyColor;
    font-size: $smallFontSize;
    padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  }

  &:hover {
    background-color: lighten($purpleColor, 40%);

    .checkbox-field {
      background-color: lighten($purpleColor, 37%);
    }

    .checkbox-label {
      color: $purpleColor;
    }
  }
}

.selected-dropdown-items {
  margin-bottom: -5px;
}

.selected-dropdown-item {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  font-size: $smallFontSize;

  &::after {
    content: ",";
    display: inline-block;
    margin-right: 0.35rem;
  }

  &:last-child::after {
    display: none;
  }
}
</style>