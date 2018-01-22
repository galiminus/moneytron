export default function (state = [], action) {
    switch (action.type) {
    case "SET_SELECTED_VARIATIONS":
      return action.payload;
    case "REMOVE_VARIATION":
      if (action.payload === state) {
        return [];
      }
    case "@@router/LOCATION_CHANGE":
      return [];
    default:
      return state;
    }
}
