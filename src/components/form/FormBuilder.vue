<template>
  <div>
    <div
      class="field-main-item"
      v-for="(field, name) in fields"
      :key="field.id"
    >
      <!-- START: Group Title -->
      <label class="field-label" v-if="field.groupTitle != undefined">{{
        field.groupTitle
      }}</label>
      <!-- END: Group Title -->

      <!-- START: Field Title -->
      <label class="field-title" v-if="field.title != undefined">{{
        field.title
      }}</label>
      <!-- END: Field Title -->

      <!-- START: Radio Buttons -->
      <RadioButton
        v-if="field.type == 'radio'"
        :radioField="field"
        class="field-wrapper"
        @change="fieldChanged()"
      ></RadioButton>
      <!-- END: Radio Buttons -->

      <!-- START: Radio Buttons -->
      <ToggleButton
        v-else-if="field.type == 'toggle'"
        :toggleField="field"
        :toggleName="name"
        @change="fieldChanged()"
      ></ToggleButton>
      <!-- END: Radio Buttons -->

      <div v-else-if="field.type == 'date'" class="field-wrapper">
        <Datepicker
          :type="field.type"
          :name="field.name"
          :placeholder="field.placeholder"
          :required="field.required"
          :monday-first="true"
          :value="field.id"
          :class="[
            field.class != undefined ? field.class : '',
            { error: field.hasError },
          ]"
          @focus="field.hasError = false"
          @change="fieldChanged()"
          v-model="field.value"
        ></Datepicker>
      </div>

      <!-- START: File Upload Fields -->
      <FileUploadLarge
        v-else-if="field.type == 'file-large'"
        :field="field"
        @change="fieldChanged()"
        @fileUploaded="fileUploaded"
      ></FileUploadLarge>
      <!-- End: File Upload Fields -->

      <!-- START: Group Fields -->
      <GroupFormFields
        v-else-if="field.type == 'group'"
        class="field-wrapper field-group-wrapper"
        :fields="field.fields"
      ></GroupFormFields>
      <!-- END: Group Fields -->

      <!-- START: Money Input -->
      <MoneyField
        v-else-if="field.type == 'money'"
        :field="field"
        @change="fieldChanged()"
      ></MoneyField>
      <!-- END: Money Input -->

      <!-- START: Phone Number Input -->
      <TelephoneField
        v-else-if="field.type == 'tel'"
        :field="field"
        @fieldChanged="fieldChanged()"
      ></TelephoneField>
      <!-- END: Phone Number Input -->

      <!-- START: Multiple Select Dropdown Input -->
      <Dropdown
        v-else-if="field.type == 'dropdown'"
        :field="field"
        :class="{ error: field.hasError }"
        @change="fieldChanged()"
      ></Dropdown>
      <!-- START: Multiple Select Dropdown Input -->

      <!-- START: Multiple Select Dropdown Input -->
      <MultipleSelectDropdown
        v-else-if="field.type == 'multiple-select-dropdown'"
        :field="field"
        :class="{ error: field.hasError }"
        @change="fieldChanged()"
      ></MultipleSelectDropdown>
      <!-- START: Multiple Select Dropdown Input -->

      <!-- START: Textarea -->
      <div v-else-if="field.type == 'textarea'" class="field-wrapper">
        <textarea
          rows="4"
          :name="field.name"
          :placeholder="field.placeholder"
          :required="field.required"
          :class="{ error: field.hasError }"
          @focus="field.hasError = false"
          @input="fieldChanged()"
          v-model="field.value"
        ></textarea>
      </div>
      <!-- END: Textarea -->

      <!-- START: Input Fields -->
      <div v-else class="field-wrapper">
        <input
          :type="field.type"
          :name="field.name"
          :placeholder="field.placeholder"
          :required="field.required"
          :value="field.id"
          :class="{ error: field.hasError }"
          @focus="field.hasError = false"
          @input="fieldChanged()"
          v-model="field.value"
        />
      </div>
      <!-- END: Input Fields -->
    </div>
  </div>
</template>

<script>
import RadioButton from "./RadioButton";
import ToggleButton from "./ToggleButton";
import MoneyField from "./MoneyField";
import TelephoneField from "./TelephoneField";
import FileUploadLarge from "./FileUploadLarge";
import Dropdown from "./Dropdown";
import MultipleSelectDropdown from "./MultipleSelectDropdown";
import Datepicker from "vuejs-datepicker";

export default {
  name: "FormBuilder",
  props: {
    fields: {
      type: Object,
      required: true,
    },
    statusMessageHandler: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    GroupFormFields: () => import("./FormBuilder.vue"),
    RadioButton,
    ToggleButton,
    MoneyField,
    TelephoneField,
    FileUploadLarge,
    Dropdown,
    MultipleSelectDropdown,
    Datepicker,
  },
  methods: {
    fieldChanged() {
      this.$emit("fieldChanged");
    },

    fileUploaded(e) {
      this.$emit("fileUploaded", e);
    }
  },
};
</script>