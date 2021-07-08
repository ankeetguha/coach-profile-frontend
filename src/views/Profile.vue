<template>
  <div>
    <!--START: Vue Headful-->
    <vue-headful :title="meta.title" :description="meta.description" />
    <!--END: Vue Headful-->

    <!--START: Header-->
    <div class="cover-image-wrapper">
      <img :src="coach.coverImage.url" class="cover-image" :alt="`${coach.name} Cover Image`" />
      <!-- <img src="@/assets/images/profile-bg.jpg" class="cover-image" :alt="`${coach.name} Cover Image`" /> -->
    </div>
    <!--END: Header-->

    <div class="profile-content-wrapper" :class="coach.promotion != undefined ? 'promotion-container' : ''">
      <!--START: Hero Wrapper-->
      <div class="hero-wrapper">
        <h1 class="hero-title">{{ coach.heroData.title }}</h1>
        <p class="hero-description">{{ coach.heroData.description }}</p>
      </div>
      <!--END: Hero Wrapper-->

      <!--START: Social Handles-->
      <CoachSocialHandles :socialHandles="coach.socialHandles"></CoachSocialHandles>
      <!--END: Social Handles-->

      <!--START: Profile Menu-->
      <ul class="profile-menu-list">
        <li
          v-for="(menuItem, index) in profileMenu"
          :class="{ 'selected': index === 0 }"
          :key="menuItem.id"
          class="profile-menu-item"
        >
          <span>{{menuItem}}</span>
        </li>
      </ul>
      <!--END: Profile Menu-->

      <!--START: Plans List-->
      <CoachPlans :plans="coach.plans"></CoachPlans>
      <!--END: Plans List-->

      <!--START: Scroll End-->
      <MessageCoach :name="coach.name" :gender="coach.gender"></MessageCoach>
      <!--END: Scroll End-->

      <!--START: Specialities-->
      <CoachSpecialities :specialities="coach.specialities"></CoachSpecialities>
      <!--END: Specialities-->

      <!--START: Transformations-->
      <CoachTransformations :transformations="coach.transformations" :coachName="coach.name"></CoachTransformations>
      <!--END: Transformations-->

      <!--START: Qualifications-->
      <CoachQualifications :qualifications="coach.qualifications"></CoachQualifications>
      <!--END: Qualifications-->

      <!--START: Social Handles-->
      <CoachPromotions :promotion="coach.promotion"></CoachPromotions>
      <!--END: Social Handles-->
    </div>
  </div>
</template>

<script>
//Imoprt components
import MessageCoach from "@/components/Profile/MessageCoach";
import CoachSocialHandles from "@/components/Profile/CoachSocialHandles";
import CoachPlans from "@/components/Profile/CoachPlans";
import CoachSpecialities from "@/components/Profile/CoachSpecialities";
import CoachQualifications from "@/components/Profile/CoachQualifications";
import CoachTransformations from "@/components/Profile/CoachTransformations";
import CoachPromotions from "@/components/Profile/CoachPromotions";

export default {
  name: "Profile",
  data() {
    return {
      meta: {
        title: "Skipper Coach",
        description:
          "Skipper helps you find the best personal trainers and coaches to help you meet your fitness goals from home. We've got coaches for S&C, Yoga, Weight Training, Nutrition and more.",
      },
      profileMenu: ["Plans", "Testimonials", "About", "Partners"],

      coach: {
        name: "Charan Tej",
        yearsOfExperience: 4,
        noOfClientsTrained: 78,
        gender: "male",
        contact: {
          email: "kscharantej@gmail.com",
          phoneNumber: "9704243884",
        },
        socialHandles: [
          {
            platform: "instagram",
            link: "https://www.instagram.com/dantes_club/",
          },
          {
            platform: "youtube",
            link: "https://www.youtube.com/user/barelifenutrition",
          },
          {
            platform: "facebook",
            link: "https://www.facebook.com/Dantesfitnessclub/",
          },
          {
            platform: "whatsapp",
            link: "https://wa.me/+919740243884",
          },
        ],
        languagesKnown: "English, हिंदी, ಕನ್ನಡ",
        plans: [
          {
            title: "1-on-1 Personal Training",
            price: 5500,
            coverImageURL: "https://i.ibb.co/W5VNywP/plan-1.jpg",
            type: "plan",
            frequency: "monthly",
            tags: "popular",
          },
          {
            title: "30 Day Fat Loss Challenge",
            price: 3500,
            coverImageURL: "https://i.ibb.co/SrSSGjv/plan-2.jpg",
            type: "challenge",
            frequency: "scheduled",
            startDate: "2021-07-01T16:00:00Z",
            endDate: "2021-07-30T16:00:00Z",
          },
        ],
        specialities: [
          {
            title: "Weight Loss",
            iconURL: "weight-loss.svg",
          },
          {
            title: "General Fitness",
            iconURL: "cardio.svg",
          },
          {
            title: "Muscle Building",
            iconURL: "muscle.svg",
          },
        ],
        workoutCategories: [
          "Strength & Conditioning",
          "Weight Training",
          "HIIT",
        ],
        coverImage: {
          url: "https://skippr.s3.ap-south-1.amazonaws.com/profile-pic.jpg",
        },
        galleryImages: [{ url: "" }, { url: "" }, { url: "" }],
        heroData: {
          title: "Charan Tej",
          description: "Body Transformation Specialist & Athlete 💪",
        },
        about:
          "Charan is a total beast of an athlete. His personal training clients have all seen spectacular results 💪 Charan works well with people who are beginners, intermediates as well as advanced.",
        transformations: [
          {
            name: "Marty C",
            description: "Age: 20s, Independent Consultant",
            testimonial:
              "As you can see, it's been one hell of a journey with Charan. What I loved the most about training with him was that he never let me give up. He taught me how to push my self to my boundaries and achieve the results I want. ",
            imageURL:
              "https://skippr.s3.ap-south-1.amazonaws.com/Charan_3_8f18dbc687.jpg",
          },
          {
            name: "Benjamin D",
            description: "Age: 20s, Finance Consultant",
            testimonial:
              "The transformation picture says it all. I don't need to emphasise on how good a trainer Charan is. He has completely changed my life and how I approach my lifestyle now. Thanks Charan!",
            imageURL:
              "https://skippr.s3.ap-south-1.amazonaws.com/Charan_2_c755eb621c.jpg",
          },
          {
            name: "Varun M",
            description: "Age: 30s, Sales Executive",
            testimonial:
              "Charan not only gave me fitness coaching, but also helped me watch my diet. He provided a detailed diet plan which was sustainable and easy to follow. The process can be hard sometimes but he made sure I was motived throughout and didn't give up. Training with him was the best decision I've made.",
            imageURL:
              "https://skippr.s3.ap-south-1.amazonaws.com/Charan_1_607cc2fd06.jpg",
          },
        ],
        qualifications: [
          {
            type: "Certification",
            title: "Crossfit Level 1",
          },
        ],
        promotion: {
          text: "⚡ Join my 30 Day Fat Loss programme ⚡",
          link: "#"
        }
      },
    };
  },
  components: {
    MessageCoach,
    CoachPlans,
    CoachSocialHandles,
    CoachSpecialities,
    CoachQualifications,
    CoachTransformations,
    CoachPromotions
  },
  async created() {
    //Set meta title
    this.meta.title = `Coach ${this.coach.name} - ${this.coach.heroData.description}`;
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.cover-image {
  position: fixed;
  display: block;
  width: 100%;
  top: 0;
  left: 0;
  filter: blur(7px);
}

.profile-content-wrapper {
  background-color: rgba(39, 39, 39, 0.95);
  position: relative;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  box-shadow: 0 0 1.5rem 1.5rem rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 1;

  &.promotion-container {
    padding-bottom: 2.5rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(183, 183, 183, 0.5);
    filter: blur(10px);
    opacity: 0.65;
  }
}

.hero-wrapper {
  position: relative;
  background: $blackColor;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  padding: 2rem 0 1rem;
  text-align: center;

  .hero-title {
    font-size: $extraLargeFontSize;
    font-family: $titleFont;
    font-weight: $boldFontWeight;
    color: $whiteColor;
    margin-bottom: 0rem;
    text-transform: uppercase;

    &::before {
      display: block;
      content: "COACH";
      font-size: $largestFontSize;
      color: $blackColor;
      font-family: $titleFont;
      letter-spacing: 0.15rem;
      font-weight: 800;
      -webkit-text-stroke: 0.75px $whiteColor;
      opacity: $lightOpacity;
      margin-bottom: -1.25rem;
    }
  }

  .hero-description {
    font-size: $normalFontSize;
    color: $lightWhiteColor;
  }
}

.profile-menu-list {
  position: relative;
  display: block;
  text-align: center;
  margin: 0;
  padding: 0.5rem 0 1rem;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
  background: $blackColor;

  .profile-menu-item {
    display: inline-block;
    margin: 0 1rem;
    color: $whiteColor;
    opacity: $lightOpacity;
    padding: 1rem 0;
    cursor: pointer;
    text-align: center;
    border-bottom: 2px solid transparent;

    &.selected {
      opacity: 1;
      padding: 0.45rem 1.5rem;
      color: darken($darkPurpleColor, 35%);
      background-color: $purpleColor;
      border-radius: 3rem;
    }
  }
}
</style>