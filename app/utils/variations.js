import moment from "moment";

// const CURRENT_DATE = new Date("02-01-2018");
const CURRENT_DATE = new Date();

export function removeOutdatedVariations(variations) {
  return (variations);
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
    if (range == "month") {
      return (amount)
    }
    return (amount / (endOfMonth.diff(variation.date, `${range}s`)));
  } else {
    return (amount / { "day": daysInMonth, "week": (daysInMonth / 7.0), "month": 1 }[range]);
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
  let totalAmount = variations.reduce((amount, variation) => {
    let startDate = moment(moment(variation.date).startOf('month'));
    let endDate;
    if (variation.frequency === "one-time") {
      endDate = moment(moment(variation.date).endOf('month'));
    } else {
      endDate = moment(moment().endOf('month'));
    }

    let numberOfDays = moment(CURRENT_DATE).diff(startDate, "days");
    for (let day = 0; day < (numberOfDays + 1); day++) {
      amount += computeDailyAmountAt(variation, startDate.add(day, "days"));
    }
    return (amount);
  }, 0)
  return (totalAmount > 0 ? totalAmount : 0);
}
