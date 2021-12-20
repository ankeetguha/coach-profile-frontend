<template>
  <div class="plan-steps-wrapper">
    <label class="label-small">How It Works</label>
    
    <VueSlickCarousel
      :arrows="false"
      :dots="false"
      :infinite="false"
      :loop="false"
      :slidesToShow="this.isMobile() ? 1.75 : 3"
      class="plan-steps-list slick-equal-height"
    >
      <div class="plan-step-item plan-step-item-first">
        <img
          src="@/assets/images/icons/icon-plan-works-step-4.png"
          alt="Skipper Plans Step"
        />
        <div class="plan-step-item-info">
          <h3>Plan Access</h3>
          <p>
            Once you purchase a plan, you'll get access to all workouts and
            knowledge resources needed to execute it
          </p>
        </div>
      </div>
      <div class="plan-step-item">
        <img
          src="@/assets/images/icons/icon-plan-works-step-2.png"
          alt="Skipper Plans Step"
        />
        <div class="plan-step-item-info">
          <h3>Track Progress</h3>
          <p>
            Start executing the plan and track all your workouts through the
            workout calendar
          </p>
        </div>
      </div>
      <div class="plan-step-item">
        <img
          src="@/assets/images/icons/icon-plan-works-step-1.png"
          alt="Skipper Plans Step"
        />
        <div class="plan-step-item-info">
          <h3>Get Fit</h3>
          <p>
            Get closer to your fitness goal by executing the plan. I'd love to
            see a picture of you smashing your goal
          </p>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
//Slick carousel for gallery images
import VueSlickCarousel from "vue-slick-carousel";

export default {
  name: "OnlinePlanFeatures",
  components: { VueSlickCarousel },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.plan-steps-wrapper {
  margin-left: -1.5rem;
  width: calc(100% + 3rem);
  padding: 0 1.5rem;
  border-top: 1px solid #404040;
  border-bottom: 1px solid #404040;
  margin-top: 3rem;
  padding-bottom: 0.5rem;

  .label-small {
    margin: 2rem 1.5rem 1rem;
  }
  /deep/ {
    .plan-step-item {
      position: relative;
      text-align: center;
      padding: 3rem 0 1.5rem;
      margin-top: 3rem;
      margin-left: 1.5rem;
      height: calc(100% - 8rem - 2px);
      width: calc(100% - 4rem - 2px) !important;
      border-radius: 1.5rem;
    }

    .plan-step-item img {
      display: block;
      position: absolute;
      transform: translateY(-3.5rem);
      top: 0;
      left: 0;
      right: 0;
      width: 5.5rem;
      margin: 0.5rem auto 1rem;
      z-index: 10;
    }

    .plan-step-item-info::before {
      position: absolute;
      display: block;
      content: "";
      background-image: url("~@/assets/images/arrow-icon.png");
      background-size: 25px;
      height: 15px;
      width: 15px;
      padding: 5px;
      top: 3rem;
      left: -2.75rem;
      border-radius: 50%;
      color: darken($greenColor, 45%);
      background-color: $greenColor;
    }

    .plan-step-item-first .plan-step-item-info::before {
      display: none;
    }

    .plan-step-item .label-small {
      color: $purpleColor;
    }

    .plan-step-item {
      h3 {
        font-size: 1rem;
        color: $whiteColor;
      }

      p {
        color: $whiteColor;
        font-size: $smallFontSize;
        opacity: $lightOpacity;
        font-weight: $normalFontWeight;
      }
    }
  }
}
</style>