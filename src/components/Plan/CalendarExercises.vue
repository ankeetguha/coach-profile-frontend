<template>
  <li
    class="excercise-item"
    v-if="excercise.isSuperset == undefined || excercise.isSuperset == false"
    :class="{ 'excercise-superset': excercise.isSuperset }"
  >
    <span class="exercise-counter">{{ counter + 1 }}</span>
    <div class="excercise-info">
      <h3 class="excercise-title">{{ excercise.title }}</h3>
      <p class="excercise-description">{{ excercise.description }}</p>
    </div>
    <a
      v-if="excercise.videoURL !== undefined && excercise.videoURL !== null"
      :href="excercise.videoURL"
      target="_blank"
      class="btn btn-icon"
    >
      Watch Video <unicon name="video"></unicon>
    </a>
  </li>
  <li v-else class="superset-item">
    <div class="superset-item-wrapper">
      <div class="superset-item-info">
        <label>Superset</label>
      </div>
      <h3 class="excercise-description">{{ excercise.description }}</h3>
    </div>
    <ul>
      <Superset
        v-for="(excerciseItem, counter) in excercise.excercises"
        :key="excerciseItem.id"
        :counter="counter"
        :excercise="excerciseItem"
        :isSupersetExcercise="true"
        :supersetID="excercise.tempID"
      ></Superset>
    </ul>
  </li>
</template>

<script>
export default {
  name: "CalendarExercises",
  data() {
    return {
      showVideo: false,
    };
  },
  props: {
    excercise: {
      type: Object,
      required: true,
    },
    counter: {
      type: Number,
      required: true,
    },
    supersetID: {
      type: String,
      default: null,
      required: false,
    },
    isSupersetExcercise: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  components: {
    Superset: () => import("./CalendarExercises.vue"),
  },
};
</script>

<style scoped lang="scss">
.excercise-item {
  position: relative;
  border-bottom: 1px solid $greyBorderColor;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: baseline;

  .exercise-counter {
    width: 1rem;
    font-size: $smallestFontSize;
    color: $greyColor;
  }

  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  &:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &:hover {
    background-color: $whiteColor;
  }
}

.superset-item {
  position: relative;
  border: 2px solid $purpleColor;
  border-radius: 0.25rem;

  ul {
    margin-left: 1rem;
  }
}

.superset-item-wrapper {
  display: block;
  background: var(--brand-color);
  padding: 0.5rem;

  .excercise-description {
    color: $whiteColor;
    font-size: $normalFontSize;
    font-weight: $normalFontWeight;
    margin: .15rem 0 0 0.15rem;

    &::placeholder {
      color: $whiteColor;
      opacity: 0.5;
    }
  }
}

.superset-item-info {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin-top: -0.25rem;

  .drag-handle {
    margin-left: 0;
    margin-right: 0.35rem;
    align-self: center;

    /deep/ svg {
      width: $normalFontSize;
      fill: $whiteColor;
    }
  }

  label {
    align-self: center;
    color: $whiteColor;
    font-size: $smallerFontSize;
    font-weight: $boldFontWeight;
    letter-spacing: 0.015rem;
    margin-top: 0.25rem;
    text-transform: uppercase;
  }

  .superset-remove {
    @include vertical-center-align;
    right: 0;
    cursor: pointer;

    /deep/ svg {
      width: $mediumFontSize;
      fill: $whiteColor;
    }
  }
}

.drag-handle {
  align-self: center;
  margin: 0 0.25rem 0 0.5rem;
  cursor: grab;

  /deep/ svg {
    width: $mediumFontSize;
    fill: $purpleColor;
  }

  &::before {
    @include transition;
    opacity: 0;
    position: absolute;
    display: block;
    content: "";
    border: 2px solid $purpleColor;
    border-radius: 0.5rem;
    top: -2px;
    left: -2px;
    height: calc(100% - 0px);
    width: calc(100% - 0px);
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
    z-index: 0;
  }
}

.excercise-info {
  flex: 1;

  margin-left: 0.35rem;
}

.excercise-title {
  background-color: transparent;
  font-size: $normalFontSize;
  font-weight: $mediumFontWeight !important;
  margin-bottom: 0;
  border: none;
  border-bottom: 1px solid transparent;
  outline: none;
  border-radius: 0;
}

.excercise-videoURL,
.excercise-description {
  background-color: transparent;
  font-size: $smallerFontSize;
  color: $greyColor;
  border: none;
  outline: none;
  padding: 0;
  border-radius: 0;
}

.excercise-video-wrapper {
  display: none;

  &.show {
    display: block;
  }
}

.excercise-videoURL {
  margin-top: 0.25rem;
  &:focus {
    border-bottom: 1px solid $purpleColor;
  }
}

.btn-superset {
  @include transition;
  height: fit-content;
  padding: 1.5px;
  align-self: center;
  border-radius: 0.2rem;
  margin-right: 0.45rem;
  border: 1px solid transparent;
  border: 1px solid lighten($greyBorderColor, 0%);

  .unicon {
    margin-left: 0;
  }

  .unicon /deep/ svg {
    width: 0.95rem;
  }

  &:hover {
    background-color: $purpleColor;
    border: 1px solid lighten($purpleColor, 30%);

    .unicon /deep/ svg {
      fill: lighten($purpleColor, 50%);
    }
  }

  &.selected {
    background-color: lighten($greenColor, 10%);
    border: 1px solid darken($greenColor, 20%);

    .unicon /deep/ svg {
      fill: darken($greenColor, 60%);
    }
  }
}

.btn-icon {
  font-size: $smallestFontSize;
  font-weight: $normalFontWeight;
}

.tooltip-wrapper {
  .tooltip {
    display: none;
    width: max-content;
    bottom: auto;
    top: 100%;
  }

  &:hover {
    .tooltip {
      display: block;
      z-index: 1;
      opacity: 1;
      transform: translateX(-50%) translateY(0.5rem);
    }
  }
}

.sortable-chosen {
  .excercise-info {
    position: relative;
    z-index: 1;

    h3 {
      color: $whiteColor;
    }

    .item-draggable /deep/ svg {
      opacity: $lightOpacity !important;
      fill: $whiteColor !important;
    }

    p {
      color: $whiteColor;
      opacity: $lightOpacity;
    }
  }

  &::before {
    opacity: 1;
    border-color: $purpleColor;
    background-color: $purpleColor;
    z-index: 0;
  }
}

.excercise-list-editable {
  .btn-superset:not(.selected) {
    border: 1px solid $greyBorderColor;
  }
}
</style>