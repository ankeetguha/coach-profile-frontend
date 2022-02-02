<template>
  <div class="online-plan">
    <!--START: Plan Features-->
    <div class="plan-steps-wrapper">
      <h3 class="title">Key Features</h3>

      <div class="plan-steps-list">
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
      </div>
    </div>
    <!--END: Plan Features-->
  </div>
</template>

<script>
export default {
  name: "OnlinePlanFeatures",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.plan-steps-wrapper {
  border-top: 1px solid #404040;
  margin-top: 3rem;
  padding-top: 2.5rem;
  padding-bottom: 0.5rem;

  .title {
    color: $whiteColor;
    font-weight: $mediumFontWeight;
    font-size: $mediumFontSize;
    margin: 0 0 1.5rem;
  }

  .plan-step-item {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .plan-step-item img {
    display: block;
    width: 3.5rem;
    margin: 0 1.25rem 0 0;
  }

  .plan-step-item {
    margin-bottom: 2rem;
    h3 {
      font-size: $mediumFontSize;
      font-weight: $mediumFontWeight;
      color: $whiteColor;
    }

    p {
      color: $whiteColor;
      font-size: $normalFontSize;
      opacity: $lightOpacity;
      font-weight: $normalFontWeight;
    }
  }
}

.plan-sample-wrapper {
  padding: 0;
}

//Light Theme
.light-theme {
  .plan-steps-wrapper {
    border-top: 1px solid #DFDFDF;
  }

  .title {
    color: lighten($blackColor, 0%);
  }

  .plan-steps-wrapper .plan-step-item {
    h3 {
      color: lighten($blackColor, 15%);
    }

    p {
      color: lighten($blackColor, 20%);
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .plan-steps-wrapper {
    margin-top: 3rem;
    padding-top: 3rem;

    .title {
      font-size: 1.05rem;
    }

    .plan-step-item {
      margin-bottom: 2.5rem;

      img {
        width: 4.5rem;
        margin-right: 1.5rem;
      }
    }

    .plan-step-item-info {
      h3 {
        font-size: 1rem;
      }
      p {
        font-size: $smallFontSize;
      }
    }
  }
}
</style>