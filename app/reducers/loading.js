export default function (state = false, action) {
    switch (action.type) {
    case "SET_LOADING":
      return (true);
    case "UNSET_LOADING":
      return (false);
    default:
        return state;
    }
}
