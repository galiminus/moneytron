import { clearTotalRangeAmountsCache } from "../utils/totalRangeAmountsCache";

export default function (state = [], action) {
    switch (action.type) {
    case "ADD_VARIATION":
      clearTotalRangeAmountsCache();
      return ([ ...state, { uuid: new Date().getTime().toString(), date: new Date(), ...action.payload } ]);
    case "REMOVE_VARIATION":
      clearTotalRangeAmountsCache();
      return (
        state.reduce((newState, variation) => {
          if (variation.uuid != action.payload) {
            newState.push(variation);
          }
          return (newState);
        }, [])
      );
    case "RESET_VARIATIONS":
      clearTotalRangeAmountsCache();
      return [];
    default:
      return state;
    }
}
