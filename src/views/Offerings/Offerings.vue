<template>
  <!--START: Profile Wrapper-->
  <div v-if="coach.fullName != undefined" class="profile-content-wrapper">
    <!--START: Offerings List-->
    <CoachOfferings
      v-if="coach.offerings.length"
      :offerings="coach.offerings"
      :coachSlug="coach.slug"
      :paymentsActive="coach.paymentsActive"
    ></CoachOfferings>
    <!--END: Offerings List-->

    <!--START: Plans List-->
    <CoachPlans
      v-if="coach.plans.length > 0"
      :plans="coach.plans"
      :coachSlug="coach.slug"
    ></CoachPlans>
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
import CoachOfferings from "@/components/Profile/CoachOfferings";
import MessageCoach from "@/components/Profile/MessageCoach";
import CoachSpecialities from "@/components/Profile/CoachSpecialities";
import CoachTransformations from "@/components/Profile/CoachTransformations";

export default {
  name: "Plans",
  metaInfo() {
    return {
      title: this.meta.title,
      meta: [
        {
          name: "description",
          content: this.meta.ogDescription,
          vmid: "description",
        },
        {
          property: "og:title",
          content: this.meta.ogTitle,
          vmid: "og:title",
        },
        {
          property: "og:image",
          content: this.meta.ogImage,
          vmid: "og:image",
        },
        {
          property: "og:description",
          content: this.meta.ogDescription,
          vmid: "og:description",
        },
        {
          property: "og:url",
          content: window.location.href,
          vmid: "og:url",
        },
        {
          property: "og:type",
          content: "website",
          vmid: "og:type",
        },
      ],
    };
  },
  data() {
    return {
      meta: {
        title: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
      },
    };
  },
  props: {
    coach: Object,
    show: Boolean,
  },
  components: {
    CoachPlans,
    CoachOfferings,
    MessageCoach,
    CoachSpecialities,
    CoachTransformations,
  },
  async created() {
    //Get coach and change meta details
    if (_.isEmpty(this.coach)) {
      this.coach = await this.getCoach();
    }

    this.meta.title = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogTitle = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogDescription = this.coach.description;
    this.meta.ogImage =
      this.coach.offerings != undefined
        ? this.coach.offerings[0].coverImageURL
        : this.coach.plans[0].coverImageURL;
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