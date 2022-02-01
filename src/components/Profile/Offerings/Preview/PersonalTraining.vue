<template>
  <div class="pt-preview-wrapper">
    <!--START: Delivery Mode-->
    <div class="delivery-mode-wrapper">
      <unicon
        :name="getDeliveryMode == 'Online' ? 'desktop' : 'users-alt'"
        class="icon"
      ></unicon>
      <div class="delivery-mode">
        <label>Delivery Mode</label>
        <h3 v-if="getDeliveryMode == 'Online'">Online Delivery</h3>
        <h3 v-else>In-Person Delivery</h3>

        <div
          class="location-details"
          v-if="
            getDeliveryMode != 'Online' &&
            personalTraining.deliveryMode.location != undefined
          "
        >
          <unicon name="location-arrow"></unicon>
          <span>{{ personalTraining.deliveryMode.location }}</span>
        </div>
      </div>
    </div>
    <!--END: Delivery Mode-->

    <!--START: Duration-->
    <div v-if="personalTraining.duration != undefined" class="duration-wrapper">
      <div class="duration">
        <label>Duration</label>
        <h3>{{ personalTraining.duration }}</h3>
      </div>
    </div>
    <!--END: Duration-->
  </div>
</template>

<script>
export default {
  name: "PersonalTrainingPreview",
  props: {
    personalTraining: Object,
  },
  computed: {
    getDeliveryMode: function () {
      return this.personalTraining.deliveryMode.deliveryMode;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pt-preview-wrapper {
}

.delivery-mode-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 1px solid #404040;
  background-color: #303030;
  padding: 1rem;
  border-radius: 0.75rem;
  padding: 0.75rem;
}

.icon /deep/ {
  svg {
    background-color: $darkGreenColor;
    color: dakren($darkGreenColor, 30%);
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: 1.5rem;
    height: auto;
  }
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
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px dashed #444;

.duration {
    display: flex;
    flex-direction: row;
    align-items: center;
    label {
        display: table;
        background-color: lighten($blackColor, 15%);
        color: lighten($blackColor, 60%);
        font-weight: $mediumFontWeight;
        font-size: $smallestFontSize;
        padding: .35rem .5rem;
        border-radius: .5rem;

    }

    h3 {
        color: $whiteColor;
        font-size: $mediumFontSize;
        font-weight: $mediumFontWeight;
        margin-left: .5rem;
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
  }
}
</style>