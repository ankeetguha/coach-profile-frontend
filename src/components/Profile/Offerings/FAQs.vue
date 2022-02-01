<template>
  <div class="offering-faqs">
    <div class="pattern">
      <svg :data-src="require('@/assets/images/dots.svg')" />
      <svg :data-src="require('@/assets/images/dots.svg')" />
    </div>
    <div class="title-wrapper">
      <img
        v-show="coach.profilePictureURL != undefined"
        :src="coach.profilePictureURL"
        class="profile-pic"
        alt="Profile Picture"
      />
      <div class="title-info">
        <h3>Have Questions?</h3>
        <p>
          Here are some common questions folks have which you might find useful
        </p>
      </div>
    </div>
    <!--START: Highlights-->
    <div class="faqs">
      <div
        class="faq"
        v-for="faq in faqs"
        :key="faq.id"
        :class="{ selected: faq.selected }"
        @click="$set(faq, 'selected', !faq.selected)"
      >
        <h3 class="question">{{ faq.question }}</h3>
        <div class="answer" v-html="faq.answer"></div>
        <span class="control"></span>
      </div>
    </div>
    <!--END: Highlights-->
  </div>
</template>

<script>
export default {
  name: "OfferingFAQs",
  props: {
    coach: Object,
    faqs: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.offering-faqs {
  position: relative;
  margin: 3rem 1.5rem 0;
}

.pattern {
  position: absolute;
  left: -1.5rem;
  top: -3rem;
  width: calc(100% + 3rem);
  z-index: 1;
  display: flex;
  flex-direction: row;
  /deep/ {
    svg {
      flex: 1;
      width: 100%;
      height: auto;
    }
    g {
      fill: var(--brand-color);
      fill: lighten($blackColor, 10%);
    }
  }
}

.title-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  margin-left: -0.5rem;
  width: calc(100% - 1rem);
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  background-color: #2e2e2e;
  z-index: 1;
}

.title-info {
  display: block;
  h3 {
    color: $whiteColor;
    font-size: $normalFontSize;
    font-weight: $mediumFontWeight;
  }

  p {
    color: $whiteColor;
    font-size: $smallerFontSize;
    opacity: 0.65;
  }
}

.profile-pic {
  display: block;
  width: 4rem;
  margin-right: 1rem;
  border-radius: 50%;
}

.faq {
  position: relative;
  padding: 0.75rem 0;
  border-bottom: 1px solid lighten($blackColor, 10%);

  .control {
    display: block;
    position: absolute;
    top: 1rem;
    right: 0.5rem;
    height: 10px;
    width: 10px;

    &::before,
    &::after {
      content: "";
      background-color: var(--brand-color);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 1px;
      width: 100%;
    }

    &::after {
      height: 100%;
      width: 1px;
    }
  }
}

.question {
  width: 80%;
  font-size: $normalFontSize;
  color: $whiteColor;
  font-weight: $normalFontWeight;
}

.answer {
  display: none;
  font-size: $smallFontSize;
  color: $whiteColor;

  /deep/ {
    * {
      font-size: $smallerFontSize;
      color: darken($whiteColor, 30%) !important;
    }

    p,
    li {
      line-height: 1.4;
    }

    ul {
      margin-left: 1rem;
    }

    li {
      position: relative;
      margin-bottom: 1rem;

      &::before {
        position: absolute;
        display: block;
        content: "";
        height: 6px;
        top: 0.25rem;
        left: -1rem;
        width: 6px;
        border-radius: 50%;
        background-color: var(--brand-color);
      }
    }

    h3,
    h4,
    h5,
    h6 {
      font-size: $normalFontSize;
      * {
        font-size: $normalFontSize;
      }
    }
  }
}

.selected {
  .control::after {
    height: 0;
  }
  .answer {
    display: block;
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .offering-faqs {
    margin-top: 6rem;
  }

  .pattern {
    top: -7rem;
    left: 1rem;
    width: calc(100% - 2rem);
  }

  .title-info {
    h3 {
      font-size: $normalFontSize;
    }
    p {
      font-size: $smallFontSize;
    }
  }

  .faq {
    padding: 1rem;

    &:hover {
      cursor: pointer;
      border-bottom: 1px solid $purpleColor;
    }

    .question {
      font-size: 1rem;
    }

    .answer {
      margin-top: 1rem;

      /deep/ * {
        font-size: $normalFontSize;
      }
    }

    .control {
      top: 1.5rem;
      height: 15px;
      width: 15px;
    }
  }
}
</style>
