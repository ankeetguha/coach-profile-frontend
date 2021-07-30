<template>
  <!--START: Profile Wrapper-->
  <div v-if="coach.fullName != undefined" class="profile-content-wrapper">
    <!--START: Vue Headful-->
    <vue-headful :title="meta.title" :description="meta.description" />
    <!--END: Vue Headful-->
    
    <!--START: Plans List-->
    <CoachPlans :plans="coach.plans"></CoachPlans>
    <!--END: Plans List-->

    <!--START: Scroll End-->
    <MessageCoach
      :name="coach.fullName"
      :gender="coach.gender"
      :phoneNumber="coach.phone"
    ></MessageCoach>
    <!--END: Scroll End-->

    <!--START: Specialities-->
    <CoachSpecialities :specialities="coach.specialities"></CoachSpecialities>
    <!--END: Specialities-->

    <!--START: Transformations-->
    <CoachTransformations
      :testimonials="coach.testimonials"
      :coachName="coach.fullName"
    ></CoachTransformations>
    <!--END: Transformations-->
  </div>
  <!--END: Profile Wrapper-->
</template>

<script>
//Import libraries
import _ from "lodash";

//Imoprt components
import CoachPlans from "@/components/Profile/CoachPlans";
import MessageCoach from "@/components/Profile/MessageCoach";
import CoachSpecialities from "@/components/Profile/CoachSpecialities";
import CoachTransformations from "@/components/Profile/CoachTransformations";

export default {
  name: "Plans",
  data() {
    return {
      meta: {
        title: "Skipper Coach",
        description:
          "Skipper helps you find the best personal trainers and coaches to help you meet your fitness goals from home. We've got coaches for S&C, Yoga, Weight Training, Nutrition and more.",
      },
    };
  },
  props: {
    coach: Object,
    show: Boolean,
  },
  components: {
    CoachPlans,
    MessageCoach,
    CoachSpecialities,
    CoachTransformations,
  },
  async created() {
    //Get coach and change meta details
    const slug = this.$route.params.slug;
    if (_.isEmpty(this.coach)) {
      this.coach = await this.getCoach({ slug: slug });
    }

    this.meta.title = `Coach ${this.coach.fullName} - ${this.coach.coverTitle}`;
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.profile-content-wrapper {
  &.promotion-container > div:last-child {
    padding-bottom: 5.5rem;
  }
}
</style>