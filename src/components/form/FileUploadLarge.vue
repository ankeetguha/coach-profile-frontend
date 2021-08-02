<template>
  <div
    class="file-upload-large"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <!--START: Images Preview-->
    <div
      class="image-preview"
      v-if="field.showPreview != undefined && field.showPreview == true && field.fileList.length > 0"
    >
      <div
        v-for="(image, index) in field.imagesList"
        :key="image.id"
        class="image-preview-wrapper"
        @click="remove(index)"
      >
        <img :src="image" />
        <unicon name="times"></unicon>
      </div>
    </div>
    <div
      class="files-list"
      v-if="
        this.field.fileList.length &&
        (field.showPreview == undefined || field.showPreview == false)
      "
      v-cloak
    >
      <p class="files-list-label">Uploaded Files</p>
      <span
        class="file-item"
        v-for="file in field.fileList"
        :key="file.id"
        @click="remove(field.fileList.indexOf(file))"
      >
        <div class="file-item-tag">
          <span>{{ file.name }}</span>
          <unicon name="times"></unicon>
        </div>
      </span>
    </div>
    <!--END: Images Preview-->

    <input
      v-if="
        field.single == undefined ||
        field.single == false ||
        this.field.fileList.length == 0
      "
      type="file"
      :multiple="field.single == undefined ? true : false"
      name="fields[assetsFieldHandle][]"
      id="assetsFieldHandle"
      @change="onChange"
      @input="fileUploaded"
      ref="file"
      :class="{ error: field.hasError }"
      :required="field.required"
      :accept="fileTypeRepo[field.fileType].accept"
    />
    <label for="assetsFieldHandle" v-if="this.field.fileList.length == 0">
      <img src="@/assets/images/icons/image-upload.svg" alt="File Upload" />
      <p>
        Drop your images here or
        <span class="file-browser-link">browse</span>
      </p>
      <span
        v-if="field.fileInstruction != undefined"
        class="file-instructions"
        >{{ field.fileInstruction }}</span
      >
      <span class="files-direction">{{
        fileTypeRepo[field.fileType].label
      }}</span>
    </label>
    <label
      for="assetsFieldHandle"
      v-else-if="
        this.field.fileList.length > 0 &&
        (field.single == undefined || field.single == false)
      "
      class="btn btn-text"
    >
      <unicon name="plus"></unicon>
      Add More
    </label>
  </div>
</template>

<script>
export default {
  name: "FileUploadLarge",
  delimiters: ["${", "}"], // Avoid Twig conflicts
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fileTypeRepo: {
        image: {
          label: "Supports JPGs, JPEGs, PNGs. Max total of 6MB",
          accept: ".jpg, .jpeg, .png",
        },
      },
    };
  },
  methods: {
    onChange() {
      this.field.fileList.push(...this.$refs.file.files);
      this.$emit("fileUploaded", this.field.imagesList);
    },
    remove(i) {
      this.field.fileList.splice(i, 1);
      this.field.imagesList.splice(i, 1);
      this.$emit("fileUploaded", this.field.imagesList);
    },

    dragover(event) {
      event.preventDefault();
      if (!event.currentTarget.classList.contains("files-hover")) {
        event.currentTarget.classList.add("files-hover");
      }
    },

    dragleave(event) {
      event.currentTarget.classList.remove("files-hover");
    },

    drop(event) {
      event.preventDefault();
      this.$refs.file.files.push(...event.dataTransfer.files);
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.remove("files-hover");
    },

    fileUploaded(e) {
      for (var i = 0; i < e.target.files.length; i++) {
        var file = e.target.files[i];
        this.field.imagesList.push(URL.createObjectURL(file));
      }
      this.$emit("fileUploaded", this.field.imagesList);
    },
  },
};
</script>

<style scoped lang="scss">
[v-cloak] {
  display: none;
}

.file-upload-large {
  position: relative;
  text-align: center;

  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  label {
    @include transition;
    color: $greyColor;
    cursor: pointer;
    display: block;
    padding: 1rem 2rem 1.5rem;
    background-color: #f7f6ff;
    border-radius: 0.75rem;
    border: 1px solid #e7e6ef;

    &.btn {
      padding: 1rem;
    }
  }

  .file-browser-link {
    color: $blueColor;
    font-weight: $mediumFontWeight;
  }

  .files-direction {
    display: block;
    font-size: $smallestFontSize;
    margin-top: 0.5rem;
  }

  &.files-hover label {
    border-color: $purpleColor;
    background-color: darken(#f7f6ff, 3%);
  }
  &:hover label {
    border-color: $purpleColor;
  }

  .error + label {
    border-color: $redColor;
  }
}

.files-list {
  margin: 1rem 0 0;
  text-align: left;
}
.file-item {
  @include transition;
  cursor: pointer;
  display: inline-block;
  margin: 0 0.75rem 0.75rem 0;
  border: 1px solid transparent;
  padding: 0.5rem 1.2rem 0.5rem 0.55rem;
  border-radius: 0.5rem;
  background-color: lighten($darkGreenColor, 40%);

  .file-item-tag {
    position: relative;
    display: flex;
    flex-direction: row;
    align-content: flex-start;
  }

  span {
    @include transition;
    color: darken($darkGreenColor, 20%);
    font-size: $smallestFontSize;
    font-weight: $mediumFontWeight;
    align-self: center;
    margin-right: 0.5rem;
  }

  .unicon {
    @include vertical-center-align;
    right: -0.75rem;
    margin-top: 1px;
    align-self: center;
  }

  .unicon /deep/ svg {
    fill: darken($darkGreenColor, 20%);
    width: $smallerFontSize;
  }
}

.image-preview {
  text-align: left;
  margin-bottom: .5rem;
}

.file-item:hover {
  background-color: lighten($redColor, 30%);
  border: 1px solid lighten($redColor, 30%);

  span {
    color: darken($redColor, 10%);
  }

  /deep/ .unicon svg {
    fill: darken($redColor, 10%);
  }
}

.files-list-label {
  color: $greyColor;
  font-size: $smallFontSize;
  display: block;
  margin: -0.5rem 0 0.5rem;
}

.file-instructions {
  display: block;
  margin: 0.15rem 0 0.75rem;
  font-size: $smallFontSize;
  font-weight: $mediumFontWeight;
}

.image-preview-wrapper {
  position: relative;
  display: inline-block;
  width: 5rem;
  border-radius: 0.5rem;
  margin: 0 0.5rem 0.5rem;

  img {
    display: block;
    width: 100%;
    border-radius: .5rem;
  }

  .unicon {
    position: absolute;
    top: -.5rem;
    right: -.5rem;
    background-color: $redColor;
    border-radius: .5rem;

    /deep/ svg {
      fill: lighten($redColor, 50%);
    }
  }
}
</style>