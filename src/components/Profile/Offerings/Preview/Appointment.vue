<template>
  <div class="appointment-preview-wrapper">
    <!--START: Delivery Mode-->
    <div class="delivery-mode-wrapper">
      <img src="@/assets/images/apps/zoom.png" class="icon" alt="Zoom App" />
      <div class="delivery-mode">
        <label v-if="isOnlineCall">Online Call</label>
        <label v-else>In-Person Delivery</label>

        <div
          class="location-details"
          v-if="isOnlineCall && consultationCall.selectedApp != undefined"
        >
          <span>This meeting will take place on Zoom</span>
        </div>
      </div>
    </div>
    <!--START: Duration-->
    <div v-if="consultationCall.duration != undefined" class="duration-wrapper">
      <div class="duration">
        <unicon name="clock"></unicon>
        <h3>{{ consultationCall.duration }} minutes duration</h3>
      </div>
    </div>
    <!--END: Duration-->
    <!--END: Delivery Mode-->
  </div>
</template>

<script>
export default {
  name: "AppointmentPreview",
  props: {
    consultationCall: Object,
  },
  computed: {
    isOnlineCall: function () {
      return this.consultationCall.onlineCall;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.appointment-preview-wrapper {
  box-shadow: 0 0 0.7rem -0.5rem rgba(0, 0, 0, 0.15);
}

.delivery-mode-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 1px solid #404040;
  background-color: #303030;
  padding: 1rem;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  padding: 0.75rem;
}

.icon /deep/ {
  width: 4rem;
}

.delivery-mode {
  margin-left: 1rem;

  label {
    color: $whiteColor;
    opacity: 0.65;
    font-size: $smallestFontSize;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
  }
  h3 {
    font-size: 1rem;
    font-weight: $mediumFontWeight;
    color: $whiteColor;
    margin-bottom: 0;
  }
}

.duration-wrapper {
  padding-top: 0.75rem;
  border-top: 1px dashed #444;

  .duration {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    label {
      display: table;
      background-color: lighten($blackColor, 15%);
      color: lighten($blackColor, 60%);
      font-weight: $mediumFontWeight;
      font-size: $smallestFontSize;
      padding: 0.35rem 0.5rem;
      border-radius: 0.5rem;
    }

    h3 {
      color: $whiteColor;
      font-size: $normalFontSize;
      font-weight: $mediumFontWeight;
      margin-left: 0.5rem;
    }
  }
}

.location-details {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 0.5rem;

  .unicon /deep/ {
    svg {
      fill: $whiteColor;
      opacity: 0.65;
      width: $smallerFontSize;
      height: auto;
      margin-right: 0.25rem;
    }
  }

  span {
    color: $whiteColor;
    opacity: 0.65;
    font-size: $smallerFontSize;
    line-height: 1.2;
  }
}

//Light theme
.light-theme {
  .delivery-mode-wrapper {
    background-color: $whiteColor;
    border-color: darken($whiteColor, 10%);

    h3 {
      color: $blackColor;
    }

    span {
      font-size: $normalFontSize;
      font-weight: $mediumFontWeight;
      color: $blackColor;
    }

    label {
      color: lighten($blackColor, 20%);
    }

    .location-details {
      /deep/ .unicon svg {
        fill: var(--brand-color);
      }

      span {
        color: $blackColor;
      }
    }
  }

  .duration-wrapper {
    display: block;
    text-align: center;
    background-color: lighten($darkGreenColor, 35%);
    border-top: none;

    padding: 0.25rem 0.85rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border: 1px solid darken($whiteColor, 10%);

    .unicon /deep/ {
      vertical-align: middle;
      svg {
        fill: darken($darkGreenColor, 25%);
        width: 1rem;
      }
    }

    h3 {
      vertical-align: middle;
      color: darken($darkGreenColor, 25%);
    }
  }
}
</style>