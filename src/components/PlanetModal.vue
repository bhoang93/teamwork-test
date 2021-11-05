<template>
  <div
    v-if="this.$store.state.currentPlanet.name"
    class="modal-container"
    v-on:click="closeModal"
  >
    <div class="modal">
      <span class="close-btn" v-on:click="closeModal">Close</span>
      <table>
        <tr>
          <th>Name</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Population</th>
        </tr>
        <tr>
          <td>{{ this.$store.state.currentPlanet.name }}</td>
          <td>{{ this.$store.state.currentPlanet.diameter }}km</td>
          <td>{{ this.$store.state.currentPlanet.climate }}</td>
          <td>{{ this.$store.state.currentPlanet.population }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanetModal",
  methods: {
    closeModal() {
      this.$store.dispatch("closePlanetModal");
    },
  },
};
</script>

<style>
.modal-container {
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background: #fff;
  z-index: 3;
}

.close-btn {
  position: absolute;
  top: -20px;
  right: 0;
  color: #fff;
  cursor: pointer;
}
</style>
