export default function (state = "average", action) {
    switch (action.type) {
    case "SET_SUMMARY_DISPLAY":
      return action.payload;
    default:
        return state;
    }
}
