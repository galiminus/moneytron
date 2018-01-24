import { clearTotalRangeAmountsCache } from "../utils/totalRangeAmountsCache";

export default function (state = (new Date), action) {
    switch (action.type) {
    case "SET_CURRENT_DATE":
      clearTotalRangeAmountsCache();
      return action.payload;
    default:
        return state;
    }
}
