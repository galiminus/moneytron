export default function (state = {}, action) {
    switch (action.type) {
    case "UPDATE_CONFIGURATION":
      return { ...state, ...action.configuration };
    default:
        return state;
    }
}
