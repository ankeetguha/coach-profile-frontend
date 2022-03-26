<template>
  <div class="offerings-list-wrapper">
    <label class="block-title">Explore Offerings</label>
    <div class="offerings-list">
      <router-link
        tag="div"
        class="offering"
        v-for="offering in offerings"
        :key="offering.id"
        :to="`/${!$store.state.isSubDomain ? coachSlug + '/' : ''}offerings/${
          offering.slug
        }`"
      >
        <img
          v-show="
            offering.coverImageURL != undefined &&
            offering.coverImageURL != null
          "
          :src="offering.coverImageURL"
          class="cover-image"
          alt="Cover Image"
        />

        <div class="offering-info">
          <!--START: Is Popular-->
          <div class="tag-popular" v-show="offering.isPopular">
            🔥 Most Popular
          </div>
          <!--END: Is Popular-->

          <h3 class="title">{{ offering.title }}</h3>

          <!--START: Highlights-->
          <TypeHighlights
            :offeringType="offering.offeringType"
          ></TypeHighlights>
          <!--END: Highlights-->
        </div>
        <div class="offering-details">
          <!--START: Price-->
          <PriceDetails
            v-if="paymentsActive"
            :price="offering.price"
            :activatePayment="offering.activatePayment"
          ></PriceDetails>
          <button class="btn">
            View This <unicon name="angle-right"></unicon>
          </button>
          <!--END: Price-->
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import TypeHighlights from "@/components/Profile/Offerings/TypeHighlights";
import PriceDetails from "@/components/Profile/Offerings/PriceDetails";

export default {
  name: "CoachOfferings",
  props: {
    coachSlug: String,
    offerings: Array,
    paymentsActive: { type: Boolean, default: false },
  },
  components: {
    TypeHighlights,
    PriceDetails,
  },
  methods: {
    getOfferingType(offeringType) {
      switch (offeringType) {
        case "personal-training":
          return "Personal Training";
        case "e-book":
          return "E-Book";
        case "diy-plan":
          return "Do It Yourself Plan";
        case "video-course":
          return "Video Course";
        default:
          return null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.block-title {
  display: block;
  font-size: $smallestFontSize;
  opacity: $lightOpacity;
  color: #f9f9f9;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  margin: 0rem 1.5rem 1rem;
}

.offering {
  margin: 1rem 1rem 2rem;
  border-radius: 1.5rem;
  overflow: hidden;
  background-color: #2c2c2c;
  border: 1px solid lighten($blackColor, 9%);
  box-shadow: 0 0.3rem 1.7rem 1.9rem rgba(0, 0, 0, 0.2);

  .cover-image {
    display: block;
    position: relative;
    width: calc(100% - 0.5rem);
    margin: 0.25rem;
    border-radius: 1.25rem;
  }

  .tag-popular {
    position: relative;
    display: table;
    margin: -1.25rem 0 0.5rem;
    color: $whiteColor;
    font-size: $smallerFontSize;
    padding: 0.3rem 0.5rem 0.3rem 0.45rem;
    border-radius: 0.5rem;
    background: linear-gradient(to right, #8567d4, #573bbd);
    border: 1px solid lighten(#573bbd, 15%);
  }

  .offering-info {
    position: relative;
    padding: 0.5rem 1.25rem 1.25rem;
    background-color: #2c2c2c;
    border: 1px solid lighten($blackColor, 9%);
    border-top: none;
    box-shadow: 0 0 1.7rem -0.15rem rgba(46, 46, 46, 0.75);

    .title {
      font-size: 1.1rem;
      font-weight: $mediumFontWeight;
      color: $whiteColor;
      margin-bottom: 0;
    }

    .offering-type {
      font-size: $smallestFontSize;
      font-weight: $mediumFontWeight;
      color: $whiteColor;
      opacity: 0.5;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
    }
  }

  .offering-details {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: darken($blackColor, 1%);
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    margin-top: -1rem;
    padding: 2rem 1rem 1rem;

    .btn {
      font-size: $smallerFontSize;
      display: table;
      text-align: center;
      background-color: lighten($blackColor, 5%);
      padding: 0.25rem 0.75rem;
      color: lighten($blackColor, 45%);

      /deep/ svg {
        display: inline-block;
        vertical-align: middle;
        fill: lighten($blackColor, 45%);
        height: auto;
        width: 1.25rem;
        margin-left: -0.25rem;
        margin-right: -0.75rem;
      }
    }
  }
}

//Light them
.light-theme {
  .block-title {
    display: table;
    position: relative;
    text-align: center;
    color: #333;
    background-color: #e8e8e8;
    opacity: 1;
    padding: 0 1.5rem;
    margin: 0 auto 2rem;

    &::before {
      content: "";
      display: block;
      position: absolute;
      height: 1px;
      width: 80vw;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
      background-color: #c7c7c7;
      z-index: -1;
    }
  }

  .offering-info,
  .offering {
    box-shadow: none;
    background-color: $whiteColor;
    border-color: #d6d6d6;
  }

  .offering {
    border-radius: 1rem;
    box-shadow: 0 1rem 1.5rem -0.5rem #dedede;
    border: none;

    .cover-image {
      border-radius: 0.75rem;
      margin: 0.5rem;
      width: calc(100% - 1rem);
    }

    .tag-popular {
      position: absolute;
      margin: 0;
      left: 1rem;
      top: -2.5rem;
    }
  }

  .offering-info {
    border: none;

    .title {
      color: $blackColor;
    }
  }

  .offering-details {
    background-color: transparent;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border-top: 1px solid #e2e2e2;
    padding: 1rem 0;
    margin: 0 1rem 0;
    position: relative;

    .btn {
      color: $whiteColor;
      background-color: var(--brand-color);
      padding: 0.4rem 0.85rem;

      .unicon /deep/ svg {
        fill: $whiteColor;
      }
    }
  }
}

//Desktop Styles
@media screen and (min-width: $mobileWidth) {
  .offerings-list-wrapper {
    margin: 0 5rem 4rem;
  }

  .block-title {
    font-size: $normalFontSize;
  }

  .offerings-list {
    display: flex;
    flex-wrap: wrap;

    .offering {
      cursor: pointer;
      list-style: none;
      transition: all 0.3s;
      flex: 0 0 calc(33.333333% - 2rem - 2px);

      &:hover {
        box-shadow: 0 1.7rem 1.25rem 0.9rem rgba(0, 0, 0, 0.4);
      }
    }

    .offering-highlights {
      height: 2rem;
    }

    .tag-popular {
      position: absolute;
      margin: 0;
      top: -1.5rem;
      left: 1rem;
    }
  }

  //Light theme
  .light-theme {
    .block-title {
      background-color: $lightWhiteColor;
    }

    .offering {
      &:hover {
        box-shadow: 0 0.75rem 0.7rem 0.15rem rgba(0, 0, 0, 0.15);
      }
    }
  }
}
</style>
