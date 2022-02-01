<template>
  <div v-if="onlinePlan.workouts != undefined" class="plan-preview-wrapper">
    <div class="title-wrapper">
      <h3 class="week-title"><label>Week 1</label>Workouts Preview</h3>
      <div class="online-plan-summary">
        <div>
          <em>{{ onlinePlan.workouts.length }}</em>
          <label>workouts</label>
        </div>
      </div>
    </div>
    <div class="calendar-days">
      <div
        class="calendar-day"
        v-for="(day, index) in 7"
        :key="day"
        :class="{ active: activeDay === index }"
        @click="gotoDay(day)"
      >
        <span>Day</span>
        <b>{{ day }}</b>
      </div>
    </div>

    <!--START: Workout Days-->
    <VueSlickCarousel
      :arrows="false"
      :dots="true"
      :infinite="false"
      :loop="false"
      :slidesToShow="1"
      @afterChange="changeActiveDay"
      class="workouts"
      ref="workoutsCarousel"
    >
      <div class="workout" v-for="i in 7" :key="i">
        <div
          v-if="getDaysWorkout(i) != undefined"
          class="workout-day"
          :class="{ 'locked-workout': i != 1 }"
          @click="showWorkouts"
        >
          <unicon v-if="i == 1" class="workout-icon" name="dumbbell"></unicon>
          <unicon v-else class="workout-icon" name="lock"></unicon>
          <div class="workout-info">
            <h3>{{ getDaysWorkout(i).title }}</h3>
            <span>{{ getDaysWorkout(i).numberOfExcercises }} Exercises</span>
            <button v-if="i == 1" class="btn btn-text">View Workouts</button>
            <button v-else class="btn btn-text">
              Locked - Buy plan to access
            </button>
          </div>
        </div>
         <div
          v-else
          class="workout-day no-workout"
        >
        No Workouts
        </div>
      </div>
    </VueSlickCarousel>
    <!--END: Workout Days-->
  </div>
</template>

<script>
//Importing CoachService
import CoachService from "@/controllers/CoachService";

//Slick carousel for
import VueSlickCarousel from "vue-slick-carousel";

export default {
  name: "OnlinePlanPreview",
  data() {
    return {
      showOnlinePlanLoader: false,
      hasOnlinePlan: false,
      onlinePlan: {},
      activeDay: 0,
    };
  },
  props: {
    onlinePlanID: String,
    coachSlug: String,
  },
  components: {
    VueSlickCarousel,
  },
  async created() {
    await this.getOnlinePlan();
  },
  methods: {
    async getOnlinePlan() {
      var response = await CoachService.GetOnlinePlanDetails({
        slug: this.coachSlug,
        onlinePlanID: this.onlinePlanID,
      });

      if (!response.hasError) {
        this.onlinePlan = response.data;
        this.hasOnlinePlan = true;
      } else this.hasOnlinePlan = false;

      this.showOnlinePlanLoader = false;
    },

    getDaysWorkout(day) {
      return this.onlinePlan.workouts.find((workout) => workout.day === day);
    },

    gotoDay(i) {
      this.activeDay = i - 1;
      this.$refs.workoutsCarousel.goTo(i - 1);
    },

    changeActiveDay(i) {
      this.activeDay = i;
    },

    showWorkouts() {
      if (this.activeDay == 0) {
        this.$parent.sampleWorkout = this.getDaysWorkout(1);
        this.$parent.sampleExercises = this.getDaysWorkout(1).excercises;
        this.$emit("showSampleWorkouts");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.title-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 0.75rem;
}

.online-plan-summary {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  text-align: right;

  div {
    text-align: right;

    em {
      color: var(--brand-color);
      margin-right: 0.25rem;
    }

    label {
      font-size: $smallestFontSize;
      color: $whiteColor;
      opacity: 0.65;
    }
  }
}

.plan-preview-wrapper {
  /deep/ {
    .slick-dots {
      display: block;
      margin: 1rem auto 0;
      text-align: center;
      button {
        display: none;
      }
      li {
        display: inline-block;
        vertical-align: middle;
        margin: 0 0.35rem;
        height: 4px;
        width: 10px;
        border-radius: 0.5rem;
        background: #444;
        &.slick-active {
          background: var(--brand-color);
          border: 1px solid var(--brand-color-dark-25);
          width: 20px;
        }
      }
    }
  }
}

.workouts {
  margin-left: -1.5rem;
  width: calc(100% + 3rem);
}

.week-title {
  flex: 1;
  font-size: $normalFontSize;
  font-weight: $mediumFontWeight;
  color: $whiteColor;
  margin-top: 0.5rem;
  margin-bottom: -.15rem;


  label {
    display: block;
    color: var(--brand-color);
    font-size: $smallestFontSize;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
  }
}

.calendar-days {
  margin-bottom: 1rem;
}

.calendar-day {
  display: inline-block;
  cursor: pointer;
  vertical-align: bottom;
  color: $whiteColor;
  text-align: center;
  padding: 0.35rem 0.5rem;
  margin-top: 0.5rem;
  width: calc(14.28% - 1rem - 2px);
  border-radius: 0.5rem;
  border: 1px solid transparent;
  b {
    display: block;
    font-size: $normalFontSize;
    font-weight: $normalFontWeight;
    opacity: $lightOpacity;
  }
  span {
    font-size: 0.65rem;
    opacity: $lightOpacity;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
  }
  &.active {
    background-color: #363636;
    b {
      color: var(--brand-color);
      opacity: 1;
    }
    span {
      color: #fff;
      opacity: 1;
    }
  }
}

.workout-day {
  border: 1px solid #444444;
  background-color: #363636;
  border-radius: 0.75rem;
  padding: 0.65rem 1rem 0.75rem;
  margin: 0 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  .btn-text {
    color: $whiteColor;
    font-size: $smallerFontSize;
    font-weight: $normalFontWeight;
    padding: 0;
    margin-top: 0.75rem;
    opacity: 0.5;
    &:hover {
      background-color: transparent;
    }
  }
  .workout-icon {
    /deep/ svg {
      fill: var(--brand-color);
      margin-right: 1rem;
      transform: translateY(-0.75rem);
    }
  }
  h3 {
    font-size: 1rem;
    color: $whiteColor;
    margin-bottom: 0;
  }
  span {
    font-size: $smallFontSize;
    display: block;
    color: var(--brand-color);
  }
  &.locked-workout {
    .workout-icon {
      /deep/ svg {
        fill: $whiteColor;
        opacity: 0.45;
        margin-right: 0.75rem;
      }
    }
    h3 {
      color: #a5a5a5;
    }
    span {
      color: #828282;
    }
  }
}

.no-workout {
  padding: 1.5rem;
  color: $whiteColor;
  opacity: .65;
}


//Light Theme styles
.light-theme {
  .plan-preview-wrapper {
    .week-title {
      color: $blackColor;
    }
    /deep/ .slick-dots li {
      background-color: #ececec;
      border-color: darken(#ececec, 15%);
      &.slick-active {
        background-color: var(--brand-color);
        border-color: var(--brand-color);
      }
    }
  }
  .calendar-day {
    color: $greyColor;
    &.active {
      background-color: var(--brand-color);
      span,
      b {
        color: var(--brand-color-dark-50);
      }
    }
  }
  .workout-day {
    border: 1px solid #e2e2e2;
    background-color: #fff;
    h3 {
      color: $blackColor;
      opacity: 0.75;
    }
    .btn-text {
      color: $greyColor;
      opacity: 1;
    }
    &.locked-workout {
      border: 1px solid #d1d1d1;
      background-color: #ebebeb;
      .btn-text {
        color: $blackColor;
        opacity: 0.5;
      }
      h3 {
        color: #5e5e5e;
      }
      .workout-icon /deep/ svg {
        fill: $blackColor;
        opacity: 0.5;
      }
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .week-title {
    font-size: 1.05rem;

    label {
      font-size: $smallerFontSize;
    }
  }

  .calendar-day {
    width: auto;
    padding: .35rem .75rem;
    margin: .25rem;
  }

  .workout-day {
    padding: 1.25rem 1.5rem;
  }
}
</style>