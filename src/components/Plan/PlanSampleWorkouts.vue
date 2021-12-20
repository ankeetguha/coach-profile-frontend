<template>
  <div v-if="plan.workouts != undefined" class="plan-preview-wrapper">
    <h3 class="week-title">Workouts Preview - Week 1</h3>
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
      </div>
    </VueSlickCarousel>
    <!--END: Workout Days-->
  </div>
</template>

<script>
//Slick carousel for
import VueSlickCarousel from "vue-slick-carousel";

export default {
  name: "PlanSampleWorkouts",
  data() {
    return {
      activeDay: 0,
    };
  },
  props: {
    plan: Object,
  },
  components: { VueSlickCarousel },
  methods: {
    getDaysWorkout(day) {
      return this.plan.workouts.find((workout) => workout.day === day);
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
.plan-preview-wrapper {
  padding: 2rem 1.5rem;

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
        margin: 0 0.5rem;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #444;
        border: 1px solid lighten(#444, 5%);

        &.slick-active {
          background: var(--brand-color);
          border: 1px solid var(--brand-color-dark-25);
        }
      }
    }
  }
}

.week-title {
  font-size: $mediumFontSize;
  color: $whiteColor;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
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
    font-size: $mediumFontSize;
    font-weight: $normalFontWeight;
    opacity: $lightOpacity;
  }

  span {
    font-size: $smallestFontSize;
    opacity: $lightOpacity;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
  }

  &.active {
    background: #414141;

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
  border: 1px solid #4b4b4b;
  background-color: #414141;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  .btn-text {
    color: $whiteColor;
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
    font-size: 1.15rem;
    color: $whiteColor;
    margin-bottom: 0;
  }

  span {
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
</style>