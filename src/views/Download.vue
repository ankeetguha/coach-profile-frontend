<template>
  <div class="module-container">
    <h3>Downloading your E-Book</h3>
  </div>
</template>

<script>
//Import libraries
import _ from "lodash";

export default {
  name: "Download",
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
  components: {},
  async created() {
    //Get coach and change meta details
    if (_.isEmpty(this.coach)) {
      this.coach = await this.getCoach();
    }

    this.meta.title = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogTitle = `${this.coach.fullName} - ${this.coach.coverTitle}`;
    this.meta.ogDescription = this.coach.description;
    this.meta.ogImage = this.coach.plans[0].coverImageURL;

    this.downloadEBook();
  },
  methods: {
    downloadEBook() {
      const urlParams = new URLSearchParams(window.location.search);
      const blob = urlParams.get("blob");
      const fileName = urlParams.get("name");
      const type = "application/pdf";

      // Create an invisible element
      const a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);

      // Set the HREF to a Blob representation of the data to be downloaded
      a.href = window.URL.createObjectURL(new Blob([blob], { type }));

      // Use download attribute to set set desired file name
      a.setAttribute("download", fileName);

      // Trigger the download by simulating click
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    },
  },
};
</script>

<style scoped lang="scss">
.module-container {
  text-align: center;

  h3 {
    color: $whiteColor;
  }
}
</style>