<template>
  <!--START: Equipment-->
  <div class="equipments-wrapper">
    <label class="label-small">Equipment</label>
    <div class="equipment-details">
      <unicon name="dumbbell"></unicon>
      <p>{{ equipment }}</p>
    </div>
  </div>
  <!--END: Equipment-->
</template>

<script>
export default {
  name: "OfferingEquipment",
  props: {
    equipment: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.equipments-wrapper {
  margin: 3rem 1.5rem 0;

  .label-small {
    margin-bottom: 0.75rem;
  }
}

.equipment-details {
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;

  .unicon /deep/ svg {
    background-color: var(--brand-color);
    fill: var(--brand-color-dark-35);
    width: 1.1rem;
    padding: 0.25rem;
    height: auto;
    border-radius: 0.5rem;
    margin-right: 1rem;
  }

  p {
    color: $whiteColor;
    opacity: $mediumOpacity;
    font-size: $normalFontSize;
  }
}
</style>
