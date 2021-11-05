export const getPlanet = (url, planetList) => {
  if (planetList.length > 0) {
    for (let i = 0; i < planetList.length; i++) {
      if (planetList[i].url === url) {
        return planetList[i].planet;
      }
    }
  }
};

export const sortPeopleData = (data, type, shouldBeDesc) => {
  return shouldBeDesc
    ? data.sort((p1, p2) => {
        return p1[type] < p2[type];
      })
    : data.sort((p1, p2) => {
        return p1[type] > p2[type];
      });
};

export const filterPeopleData = (data, searchTerm) => {
  return data.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
