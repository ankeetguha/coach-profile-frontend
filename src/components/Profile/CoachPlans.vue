<template>
  <div class="plans-list-wrapper">
    <label class="plans-list-title">Explore {{ plans.length }} plans</label>
    <router-link
      tag="div"
      class="plan-block"
      v-for="plan in plans"
      :key="plan.id"
      :to="`/${!$store.state.isSubDomain ? coachSlug + '/' : ''}plans/${
        plan._id
      }`"
    >
      <img :src="plan.coverImageURL" class="plan-cover" :alt="plan.title" />
      <div class="plan-info-wrapper">
        <label
          class="plan-tag plan-tag-popular"
          v-if="plan.isMostPopular != undefined && plan.isMostPopular == true"
          >🔥 Most Popular</label
        >
        <div class="plan-details-block">
          <h3 class="plan-title">
            {{ plan.title }}
            <span class="plan-action">
              <label>See Plan</label>
              <unicon name="angle-right" />
            </span>
          </h3>

          <div class="plan-actions-wrapper">
            <span
              class="plan-price"
              v-if="
                plan.isDiscountedPlan == undefined ||
                plan.isDiscountedPlan == false
              "
            >
              ₹
              <em>{{ convertToIndianNumber(plan.planPrice) }}</em>
            </span>
            <div v-else>
              <span class="plan-price slashed-price">
                ₹
                <em>{{ convertToIndianNumber(plan.planPrice) }}</em>
              </span>
              <span class="plan-price">
                ₹
                <em>{{ convertToIndianNumber(plan.discountedPrice) }}</em>
              </span>
            </div>

            <span
              class="plan-date"
              v-if="plan.hasDates == true && plan.startDate != undefined"
              >Starts {{ convertToMonthDate(plan.startDate) }}</span
            >
            <span
              class="plan-date"
              v-else-if="
                plan.isMonthlyPlan != null &&
                plan.planDuration != null &&
                plan.isMonthlyPlan == false
              "
              >{{ plan.planDuration }}</span
            >
            <span class="plan-date" v-else-if="plan.hasDates == false"
              >Per Month</span
            >
            <span class="plan-date" v-else></span>
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
  margin: 0 1rem 2rem;
  padding: 0.35rem;
  border-radius: 1.75rem;
  box-shadow: 0 0 1.7rem 1.9rem rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  &:last-child {
    margin-bottom: 3rem;
  }

  .plan-cover {
    display: block;
    border-radius: 1.5rem;
    border-bottom-left-radius: 1.25rem;
    border-bottom-right-radius: 1.25rem;
    width: 100%;
  }

  .plan-tag {
    display: table;
    margin: -1.75rem 0 0.5rem;
    color: $whiteColor;
    font-size: $smallerFontSize;
    padding: 0.45rem 0.65rem 0.45rem 0.5rem;
    border-radius: 0.5rem;

    &.plan-tag-popular {
      background: linear-gradient(to right, #8567d4, #573bbd);
      // background: linear-gradient(to right, #cb2d3e, #ff7349);
    }
  }
  .plan-info-wrapper {
    position: relative;
    padding: 1rem 0.5rem 0;

    .plan-title {
      color: $whiteColor;
      font-family: $titleFont;
      font-size: $mediumFontSize;
      line-height: $largeFontSize;
      width: calc(100% - 6rem);
      display: inline-block;
      vertical-align: top;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      font-weight: 700;
    }

    .plan-date {
      display: block;
      font-size: $smallerFontSize;
      color: $lightWhiteColor;
      opacity: $lightOpacity;
      margin-bottom: 1rem;
      margin-top: 0.25rem;
    }
  }

  .plan-actions-wrapper {
    text-align: right;
    display: inline-block;
    vertical-align: top;
    width: 6rem;

    .plan-price {
      display: block;
      color: $lightWhiteColor;
      font-size: $smallFontSize;

      em {
        font-weight: $mediumFontWeight;
        font-size: 1rem;
      }

      &.slashed-price {
        opacity: $lightOpacity;
        text-decoration: line-through;
        font-size: $smallestFontSize;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;

        em {
          font-size: $smallerFontSize;
        }
      }
    }
  }
}

.plan-action {
  display: block;
  margin-bottom: 0.25rem;
  margin-right: -0.5rem;
  color: #717171;

  label {
    font-weight: $normalFontWeight;
    font-size: $smallFontSize;
    text-transform: none;
    letter-spacing: 0;
  }
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

//Light Theme styles
.light-theme {
  .plans-list-title {
    display: table;
    position: relative;
    text-align: center;
    color: $lightBlackColor;
    background-color: #E8E8E8;
    opacity: 1;
    padding: 0 1.5rem;
    margin: 0 auto 2rem;

    &::before {
      content: "";
      display: block;
      position: absolute;
      height: 1px;
      width: 80vw;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      background-color: #c7c7c7;
      z-index: -1;
    }
  }

  .plan-block {
    background-color: transparent;
    box-shadow: none;
    border: none;

    .plan-date,
    .plan-price {
      color: $blackColor;
    }

    .plan-cover {
      border-radius: 0.75rem;
    }

    .plan-info-wrapper {
      margin: -2rem 1rem 0;
      background: $lightWhiteColor;
      padding: 1rem 1.25rem;
      border-radius: 1rem;
      border: 1px solid #ececec;
      box-shadow: 0 1rem 1.5rem -0.5rem rgb(222, 222, 222);
    }

    .plan-title {
      color: $lightBlackColor;
      font-family: $bodyFont;
      text-transform: none;
      letter-spacing: 0;
      font-weight: 500;
      margin-bottom: 0;
    }

    .plan-actions-wrapper {
      padding-bottom: 0rem;
      margin-bottom: 0.85rem;
      border-bottom: 1px solid var(--brand-color);
    }

    .plan-action {
      display: table;
      background-color: var(--brand-color);
      color: var(--brand-color-light-45);
      border-radius: 0.5rem;
      padding: 0 0.5rem;
      margin-top: 0.75rem;

      .unicon /deep/ svg {
        fill: var(--brand-color-light-45);
      }
    }
  }
}

@media screen and (min-width: $mobileWidth) {
  .plans-list-title {
    font-size: $normalFontSize;
    margin-bottom: 1rem;
    text-align: left;
  }

  .plans-list-wrapper {
    margin: 0 20%;
    text-align: center;

    .plan-info-wrapper {
      text-align: left;
    }
  }

  .plan-block {
    display: inline-block;
    vertical-align: top;
    width: calc(50% - 2.7rem);
  }
}
</style>
