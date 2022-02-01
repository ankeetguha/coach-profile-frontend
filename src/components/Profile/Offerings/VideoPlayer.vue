<template>
  <div v-if="show" class="video-player">
    <div class="youtube-player">
      <div class="rel-wrapper">
        <unicon class="close-player" name="times" @click="closePlayer"></unicon>
        <youtube
          :video-id="getVideoID"
          :player-vars="YoutubePlayerOptions"
          :fitParent="true"
          ref="youtube"
        ></youtube>
      </div>
    </div>

    <!--START: BG Overlay-->
    <div class="bg-overlay show"></div>
    <!--END: BG Overlay-->
  </div>
</template>

<script>
export default {
  name: "OfferingVideoPlayer",
  data() {
    return {
      YoutubePlayerOptions: {
        showInfo: 0,
        modestbranding: 1,
      },
    };
  },
  props: {
    show: Boolean,
    videoLink: String,
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
    playVideo() {
      this.player.playVideo();
    },
    closePlayer() {
      this.player.stopVideo();
      this.$emit("closePlayer");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.youtube-player {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
  width: calc(100% - 2rem);
  z-index: 101;

  /deep/ {
    iframe {
      overflow: hidden;
      border-radius: 1rem;
      width: 100%;
    }
  }
}

.close-player {
  float: right;
  cursor: pointer;
  margin-bottom: 0.5rem;

  /deep/ svg {
    fill: var(--brand-color-dark-50);
    width: $mediumFontSize;
    height: auto;
    background: var(--brand-color);
    padding: 0.25rem;
    border-radius: 0.25rem;
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .youtube-player {
    left: 0;
    right: 0;
    margin: auto;
    width: 50%;
  }
}
</style>
