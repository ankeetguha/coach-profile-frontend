<template>
    <!--START: Profile Wrapper-->
    <div class="profile-content-wrapper">
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
//Imoprt components
import CoachPlans from "@/components/Profile/CoachPlans";
import MessageCoach from "@/components/Profile/MessageCoach";
import CoachSpecialities from "@/components/Profile/CoachSpecialities";
import CoachTransformations from "@/components/Profile/CoachTransformations";


export default {
  name: "Plans",
  data() {
    return {
      coach: {},
      meta: {
        title: "Skipper Coach",
        description:
          "Skipper helps you find the best personal trainers and coaches to help you meet your fitness goals from home. We've got coaches for S&C, Yoga, Weight Training, Nutrition and more.",
      },
    };
  },
  props: {
    show: Boolean,
  },
  components: {
    CoachPlans,
    MessageCoach,
    CoachSpecialities,
    CoachTransformations
  },
  async created() {
    //Get coach and change meta details
    const slug = this.$route.params.slug;
    this.coach = await this.getCoach({ slug: slug });
    this.meta.title = `Coach ${this.coach.name} - ${this.coach.heroData.description}`;
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