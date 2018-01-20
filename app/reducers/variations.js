export default function (state = [], action) {
    switch (action.type) {
    case "ADD_VARIATION":
      return ([ ...state, { ...action.payload, uuid: new Date().getTime().toString(), date: new Date() } ]);
    case "REMOVE_VARIATION":
      return (
        state.reduce((newState, variation) => {
          if (variation.uuid != action.payload) {
            newState.push(variation);
          }
          return (newState);
        }, [])
      );
    default:
      return state;
    }
}
