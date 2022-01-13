<template>
  <div v-if="show" class="modal-loader" :class="{ show: show }">
    <h3>{{ content.title }}</h3>
    <p>{{ content.description }}</p>
    <LineLoader :showLoader="true"></LineLoader>
  </div>
</template>

<script>
//Import components
import LineLoader from "@/components/loaders/LineLoader";

export default {
  name: "ModalLoader",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
  },

  components: {
    LineLoader,
  },
};
</script>

<style scoped lang="scss">
.modal-loader {
  position: fixed;
  z-index: 105;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  background-color: $whiteColor;
  border-radius: 1rem;
  box-shadow: 0 0 0.75rem 0.15rem rgba(0, 0, 0, 0.15);
  padding: 1.5rem 1.5rem 3rem;
  overflow: hidden;
  text-align: center;
  width: 20rem;
  display: none;

  h3 {
    font-size: $largerFontSize;
  }

  p {
    color: $greyColor;
  }

  &.show {
    display: block;
  }
}
</style>