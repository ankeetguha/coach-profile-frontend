<template>
  <div class="cover-image-wrapper">
    <div class="client-login">
      <a
        class="btn btn-text btn-border btn-small"
        href="https://coach.skipperfit.com/client/login"
        target="_blank"
      >
        <unicon name="user"></unicon>
        <span>Client Login</span>
      </a>
    </div>
    <img :src="coach.coverImageURL" alt="Cover Image" />
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
  position: relative;
  height: 135vw;

  img {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
}

.client-login {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem 1.5rem 3rem;
  width: calc(100% - 3rem);
  z-index: 2;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 10%, transparent);
  text-align: right;

  .btn {
    color: $blackColor;
    border: 1px solid var(--brand-color-light-10);
    background-color: var(--brand-color);

    .unicon /deep/ svg {
      fill: $blackColor;
    }
  }
}

@media screen and (min-width: $mobileWidth) {
    .cover-image-wrapper {
        display: none !important;
    }
}
</style>