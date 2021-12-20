<template>
  <div>
    <div
      v-if="workout != undefined"
      class="modal modal-large-size"
      :class="{ show: show }"
    >
      <div class="rel-wrapper">
        <div class="modal-close" @click="closeModal()">
          <unicon name="times"></unicon>
        </div>
        <div class="modal-block-wrapper" @click="showStatus = false">
          <div class="modal-block-info">
            <h2>{{ workout.title }}</h2>
          </div>

          <div class="modal-scroll-wrapper">
            <div class="excercise-wrapper">
              <ul class="excercises-list">
                <Excercise
                  v-for="(excercise, counter) in workout.excercises"
                  :key="excercise._id"
                  :counter="counter"
                  :excercise="excercise"
                ></Excercise>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-overlay" :class="{ show: show }" @click="closeModal"></div>
  </div>
</template>

<script>
//Importing Components
import Excercise from "./CalendarExercises.vue";

export default {
  name: "WorkoutExercises",
  data() {
    return {
      showBackground: false,
      superset: {
        description: null,
        excercises: [],
      },
    };
  },

  props: {
    show: {
      type: Boolean,
      required: true,
    },

    workout: {
      type: Object,
      required: false,
    },
  },

  components: {
    Excercise,
  },

  methods: {
    closeModal() {
      this.showBackground = false;
      this.$emit("closeWorkoutModal");
    },
  },
};
</script>

<style scoped lang="scss">
.bg-overlay.show {
  opacity: 0.5;
}

.line-loader {
  bottom: 0;
}

.modal {
  width: 35rem;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 0 0.7rem -0.1rem rgba(0, 0, 0, 0.5);

  .modal-block-info {
    background-color: $darkBlueColor;
    padding: 1rem 1.5rem;
    margin: 0;

    h2 {
      color: $whiteColor;
      margin-bottom: 0;
    }

    .workout-date {
      color: lighten($darkBlueColor, 65%);
    }
  }
}

.modal-close {
  top: 1rem;
  right: 1rem;
  background-color: lighten($darkBlueColor, 15%);

  /deep/ .unicon svg {
    fill: lighten($darkBlueColor, 65%);
  }
}

.confirmation-modal {
  box-shadow: 0 0 0.7rem 1rem rgba(0, 0, 0, 0.15);
  width: calc(100% - 4rem);
  top: auto;
  bottom: 0;
  left: 0;
  transform: translateY(50vh);

  &.show {
    transform: translateY(0);
  }
}

.workout-title {
  // color: $purpleColor;
  font-size: $mediumFontSize;
  font-weight: $boldFontWeight;
  border-radius: 0;
  background-color: transparent;
  border: none;
  padding: 0 0 0.25rem;
  border-bottom: 1px solid transparent;
  margin-bottom: 0.5rem;
  width: 100%;
}

h2 {
  font-size: $largeFontSize;
  margin-bottom: 1.5rem;
}

.client-details-wrapper {
  margin-top: 1.5rem;
}

.status-message {
  margin: 1rem auto 0;
}

.modal-scroll-wrapper {
  max-height: calc(80vh - 8rem);
  padding: 0;
}

.modal-scroll-wrapper form {
  margin-bottom: 4rem;
}

.btn-primary {
  position: absolute;
  z-index: 5;
  left: 0;
  bottom: -0.5rem;
  display: block;
  width: 100%;
}

.field-label-additional {
  cursor: pointer;
  color: $purpleColor;
  margin: 0.5rem 0 0;
  display: inline-block;

  .unicon /deep/ svg {
    display: inline-block;
    vertical-align: middle;
    width: $smallFontSize;
    fill: $purpleColor;
    margin-top: -2px;
  }
  .unicon {
    margin-right: 0.1rem;
  }

  &:hover {
    fill: darken($purpleColor, 15%);
  }

  &.show {
    margin-top: 1rem;
  }

  span {
    display: none;
  }

  span.show {
    display: block;
  }
}

.accordion-block {
  margin-top: 1.5rem;
}

.status-message {
  position: absolute;
  top: calc(100% + 0rem);
  left: 0;
  right: 0;
  text-align: center;
  margin: 0.5rem auto 0;

  &.show {
    display: block;
    top: calc(100% - 3.5rem);
    margin: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    width: fit-content;
  }

  span {
    font-weight: $mediumFontWeight;
  }
}

.modal-scroll-wrapper {
  form {
    margin-bottom: 1rem;
  }
}

.workout-status-wrapper {
  display: flex;
  align-items: center;
}

.workout-date {
  align-self: center;
  font-size: $smallerFontSize;
  color: $purpleColor;
  font-weight: $boldFontWeight;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  margin: 2rem 0 0;
}

.workout-status {
  display: block;
  position: relative;
  padding-left: 2rem;
  padding: 0.35rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: capitalize;
  font-size: $smallFontSize;
  font-weight: $mediumFontWeight;
  margin: 0 0 0.75rem 0;
  width: 100%;
  text-align: center;

  &.workout-missed {
    color: #802319;
    background-color: #f18275;
    border: 1px solid darken(#f18275, 10%);
  }

  &.workout-completed {
    background-color: #a3efce;
    color: #13613f;
    border: 1px solid darken(#a3efce, 10%);
  }
}

.excercise-wrapper {
  padding: 1rem 1.5rem;

  .workout-date {
    margin: 0 0 0.75rem;
  }
}

.excercises-list {
  margin: 0;
  background-color: $whiteColor;
  border-radius: 0.5rem;
}

.btn-superset {
  display: block;
  margin: 1rem auto -0.5rem;
}

.superset-disclaimer {
  display: block;
  text-align: center;
  border-radius: 0.5rem;
  margin: 1.25rem auto 0;
  width: max-content;
  font-size: $smallestFontSize;
  font-weight: $mediumFontWeight;
  background-color: $purpleColor;
  color: lighten($purpleColor, 35%);
  padding: 0.45rem 0.75rem;
}

.btn-add-excercise {
  display: block;
  margin: 1rem auto 0;
}

/deep/ .zero-state-animation {
  width: 70% !important;
}

.workout-day-options {
  position: relative;
  bottom: 0.25rem;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  background: $whiteColor;
  padding: 0.75rem 1rem;
  box-shadow: 0 0 0.7rem -0.1rem rgba(0, 0, 0, 0.15);

  &.workout-options-missed .btn-missed {
    background-color: #f84d39;
    border-color: darken(#f84d39, 10%);

    /deep/ .unicon svg {
      fill: darken($redColor, 50%);
    }
    label {
      color: darken($redColor, 50%);
    }
  }

  &.workout-options-completed .btn-complete {
    background-color: #00dc7d;
    border-color: darken(#00dc7d, 10%);

    /deep/ .unicon svg {
      fill: #0a4a1d;
    }
    label {
      color: #0a4a1d;
    }
  }

  .btn {
    cursor: pointer;
    margin: 0 0.5rem;
    border: 1px solid #bbbcc7;

    &:hover {
      border-color: $purpleColor;
    }

    label {
      cursor: pointer;
      font-size: $smallerFontSize;
    }
  }
}

@media screen and (max-width: $mobileWidth) {
  .modal {
    width: calc(100% - 1rem);
  }

  .excercise-wrapper {
    background-color: $blackColor;
    padding: 0.5rem;
  }

  .workout-day-options {
    display: flex;
    flex-direction: row;

    .btn {
      flex: 1;
    }
  }
}
</style>