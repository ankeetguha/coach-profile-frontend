<template>
  <div>
    <!--START: App Router View-->
    <keep-alive>
      <router-view :key="$route.params.id" />
    </keep-alive>
    <!--END: App Router View-->
  </div>
</template>

<script>
export default {
  name: "SkipperCoach",
};
</script>

<style>
/* Global Fonts */
@import url("https://fonts.googleapis.com/css2?family=Exo:wght@700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap");
</style>