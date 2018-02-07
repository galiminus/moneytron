let totalRangeAmountsCache;

function dateToKey(date) {
  return (date.getMonth().toString() + date.getDate().toString() + date.getFullYear().toString())
}

export function cacheTotalRangeAmount(range, date, amount) {
  totalRangeAmountsCache[range][dateToKey(date)] = amount;
}

export function getTotalRangeAmount(range, date) {
  return (totalRangeAmountsCache[range][dateToKey(date)])
}

export function clearTotalRangeAmountsCache() {
  totalRangeAmountsCache = {
    day: {},
    dayWithoutCurrent: {},
    month: {}
  }
}

clearTotalRangeAmountsCache();
