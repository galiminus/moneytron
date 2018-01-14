export function addVariation(payload) {
  return { type: "ADD_VARIATION", payload };
}

export function removeVariation(payload) {
  return { type: "REMOVE_VARIATION", payload };
}

export function setSelectedVariation(payload) {
  return { type: "SET_SELECTED_VARIATION", payload };
}
