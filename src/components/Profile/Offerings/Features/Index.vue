<template>
  <div class="offering-type-features">
   <!--START: Online Plan-->
    <OnlinePlan
      v-show="offering.offeringType == 'diy-plan'"
      :onlinePlanID="offering.onlinePlan.onlinePlanID"
      :coachSlug="coachSlug"
    >
    </OnlinePlan>
    <!--END: Online Plan-->
  </div>
</template>

<script>
//Import components
import OnlinePlan from "./OnlinePlan";

export default {
  name: "OfferingTypeFeatures",
  props: {
    offering: Object,
    coachSlug: String,
  },
  components: {
    OnlinePlan,
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.offering-type-features {
  margin: 1rem 1.5rem 1.5rem;
}
</style>
