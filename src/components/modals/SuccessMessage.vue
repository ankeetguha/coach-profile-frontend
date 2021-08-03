<template>
  <div class="success-form" :class="{ show: successForm.show }">
    <em class="check">🙌</em>
    <div class="success-info-wrapper">
      <h3>{{ successForm.title }}</h3>
      <p>{{ successForm.message }}</p>
      <div class="success-btn-wrapper">
        <button
          type="button"
          v-if="successForm.primaryBtn != undefined"
          class="btn btn-primary"
          @click="primaryEventHandler"
        >
          {{ successForm.primaryBtn.title }}
        </button>
        <button
          type="button"
          v-if="successForm.secondaryBtn != undefined"
          class="btn btn-border"
          @click="secondaryEventHandler"
        >
          {{ successForm.secondaryBtn.title }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccessForm",
  props: {
    successForm: {
      type: Object,
      required: true,
    },
  },
  methods: {
    primaryEventHandler() {
      this.$emit("primaryEvent");
    },
    secondaryEventHandler() {
      this.$emit("secondaryEvent");
    },
  },
};
</script>

<style scoped lang="scss">
.success-form {
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.success-form.show {
  display: flex;
}

.success-form /deep/ .unicon svg {
  display: block;
  align-items: center;
  fill: darken($greenColor, 30%);
  stroke: darken($greenColor, 30%);
  background-color: lighten($greenColor, 15%);
  border: 10px solid lighten($greenColor, 25%);
  font-size: 1.5rem;
  padding: 0.75rem;
  border-radius: 50%;
  path {
    stroke-width: 2;
  }
}

.success-info-wrapper {
  width: 70%;
  margin-left: 1.5rem;
  h3 {
    font-size: $largeFontSize;
    color: $whiteColor;
  }
  p {
    color: $whiteColor;
    opacity: $lightOpacity;
  }
}

.check {
  font-size: 3em;
  margin-top: -2rem;
}

.success-btn-wrapper {
  margin: 1rem 0 0;
  .btn {
    margin-right: 0.75rem;
  }
}
</style>