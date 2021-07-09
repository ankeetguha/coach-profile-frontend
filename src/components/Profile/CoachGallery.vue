<template>
  <!--START: Gallery Images-->
  <div class="coach-gallery">
    <div
      v-for="coachImage in galleryImages"
      :key="coachImage._id"
      class="coach-highlight-image-wrapper"
    >
      <img
        :src="coachImage.url"
        alt="Cover Image"
        class="coach-highlight-image"
      />
    </div>
  </div>
  <!--END: Gallery Images-->
</template>

<script>
export default {
  name: "CoachGallery",
  props: {
    galleryImages: Array,
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.coach-gallery {
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
}

.coach-highlight-image-wrapper {
  flex: 1 0 50%;
  margin-bottom: 1rem;
  box-shadow: 0 0 0.7rem -0.1rem rgba(0, 0, 0, 0);
}

.coach-highlight-image {
  transition: all $transitionSpeed;
  display: block;
  width: calc(100% - 1rem);
  border-radius: 1rem;
  margin: auto;
}
</style>

            