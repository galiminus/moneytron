export default function (state = null, action) {
    switch (action.type) {
    case "SET_SELECTED_VARIATION":
      return action.payload;
    case "REMOVE_VARIATION":
      if (action.payload === state) {
        return null;
      }
    case "@@router/LOCATION_CHANGE":
      return null;
    default:
      return state;
    }
}
