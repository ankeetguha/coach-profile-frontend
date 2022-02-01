<template>
  <div class="offering-inclusions">
    <span class="title">What's Included</span>
    <ul class="inclusions">
      <li class="inclusion" v-for="inclusion in inclusions" :key="inclusion.id">
        <unicon name="check"></unicon>
        <div class="info-wrapper">
          <h3>{{ inclusion.title }}</h3>
          <p>{{ inclusion.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OfferingInclusions",
  props: {
    inclusions: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.offering-inclusions {
  margin: 2rem 1.5rem 5rem;
}

.title {
  position: relative;
  display: table;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background-color: $darkGreenColor;
  color: darken($darkGreenColor, 40%);
  font-size: $normalFontSize;
  font-weight: $mediumFontWeight;
  margin-bottom: -0.75rem;
  margin-left: 0.75rem;

  em {
    font-size: $normalFontSize;
  }
}

.inclusions {
  border: 1px solid $darkGreenColor;
  background-color: #363636;
  border-radius: 0.75rem;
  padding: 2rem 1.25rem 1.25rem;
  margin: 0;

  .inclusion {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0.5rem;
    }

    .unicon {
      margin-left: 0.5rem;
      margin-right: 1.25rem;
      /deep/ svg {
        fill: darken($darkGreenColor, 40%);
        background-color: $darkGreenColor;
        padding: 0.05rem;
        border-radius: 0.25rem;
        height: 1.5rem;
        width: auto;
        margin-top: 0.25rem;
        width: auto;
      }
    }

    h3 {
      color: $whiteColor;
      font-size: 1.1rem;
      font-weight: $mediumFontWeight;
      margin-bottom: 0.15rem;
    }

    p {
      color: $whiteColor;
      font-size: $normalFontSize;
      opacity: 0.65;
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .offering-inclusions {
    margin-top: 3rem;

    .title {
      font-size: $smallFontSize;
    }
  }

  .inclusions {
    padding: 1.75rem 1rem 1rem;
    .inclusion {
      margin-bottom: 1.5rem;
      h3 {
        font-size: $normalFontSize;
      }
      p {
        font-size: $smallFontSize;
      }
    }
  }
}
</style>
