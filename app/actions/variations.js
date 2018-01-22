export function addVariation(payload) {
  return { type: "ADD_VARIATION", payload };
}

export function removeVariation(payload) {
  return { type: "REMOVE_VARIATION", payload };
}

export function setSelectedVariations(payload) {
  return { type: "SET_SELECTED_VARIATIONS", payload };
}
