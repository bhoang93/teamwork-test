<template>
  <table v-if="people.length > 0" class="people-table">
    <tr>
      <th v-on:click="sortByColumn('name')">Name</th>
      <th v-on:click="sortByColumn('height')">Height</th>
      <th v-on:click="sortByColumn('mass')">Mass</th>
      <th v-on:click="sortByColumn('created')">Created</th>
      <th v-on:click="sortByColumn('edited')">Edited</th>
      <th v-on:click="sortByColumn('homeworld')">Planet Name</th>
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
  <div v-else>
    <p>No results found.</p>
  </div>
</template>

<script>
import { getPlanet } from "../functions.js";
export default {
  name: "PeopleTable",
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
table {
  margin: 0 auto;
  max-width: 50%;
  width: 100%;
  border: none;
  border-spacing: 0;
  border-collapse: collapse;
}

th {
  background-color: #000;
  padding: 10px 20px;
  color: #fff;
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
