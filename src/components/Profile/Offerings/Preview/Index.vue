<template>
  <div class="offering-type-preview">
    <!--START: Online Plan-->
    <OnlinePlanSampleWorkouts
      v-if="offering.offeringType == 'diy-plan'"
      :onlinePlanID="offering.onlinePlan.onlinePlanID"
      :coachSlug="coachSlug"
      @showSampleWorkouts="showWorkoutsModal"
    >
    </OnlinePlanSampleWorkouts>
    <!--END: Online Plan-->

    <!--START: Video Course-->
    <VideoCourse
      v-if="offering.offeringType == 'video-course'"
      :offeringSlug="offering.slug"
      :coachSlug="coachSlug"
      :introVideoURL="
        offering.coverVideoURL != undefined && offering.coverVideoURL != null
          ? offering.coverVideoURL
          : null
      "
      @playIntroVideo="playIntroVideo"
    >
    </VideoCourse>
    <!--END: Online Plan-->

    <!--START: E-Book-->
    <EBook v-if="offering.offeringType == 'e-book'"> </EBook>
    <!--END: E-Book-->

    <!--START: Personal Training-->
    <PersonalTraining
      v-if="offering.offeringType == 'personal-training'"
      :personalTraining="offering.personalTraining"
    >
    </PersonalTraining>
    <!--END: Personal Training-->

    <!--START: Workout Exercises-->
    <WorkoutExercises
      class="sample-workouts"
      :show="showSampleWorkouts"
      :workout="sampleWorkout"
      :excercises="sampleExercises"
      @closeWorkoutModal="closeWorkoutsModal"
    ></WorkoutExercises>
    <!--START: Workout Exercises-->

    <!--START: Personal Training-->
    <Appointment
      v-if="offering.offeringType == 'consultation-call'"
      :consultationCall="offering.consultationCall"
    >
    </Appointment>
    <!--END: Personal Training-->
  </div>
</template>

<script>
//Importing components
import OnlinePlanSampleWorkouts from "./OnlinePlanSampleWorkouts";
import WorkoutExercises from "@/components/Plan/WorkoutExercises";

import EBook from "./EBook";
import VideoCourse from "./VideoCourse";
import PersonalTraining from "./PersonalTraining";
import Appointment from "./Appointment";

export default {
  name: "OfferingTypePreview",
  data() {
    return {
      sampleWorkout: {},
      sampleExercises: [],
    };
  },
  props: {
    offering: Object,
    coachSlug: String,
    showSampleWorkouts: Boolean,
  },

  components: {
    WorkoutExercises,
    OnlinePlanSampleWorkouts,
    VideoCourse,
    EBook,
    PersonalTraining,
    Appointment
},

  methods: {
    playIntroVideo() {
      this.$emit("playIntroVideo");
    },
    showWorkoutsModal() {
      this.$emit("toggleSampleWorkouts", true);
    },
    closeWorkoutsModal() {
      this.$emit("toggleSampleWorkouts", false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.offering-type-preview {
  margin: 2rem 1.5rem 3rem;
}

.sample-workouts {
  /deep/ {
    .modal-block-info {
      background-color: $blackColor;

      h2 {
        color: $whiteColor;
      }
    }

    .modal-close {
      background-color: lighten($blackColor, 10%);

      .unicon svg {
        fill: $whiteColor;
      }
    }

    .excercise-wrapper {
      background-color: darken($blackColor, 10%);

      .superset-item {
        overflow: hidden;
        border-color: darken($blackColor, 10%);
      }
    }
  }
}

//Light Theme
.light-theme {
  .sample-workouts {
    /deep/ {
      .modal-block-info {
        background-color: $whiteColor;

        h2 {
          color: $blackColor;
        }
      }

      .modal-close {
        background-color: darken($whiteColor, 10%);

        .unicon svg {
          fill: lighten($blackColor, 15%);
        }
      }

      .excercise-wrapper {
        background-color: darken($whiteColor, 10%);

        .superset-item {
          overflow: hidden;
          border-color: darken($whiteColor, 10%);
        }
      }
    }
  }
}
</style>