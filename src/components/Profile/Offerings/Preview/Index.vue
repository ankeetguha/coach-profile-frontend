<template>
  <div class="offering-type-preview">
    <!--START: Online Plan-->
    <OnlinePlanSampleWorkouts
      v-if="offering.offeringType == 'diy-plan'"
      :onlinePlanID="offering.onlinePlan.onlinePlanID"
      :coachSlug="coachSlug"
    >
    </OnlinePlanSampleWorkouts>
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
  </div>
</template>

<script>
//Importing components
import OnlinePlanSampleWorkouts from "./OnlinePlanSampleWorkouts";
import EBook from "./EBook";
import PersonalTraining from "./PersonalTraining";

export default {
  name: "OfferingTypePreview",
  props: {
    offering: Object,
    coachSlug: String,
  },

  components: {
    OnlinePlanSampleWorkouts,
    EBook,
    PersonalTraining,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.offering-type-preview {
  margin: 2rem 1.5rem 3rem;
}
</style>