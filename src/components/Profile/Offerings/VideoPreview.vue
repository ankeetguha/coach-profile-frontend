<template>
  <!--START: Intro Video-->
  <div
    v-if="introVideoURL != null"
    class="intro-video-wrapper"
    @click="playIntroVideo"
  >
    <label class="label-small">Watch: Introduction</label>
    <div class="intro-video">
      <img :src="getYoutubeThumbnail(introVideoURL, 'max')" />
      <div class="video-wrapper float">
        <unicon name="play" class="play-btn"></unicon>
        <div class="video-info">
          <span>Watch the Video</span>
          <h3>Introduction</h3>
        </div>
      </div>
    </div>
  </div>
  <!--END: Intro Video-->
</template>

<script>
export default {
  name: "OfferingVideoPreview",
  data() {
    return {};
  },
  props: {
    introVideoURL: String,
  },
  watch: {
    show: function (val) {
      if (val) setTimeout(() => this.playVideo(), 10);
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },

    getVideoID: function () {
      var ID;
      var url = this.videoLink
        .replace(/(>|<)/gi, "")
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_-]/i);
        ID = ID[0];
      } else {
        ID = url;
      }
      return ID;
    },
  },
  methods: {
    playIntroVideo() {
      this.$emit("playIntroVideo");
    },

    getYoutubeThumbnail(url, quality) {
      if (url) {
        var video_id, thumbnail, result;
        if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
          video_id = result.pop();
        } else if ((result = url.match(/youtu.be\/(.{11})/))) {
          video_id = result.pop();
        }

        if (video_id) {
          if (typeof quality == "undefined") {
            quality = "high";
          }

          var quality_key = "maxresdefault"; // Max quality
          if (quality == "low") {
            quality_key = "sddefault";
          } else if (quality == "medium") {
            quality_key = "mqdefault";
          } else if (quality == "high") {
            quality_key = "hqdefault";
          }

          thumbnail =
            "http://img.youtube.com/vi/" +
            video_id +
            "/" +
            quality_key +
            ".jpg";
          return thumbnail;
        }
      }
      return false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.intro-video-wrapper {
  
  .label-small {
    font-size: $normalFontSize;
    letter-spacing: 0;
    text-transform: none;
    margin-bottom: 0.75rem;
  }
}

.intro-video {
  background-color: $blackColor;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;

  img {
    transition: all 0.3s;
    opacity: 1;
    width: 100%;
  }
}

.video-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;

  .unicon {
    margin-right: 0.85rem;

    /deep/ svg {
      fill: lighten($blackColor, 10%);
      background-color: $whiteColor;
      border: 1px solid lighten($blackColor, 0%);
      height: auto;
      width: 1.75rem;
      padding: 0.5rem;
      border-radius: 50%;
    }
  }

  .video-info {
    span {
      display: block;
      color: $whiteColor;
      opacity: 0.65;
      font-size: $smallestFontSize;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
    }

    h3 {
      color: $whiteColor;
      font-size: 1.05rem;
      font-weight: $mediumFontWeight;
      opacity: 0.85;
    }
  }

  &.float {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 3rem 1rem 0.75rem;
    width: calc(100% - 2rem);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #181818 80%);
  }
}

.intro-video:hover {
  cursor: pointer;
  .unicon {
    /deep/ svg {
      fill: var(--brand-color);
      background-color: $blackColor;
      border: 1px solid lighten($blackColor, 5%);
    }
  }

  img {
    opacity: 0.7;
  }
}
</style>
