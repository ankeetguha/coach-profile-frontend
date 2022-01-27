<template>
  <div class="offering-type-preview">

    <!--START: Online Plan-->
    <OnlinePlanSampleWorkouts
      v-show="offering.offeringType == 'diy-plan'"
      :onlinePlanID="offering.onlinePlan.onlinePlanID"
      :coachSlug="coachSlug"
    >
    </OnlinePlanSampleWorkouts>
    <!--END: Online Plan-->
  </div>
</template>

<script>
//Importing components
import OnlinePlanSampleWorkouts from "./OnlinePlanSampleWorkouts";

export default {
  name: "OfferingTypePreview",
  props: {
    offering: Object,
    coachSlug: String,
  },

  components: {
    OnlinePlanSampleWorkouts
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.offering-type-preview {
  margin: 0 1.5rem;
}
</style>