import moment from "moment";

const CURRENT_DATE = new Date();

export function removeOutdatedVariations(variations) {
  const today = moment(CURRENT_DATE);

  return (variations.reduce((filteredVariations, variation) => {
    if (variation.frequency === "recurring") {
      filteredVariations.push(variation);
    }
    if (variation.frequency === "one-time" && moment(variation.date).isSame(CURRENT_DATE, "month")) {
      filteredVariations.push(variation);
    }
    return (filteredVariations);
  }, []))
}

export function computeAmount(variation, range = "day") {
  let amount = Number(variation.amount);
  let daysInMonth = moment(variation.date).daysInMonth();
  let endOfMonth = moment(moment(variation.date).endOf('month'));

  if (variation.direction === "spending") {
    amount = -amount;
  }
  if (variation.frequency === "one-time") {
    if (range == "day") {
      return (amount / (endOfMonth.diff(moment(variation.date).subtract(1, "day"), "days")));
    }
    if (range == "month") {
      return (amount)
    }
  } else {
    return (amount / { "day": daysInMonth, "month": 1 }[range]);
  }
}

export function filterCurrentVariations(variations, range) {
  const today = moment(CURRENT_DATE);

  return (variations.reduce((filteredVariations, variation) => {
    const date = moment(variation.date);
    if (variation.frequency === "one-time" && date.isSame(CURRENT_DATE, range)) {
      filteredVariations.push(variation);
    }
    return (filteredVariations);
  }, []))
}

export function computeCurrentRangeAmount(variations, range = "day") {
  const currentVariations = filterCurrentVariations(variations, range);
  return (currentVariations.reduce((totalAmount, variation) => {
    let amount = Number(variation.amount);

    if (variation.direction === "spending") {
      amount = -amount;
    }

    totalAmount += Number(amount);
    return (totalAmount);
  }, 0));
}

export function computeDailyAmountAt(variation, date) {
  let amount = Number(variation.amount);
  let daysInMonth = moment(date).daysInMonth();
  let endOfMonth = moment(moment(date).endOf('month'));

  if (variation.direction === "spending") {
    amount = -amount;
  }
  if (variation.frequency === "one-time") {
    return (amount / (endOfMonth.diff(variation.date, `days`)));
  } else {
    return (amount / daysInMonth);
  }
}

export function computeTotalRangeAmount(variations, range = "day") {
  const computeRecurringAmountAt = (variations, date) => {
    let daysInMonth = moment(date).daysInMonth();
    let initialAmount = variations.reduce((initialAmount, variation) => {
      let variationAmount = Number(variation.amount);
      let variationDate = moment(variation.date);

      if (variation.direction === "spending") {
        variationAmount = -variationAmount;
      }
      if (variation.frequency === "recurring") {
        variationDate = moment(date).startOf('month');
      }
      if (variationDate.isSame(date, 'month') && variationDate.isSame(date, 'day')) {
        initialAmount += variationAmount / (daysInMonth + 1 - variationDate.date());
      }
      return (initialAmount)
    }, 0)
    return (initialAmount);
  }

  let end = {
    "day": moment(CURRENT_DATE),
    "month": moment(CURRENT_DATE).endOf("month")
  }[range];

  let start = moment(variations.sort((variation1, variation2) => variation1.date - variation2.date)[0].date);
  let totalAmount = 0;
  let endOfMonth = moment(CURRENT_DATE).endOf("month");

  for (let n = 0; n < end.diff(start, 'days') + 1; n++) {
    let currentDay = start.clone().add(n, 'days');
    totalAmount = computeRecurringAmountAt(variations, currentDay) + totalAmount + totalAmount / (endOfMonth.diff(currentDay, 'days') + 1);
  }

  return (totalAmount > 0 ? totalAmount : 0)
}
