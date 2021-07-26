<template>
  <div class="scroll-end-wrapper">
    <em class="scroll-end-emoji">🤔</em>
    <div class="coach-message-wrapper">
      <h3>Have Questions For Coach?</h3>
      <p>
        Send
        <span v-if="gender == 'Female'">her</span>
        <span v-else>him</span> a message and get them answered
      </p>
      <a href="#" class="btn btn-primary">WhatsApp Coach {{ getFirstName(name) }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageCoach",
  props: {
    name: String,
    gender: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.coach-message-wrapper {
  display: block;
  margin: 0 1rem;
}

.coach-message-wrapper .btn {
  margin-top: 1.5rem;
}

.scroll-end-wrapper {
  position: relative;
  text-align: center;
  margin: 3rem 2rem 4rem;
}

.scroll-end-wrapper::before,
.scroll-end-wrapper::after {
  display: block;
  position: absolute;
  top: 2rem;
  left: 0;
  background-color: #585858;
  content: "";
  height: 1px;
  width: 35%;
}

.scroll-end-wrapper::after {
  left: auto;
  right: 0;
}

.scroll-end-emoji {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  transition: all $transitionSpeed;
  padding: 0 1rem;
  font-size: 3.5rem;
}

.scroll-end-wrapper h3 {
  font-size: $largeFontSize;
  color: $whiteColor;
  margin: 1rem 0 0;
}

.scroll-end-wrapper p {
  color: $lightWhiteColor;
  opacity: $lightOpacity;
}

.scroll-end-wrapper .btn-whatsapp {
  display: inline-block;
  font-size: $smallestFontSize;
  margin: 1rem 0 0;
  background-color: lighten($greenColor, 20%);
  color: darken($greenColor, 50%);
  border: 1px solid lighten($greenColor, 10%);
}

.scroll-end-wrapper.show {
  .scroll-end-emoji {
    opacity: 1;
  }
}
</style>
