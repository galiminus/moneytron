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

export function computeAmount(variation, range = "day") {
  let amount = Number(variation.amount);
  let daysInMonth = moment().daysInMonth();
  let endOfMonth = moment(moment().endOf('month'));

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
  const today = moment();

  return (variations.reduce((filteredVariations, variation) => {
    const date = moment(variation.date);
    if (variation.frequency === "one-time" && date.isSame(new Date(), range)) {
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

export function computeTotalRangeAmount(variations, range = "day") {
  const filteredVariations = removeOutdatedVariations(variations);

  let totalAmount = filteredVariations.reduce((amount, variation) => {
    amount += computeAmount(variation, range);

    return (amount);
  }, 0);

  return (totalAmount > 0 ? totalAmount : 0);
}
