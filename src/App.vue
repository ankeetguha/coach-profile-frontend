<template>
  <div
    class="app-wrapper"
    :style="`
    --h:${brandColorH}; 
    --s:${brandColorS}; 
    --l:${brandColorL};

    --brand-color: hsl(var(--h), var(--s),var(--l));

    --brand-color-dark-10: hsl(var(--h), var(--s), calc(var(--l) - 10%));
    --brand-color-dark-20: hsl(var(--h), var(--s), calc(var(--l) - 20%));
    --brand-color-dark-35: hsl(var(--h), var(--s), calc(var(--l) - 35%));
    --brand-color-dark-50: hsl(var(--h), var(--s), calc(var(--l) - 50%));
    
    --brand-color-light-10: hsl(var(--h), var(--s), calc(var(--l) + 10%));
    --brand-color-light-45: hsl(var(--h), var(--s), calc(var(--l) + 45%));
    --brand-color-light-85: hsl(var(--h), var(--s), calc(var(--l) + 45%));

    --brand-color-saturate-10: hsl(var(--h), calc(var(--s) + 10%), var(--l));
    --brand-color-saturate-30: hsl(var(--h), calc(var(--s) + 30%), var(--l));
    `"
    :class="
      coach.darkMode != undefined && coach.darkMode == false
        ? 'light-theme'
        : ''
    "
    v-if="coach.fullName != undefined && coach.fullName != ''"
  >
    <!--START: App Router View-->
    <keep-alive exclude="Plan,Offering">
      <router-view :coach="coach" :key="$route.params.id" />
    </keep-alive>
    <!--END: App Router View-->
  </div>
  <PageLoader class="app-wrapper" v-else></PageLoader>
</template>

<script>
//Import libraries
import hexToHsl from "hex-to-hsl";

//Import components
import PageLoader from "@/components/loaders/PageLoader";

export default {
  name: "SkipperCoach",
  data() {
    return {
      coach: {},
      brandColorH: "257",
      brandColorS: "100%",
      brandColorL: "79%",
      meta: {
        title: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
      },
    };
  },
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
  components: {
    PageLoader,
  },
  async created() {
    //Get coach and change meta details
    var slug;
    if (this.$store.state.isSubDomain)
      slug = window.location.host.split(".")[0];
    else slug = this.$route.params.slug;

    this.coach = await this.getCoach({ slug: slug });

    //Setting the brand color globally
    if (this.coach.brandColor != undefined) {
      var hslColor = hexToHsl(this.coach.brandColor);
      this.brandColorH = `${hslColor[0]}`;
      this.brandColorS = `${hslColor[1]}%`;
      this.brandColorL = `${hslColor[2]}%`;
    }

    this.meta.title = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogTitle = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogDescription = this.coach.description;
    this.meta.ogImage = this.coach.plans[0].coverImageURL;

  },
};
</script>

<style>
/* Global Fonts */
@import url("https://fonts.googleapis.com/css2?family=Exo:wght@700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap");
</style>