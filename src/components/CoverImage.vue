<template>
  <div class="cover-image-wrapper">
    <div class="rel-wrapper">
      <img :src="coach.coverImageURL" alt="Cover Image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CoverImage",
  components: {},
  props: {
    coach: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.cover-image-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  max-width: 100%;
  z-index: 1;
  img {
    display: block;
    width: 100%;
  }
}
</style>