<template>
  <form>
    <label for="name">Search by name</label>
    <input
      type="text"
      name="name"
      :value="searchTerm"
      v-on:input="searchByName"
    />
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  methods: {
    searchByName(event) {
      const searchTerm = event.target.value;
      this.$store.dispatch("filterPeopleByName", { searchTerm });
    },
  },
};
</script>

<style>
form {
  margin-bottom: 20px;
}
label {
  margin-right: 10px;
}
</style>
