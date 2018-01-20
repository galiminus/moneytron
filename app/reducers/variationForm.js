export default function (state = false, action) {
    switch (action.type) {
    case "OPEN_VARIATION_FORM":
      return true;
    case "CLOSE_VARIATION_FORM":
      return false;
    case "@@router/LOCATION_CHANGE":
      return false;
    default:
        return state;
    }
}
