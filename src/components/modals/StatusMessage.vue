<template>
  <div class="status-message" :class="{ show: show, error: !isSuccess }">
    <span class="success">{{ successMessage }}</span>
    <span class="failure">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "StatusMessage",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    isSuccess: {
      type: Boolean,
      required: true,
    },
    successMessage: {
      type: String,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
.status-message {
  display: none;
  background-color: $greenColor;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.status-message.show {
  display: block;
}

.status-message span {
  font-size: $smallFontSize;
  font-weight: $mediumFontWeight;
  line-height: 1rem;
}

.success {
  color: darken($greenColor, 50%);
}

.failure {
  display: none;
  color: lighten($redColor, 40%);
}

.status-message.error {
  background-color: $redColor;

  .success {
    display: none;
  }

  .failure {
    display: block;
  }
}

@media only screen and (max-width: $mobileWidth) {
  .status-message {
    position: fixed;
    left: 0;
    right: 0;
    top: -6rem;
    padding: .75rem 1rem;
    width: fit-content;
    margin: auto;
    z-index: 10;

    span {
      font-size: $normalFontSize;
    }

    &.show {
      box-shadow: 0 0.5rem 0.7rem -0.1rem rgba(0, 0, 0, 0.15);
    }
  }
}
</style>