<template>
  <div class="scroll-end-wrapper">
    <em class="scroll-end-emoji">🤔</em>
    <div class="coach-message-wrapper">
      <h3>Have Questions For Coach?</h3>
      <p>
        Send
        <span v-if="gender == 'Female'">her</span>
        <span v-else-if="gender == 'Male'">him</span> a message and get them
        answered
      </p>
      <a :href="`https://wa.me/+91${phoneNumber}`" class="btn btn-primary"
        ><unicon name="whatsapp"></unicon>WhatsApp Coach</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageCoach",
  props: {
    name: String,
    gender: String,
    phoneNumber: String,
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
  top: 1.5rem;
  left: 0;
  background-color: darken(#585858, 8%);
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
  font-size: 2.5rem;
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

//Light Theme styles
.light-theme {
  .scroll-end-wrapper {
    h3,p {
      color: $blackColor;
    }
  }
  .scroll-end-wrapper::before,
  .scroll-end-wrapper::after {
    background-color: #cecece;
    top: 1.75rem;
  }
  .scroll-end-emoji {
    font-size: 3.5rem;
  }
}

@media screen and (min-width: $mobileWidth) {
  .scroll-end-wrapper {
    text-align: center;
    margin: 2rem auto 4rem;

    &::before,
    &::after {
      display: none;
    }
  }

  .coach-message-wrapper,
  .scroll-end-emoji {
    display: inline-block;
    vertical-align: middle;
  }

  .scroll-end-emoji {
    font-size: 4.5rem;
  }

  .coach-message-wrapper {
    text-align: left;
  }
}
</style>
