<template>
  <planet-modal />
  <search-bar />
  <people-table />
</template>

<script>
import PeopleTable from "./components/PeopleTable.vue";
import SearchBar from "./components/SearchBar.vue";
import PlanetModal from "./components/PlanetModal.vue";
export default {
  name: "App",
  components: {
    PeopleTable,
    SearchBar,
    PlanetModal,
  },
  mounted() {
    this.$store.dispatch("fetchPeople");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
