<template>
  <div class="table-container" v-if="people.length > 0">
    <table class="people-table">
      <tr>
        <th
          v-on:click="sortByColumn(column)"
          v-for="column in columns"
          :key="column"
        >
          {{ column }}
          <span v-if="this.$store.state.lastSort === column"> ▲ </span>
          <span v-if="this.$store.state.lastAscSort === column"> ▼ </span>
        </th>
      </tr>
      <tr v-for="person in people" :key="person.name">
        <td>{{ person.name }}</td>
        <td>{{ person.height }}cm</td>
        <td>{{ person.mass }}kg</td>
        <td>{{ formatDate(person.created) }}</td>
        <td>{{ formatDate(person.edited) }}</td>
        <td v-on:click="showPlanetModal(person.homeworld)">
          {{ getPlanetName(person.homeworld) }}
        </td>
      </tr>
    </table>
  </div>
  <div v-else>
    <p>No results found.</p>
  </div>
</template>

<script>
import { getPlanet } from "../functions.js";
export default {
  name: "PeopleTable",
  data() {
    return {
      columns: ["name", "height", "mass", "created", "edited", "homeworld"],
    };
  },
  computed: {
    people() {
      return this.$store.state.peopleData;
    },
  },
  methods: {
    sortByColumn(sortBy) {
      this.$store.dispatch("sortTable", { sortBy });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    getPlanetName(url) {
      const planetList = this.$store.state.planetList;
      const planet = getPlanet(url, planetList);
      if (planet) {
        return planet.name;
      }
    },
    showPlanetModal(url) {
      this.$store.dispatch("openPlanetModal", { url });
    },
  },
};
</script>

<style>
@media screen and (max-width: 600px) {
  .table-container {
    width: 100%;
    overflow-x: scroll;
  }
}

table {
  margin: 0 auto;
  max-width: 50%;
  width: 100%;
  border: none;
  border-spacing: 0;
  border-collapse: collapse;
  overflow-x: auto;
}

@media screen and (max-width: 600px) {
  table {
    max-width: 100%;
  }
}

th {
  background-color: #000;
  padding: 10px 20px;
  color: #fff;
  text-transform: capitalize;
}

.people-table th {
  cursor: pointer;
}

td {
  padding: 8px 10px;
  text-transform: capitalize;
}

.people-table tr:hover {
  background: #111;
  color: white;
}

tr:nth-of-type(2n + 1) {
  background: #eee;
}

.people-table td:last-of-type {
  font-weight: bold;
  cursor: pointer;
}
</style>
