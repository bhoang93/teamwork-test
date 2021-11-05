import { createStore } from "vuex";
import { sortPeopleData, filterPeopleData, getPlanet } from "./functions.js";

const store = createStore({
  state: {
    peopleData: [],
    peopleDataStore: [],
    filteredPeopleData: [],
    planetList: [],
    nameSearchTerm: null,
    lastSort: null,
    lastAscSort: null,
    currentPlanet: {},
  },
  mutations: {
    setPeople(state, people) {
      state.peopleData = people;
      state.peopleDataStore = people;
    },
    setPlanet(state, planet) {
      state.planetList = [...state.planetList, { url: planet.url, planet }];
    },
    setCurrentPlanet(state, url) {
      if (!url) {
        state.currentPlanet = {};
      } else {
        state.currentPlanet = getPlanet(url, state.planetList);
      }
    },
    filterPeopleByName(state, searchTerm) {
      if (searchTerm) {
        const filteredPeopleData = filterPeopleData(
          state.peopleDataStore,
          searchTerm
        );
        state.peopleData = filteredPeopleData;
      } else {
        state.peopleData = state.peopleDataStore;
      }
    },
    sortTable(state, sortBy) {
      // If the last sort was by the same column, make it descending instead of ascending
      const shouldBeDesc = sortBy === state.lastSort;
      const sortedPeople = sortPeopleData(
        state.peopleData,
        sortBy,
        shouldBeDesc
      );
      state.peopleData = sortedPeople;

      // Reset last sort so that it can be sorted by descending the next time
      if (state.lastSort === sortBy) {
        state.lastSort = null;
        state.lastAscSort = sortBy;
      } else {
        state.lastSort = sortBy;
        state.lastAscSort = null;
      }
    },
  },
  actions: {
    fetchPeople({ commit }) {
      fetch("https://swapi.dev/api/people")
        .then((resp) => resp.json())
        .then((data) => {
          let formattedPeople = data.results;
          let fetchedPlanetUrls = [];

          for (let i = 0; i < formattedPeople.length; i++) {
            const homeworld = formattedPeople[i].homeworld;
            if (!fetchedPlanetUrls.includes(homeworld)) {
              fetchedPlanetUrls.push(homeworld);
              fetch(homeworld)
                .then((resp) => resp.json())
                .then((data) => {
                  commit("setPlanet", data);
                })
                .catch((err) => console.log(err.message));
            }
          }

          commit("setPeople", formattedPeople);
        })
        .catch((err) => console.log(err.message));
    },
    openPlanetModal({ commit }, payload) {
      commit("setCurrentPlanet", payload.url);
    },
    closePlanetModal({ commit }) {
      commit("setCurrentPlanet");
    },
    sortTable({ commit }, payload) {
      commit("sortTable", payload.sortBy);
    },
    filterPeopleByName({ commit }, payload) {
      commit("filterPeopleByName", payload.searchTerm);
    },
  },
});

export default store;
