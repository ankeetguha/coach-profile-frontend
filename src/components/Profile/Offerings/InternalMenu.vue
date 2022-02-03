<template>
  <div
    v-if="menuItems.length == -1"
    class="internal-menu"
    :class="{ show: showMenu }"
  >
    <span
      v-for="item in menuItems"
      :key="item.id"
      class="menu-item"
      @click="scrollToSection(item.id)"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: "InternalMenu",
  data() {
    return {
      showMenu: false,
      menuItems: [
        {
          name: "Description",
          id: "description",
        },
      ],
    };
  },
  props: {
    offering: Object,
  },
  created() {
    this.initMenu();
  },
  methods: {
    initMenu() {
      window.addEventListener("scroll", this.updateScroll);

      if (this.offering.features != undefined && this.offering.features.length)
        this.menuItems.push({
          name: "Features",
          id: "features",
        });

      if (
        this.offering.inclusions != undefined &&
        this.offering.inclusions.length
      )
        this.menuItems.push({
          name: "Inclusions",
          id: "inclusions",
        });

      if (
        this.offering.highlights != undefined &&
        this.offering.highlights.length
      )
        this.menuItems.push({
          name: "Highlights",
          id: "highlights",
        });

      if (
        this.offering.testimonials != undefined &&
        this.offering.testimonials.length
      )
        this.menuItems.push({
          name: "Testimonials",
          id: "testimonials",
        });

      if (this.offering.faqs != undefined && this.offering.faqs.length)
        this.menuItems.push({
          name: "FAQs",
          id: "faqs",
        });
    },

    updateScroll() {
      let scrollPosition = window.scrollY;
      if (scrollPosition > 500) this.showMenu = true;
      else this.showMenu = false;
    },

    scrollToSection(itemID) {
      this.$emit("scrollToSection", itemID);
    },
  },

  computed: {
    getOfferingPrice: function () {
      var originalPrice = null,
        discountedPrice = null;

      //Check for variant pricing
      if (this.price.originalPrice != undefined) {
        originalPrice = this.price.originalPrice;
        if (this.price.discountedPrice != undefined)
          discountedPrice = this.price.discountedPrice;
      }

      return { originalPrice: originalPrice, discountedPrice: discountedPrice };
    },
  },
  destroy() {
    window.removeEventListener("scroll", this.updateScroll);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.internal-menu {
  position: fixed;
  background-color: $blackColor;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 0;
  overflow-x: scroll;
  white-space: nowrap;
  z-index: 10;
  transition: all 0.3s;
  transform: translateY(-5rem);

  &.show {
    transform: translateY(0);
  }

  .menu-item {
    display: inline-block;
    padding: 1.25rem 1rem;
    color: darken($whiteColor, 35%);
    font-size: $smallFontSize;
    border-bottom: 2px solid transparent;

    &.active {
      color: $whiteColor;
      border-bottom: 2px solid var(--brand-color);
    }
  }
}
</style>
