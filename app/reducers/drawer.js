export default function (state = false, action) {
    switch (action.type) {
    case "OPEN_DRAWER":
      return true;
    case "CLOSE_DRAWER":
      return false;
    case "@@router/LOCATION_CHANGE":
      return false;
    default:
        return state;
    }
}
