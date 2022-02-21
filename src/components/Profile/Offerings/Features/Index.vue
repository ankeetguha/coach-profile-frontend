<template>
  <div class="offering-type-features">
   <!--START: Online Plan-->
    <OnlinePlan
      v-show="offering.offeringType == 'diy-plan'"
      :coachSlug="coachSlug"
    >
    </OnlinePlan>
    <!--END: Online Plan-->

    <!--START: Online Plan-->
    <VideoCourse
      v-show="offering.offeringType == 'video-course'"
      :coachSlug="coachSlug"
    >
    </VideoCourse>
    <!--END: Online Plan-->
  </div>
</template>

<script>
//Import components
import OnlinePlan from "./OnlinePlan";
import VideoCourse from "./VideoCourse";

export default {
  name: "OfferingTypeFeatures",
  props: {
    offering: Object,
    coachSlug: String,
  },
  components: {
    OnlinePlan,
    VideoCourse
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
