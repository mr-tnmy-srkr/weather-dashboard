const data = [
  {
    location: "london",
    latitude: 51.5073219,
    longitude: -0.1276474,
  },
  {
    location: "kolkata",
    latitude: 22.5726723,
    longitude: 88.3638815,
  },
  {
    location: "dhaka",
    latitude: 23.8041,
    longitude: 90.4152,
  },
  {
    location: "singapore",
    latitude: 1.2899175,
    longitude: 103.8519072,
  },
  {
    location: "new york",
    latitude: 40.7127281,
    longitude: -74.0060152,
  },
  {
    location: "toronto",
    latitude: 43.6534817,
    longitude: -79.3839347,
  },
];

function getLocations() {
  return data;
}

function getLocationByName(location) {
  if (!location) return null;

  const filtered = data.filter((item) => item.location === location);

  if (filtered.length > 0) {
    return filtered[0];
  } else {
    const defaultLocation = {
      location: "",
      latitude: 0,
      longitude: 0,
    };
    return defaultLocation;
  }
}

export { getLocationByName, getLocations };
