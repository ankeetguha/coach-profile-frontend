<template>
  <div class="client-form">
    <form v-on:submit.prevent="bookOffering()">
      <FormBuilder :fields="fields"></FormBuilder>
    </form>
  </div>
</template>

<script>
//Import components
import FormBuilder from "@/components/form/FormBuilder";

export default {
  name: "BookingClientForm",
  props: {
    fields: Object,
  },
  components: {
    FormBuilder,
  },
  methods: {
    bookOffering() {
      this.$emit("bookOffering");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
form {
  margin: 1rem 0 0;
}

</style>

            