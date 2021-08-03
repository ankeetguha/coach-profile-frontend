<template>
  <div class="plans-list-wrapper">
    <label class="plans-list-title">Explore {{ plans.length }} plans</label>
    <router-link
      tag="div"
      class="plan-block"
      v-for="plan in plans"
      :key="plan.id"
      :to="`/${coachSlug}/plans/${plan._id}`"
    >
      <img :src="plan.coverImageURL" class="plan-cover" :alt="plan.title" />
      <div class="plan-info-wrapper">
        <label
          class="plan-tag plan-tag-popular"
          v-if="plan.isMostPopular != undefined && plan.isMostPopular == true"
          >🔥 Most Popular</label
        >
        <div class="rel-wrapper">
          <h3 class="plan-title">{{ plan.title }}</h3>
          <span class="plan-date" v-if="plan.hasDates == true"
            >Starting from {{ convertToMonthDate(plan.startDate) }}</span
          >
          <span class="plan-date" v-else>Monthly batches</span>
          <div class="plan-actions-wrapper">
            <span
              class="plan-price"
              v-if="
                plan.isDiscountedPlan == undefined ||
                plan.isDiscountedPlan == false
              "
            >
              ₹
              <em>{{ convertToIndianNumber(plan.originalPrice) }}</em>
            </span>
            <div v-else>
              <span class="plan-price">
                ₹
                <em>{{ convertToIndianNumber(plan.planPrice) }}</em>
              </span>
              <span class="plan-price slashed-price">
                ₹
                <em>{{ convertToIndianNumber(plan.discountedPrice) }}</em>
              </span>
            </div>
            <span class="plan-action">
              <label>See Plan</label>
              <unicon name="angle-right" />
            </span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CoachPlans",
  props: {
    coachSlug: String,
    plans: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.plans-list-title {
  display: block;
  color: $lightWhiteColor;
  opacity: $lightOpacity;
  font-size: $smallestFontSize;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  padding: 0rem 1.5rem 1rem;
}

.plan-block {
  position: relative;
  background-color: #444;
  margin: 0 1.5rem 2rem;
  padding: 0.5rem;
  border-radius: 2rem;
  box-shadow: 0 0 1.7rem 1.9rem rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  &:last-child {
    margin-bottom: 3rem;
  }

  .plan-cover {
    display: block;
    border-radius: 1.5rem;
    width: 100%;
  }

  .plan-tag {
    display: table;
    margin: -1.75rem 0 1rem;
    color: $whiteColor;
    padding: 0.5rem 0.75rem;
    border-radius: 0.65rem;

    &.plan-tag-popular {
      background: #cb2d3e;
      background: linear-gradient(to right, #8567d4, #573bbd);
      // background: linear-gradient(to right, #f33719, #cb2d3e);
    }
  }
  .plan-info-wrapper {
    position: relative;
    padding: 1rem .5rem 0;

    .plan-title {
      color: $whiteColor;
      font-family: $titleFont;
      font-size: $largeFontSize;
      line-height: $largeFontSize;
      width: calc(100% - 6rem);
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      font-weight: 700;
    }

    .plan-date {
      display: block;
      color: $lightWhiteColor;
      opacity: $lightOpacity;
      margin-bottom: 1rem;
    }
  }

  .plan-actions-wrapper {
    text-align: right;
    position: absolute;
    right: 0;
    top: 0;

    .plan-price {
      display: block;
      color: $lightWhiteColor;
      font-size: $normalFontSize;

      em {
        font-weight: $mediumFontWeight;
        font-size: $mediumFontSize;
      }

      &.slashed-price {
        opacity: $lightOpacity;
        text-decoration: line-through;
        font-size: $smallestFontSize;
        margin-top: 0.25rem;

        em {
          font-size: $smallFontSize;
        }
      }
    }

    .plan-action {
      display: block;
      margin-top: 0.15rem;
      margin-right: -0.5rem;
      color: #717171;

      label,
      .unicon {
        display: inline-block;
        vertical-align: middle;
      }

      .unicon /deep/ svg {
        fill: #717171;
        transform: translateY(2px);
        width: $mediumFontSize;
      }
    }
  }
}
</style>
