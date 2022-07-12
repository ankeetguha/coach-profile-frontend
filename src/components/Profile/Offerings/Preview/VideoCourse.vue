<template>
  <div v-if="modules.length != 0" class="course-preview-wrapper">
    <div class="title-wrapper">
      <h3 class="title">
        <label>{{ modules.length }} Modules</label>Video Course Modules
      </h3>
    </div>
    <div class="modules">
      <div v-for="(module, index) in modules" :key="index" class="module">
        <span>{{ index + 1 }}</span>
        <h3>{{ module }}</h3>
        <unicon class="locked-icon" name="lock"></unicon>
      </div>
    </div>
  </div>
</template>

<script>
//Importing CoachService
import CoachService from "@/controllers/CoachService";

export default {
  name: "VideoCoursePreview",
  data() {
    return {
      showOnlinePlanLoader: false,
      hasVideoCourse: false,
      modules: [],
    };
  },
  props: {
    offeringSlug: String,
    coachSlug: String,
  },
  components: {},
  async created() {
    await this.getVideoCourse();
  },
  methods: {
    async getVideoCourse() {
      var response = await CoachService.GetVideoCourse({
        coachSlug: this.coachSlug,
        offeringSlug: this.offeringSlug,
      });

      if (!response.hasError) {
        this.modules = response.data;
        this.hasVideoCourse = true;
      } else this.hasVideoCourse = false;

      this.showOnlinePlanLoader = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.title-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 1.5rem;

  .title {
    flex: 1;
    font-size: $mediumFontSize;
    font-weight: $mediumFontWeight;
    color: $whiteColor;
    margin-top: 0.5rem;
    margin-bottom: -0.15rem;

    label {
      display: block;
      color: var(--brand-color);
      font-size: $smallFontSize;
      letter-spacing: 0.05rem;
      text-transform: uppercase;
    }
  }
}

.module {
  border: 1px solid #444444;
  background-color: #363636;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem 0.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    color: $whiteColor;
    opacity: 0.5;
    margin-right: 1rem;
  }
  h3 {
    flex: 1;
    font-size: 1.05rem;
    font-weight: 500;
    color: $whiteColor;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 2rem;
  }

  .locked-icon {
    /deep/ svg {
      width: 1.25rem;
      height: auto;
      fill: $whiteColor;
      opacity: 0.45;
    }
  }
}


//Light Theme styles
.light-theme {
  .title {
    color: $blackColor;
  }
  .module {
    border: 1px solid #e2e2e2;
    background-color: #fff;
    h3 {
      color: $blackColor;
      opacity: 0.75;
    }

    span {
      opacity: 1;
      color: var(--brand-color);
    }

    .unicon {
      /deep/ svg {
        fill: $greyColor;
      }
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .intro-video {
    width: 80%;
  }

  .video-wrapper {
    .unicon {
      /deep/ svg {
        width: 2.5rem;
        padding: 0.75rem;
      }
    }

    .video-info h3 {
      font-size: 1.25rem;
    }
  }
}
</style>