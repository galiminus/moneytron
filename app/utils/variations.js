import moment from "moment";

export function removeOutdatedVariations(variations) {
  const today = moment();

  return (variations.reduce((filteredVariations, variation) => {
    if (variation.frequency === "recurring") {
      filteredVariations.push(variation);
    }
    if (variation.frequency === "one-time" && moment(variation.date).isSame(new Date(), "month")) {
      filteredVariations.push(variation);
    }
    return (filteredVariations);
  }, []))
}

export function computeDailyAmount(variation) {
  let amount = Number(variation.amount);

  if (variation.direction === "spending") {
    amount = -amount;
  }
  if (variation.frequency === "one-time") {
    return (amount / (moment(moment().endOf('month')).diff(variation.date, 'days')));
  } else {
    return (amount / 30.5);
  }
}

export function filterCurrentDayVariations(variations) {
  const today = moment();

  return (variations.reduce((filteredVariations, variation) => {
    const date = moment(variation.date);
    if (variation.frequency === "one-time" && date.isSame(new Date(), "day")) {
      filteredVariations.push(variation);
    }
    return (filteredVariations);
  }, []))
}

export function computeCurrentDayAmount(variations) {
  const currentDayVariations = filterCurrentDayVariations(variations);
  return (currentDayVariations.reduce((dailyAmount, variation) => {
    let amount = Number(variation.amount);

    if (variation.direction === "spending") {
      amount = -amount;
    }

    dailyAmount += Number(amount);
    return (dailyAmount);
  }, 0));
}

export function computeTotalDailyAmount(variations) {
  const filteredVariations = removeOutdatedVariations(variations);

  let totalDailyAmount = filteredVariations.reduce((dailyAmount, variation) => {
    dailyAmount += computeDailyAmount(variation);

    return (dailyAmount);
  }, 0);

  return (totalDailyAmount > 0 ? totalDailyAmount : 0);
}
