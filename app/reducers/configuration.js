export default function (state = {}, action) {
    switch (action.type) {
    case "UPDATE_CONFIGURATION":
      return action.configuration;
    default:
        return state;
    }
}
