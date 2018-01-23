import moment from "moment";

export function filterVariations(variations, date, range) {
  return (variations.reduce((filteredVariations, variation) => {
    if (variation.direction === "project") {
      if (moment(date).isBetween(moment(variation.date).startOf('day'), moment(variation.end).endOf('day'))) {
        filteredVariations.push(variation);
      }
      return (filteredVariations);
    }

    if (variation.frequency === "recurring" && moment(variation.date).startOf('month').isSameOrBefore(date)) {
      filteredVariations.push(variation);
    } else if (variation.frequency === "one-time" && moment(variation.date).isSame(moment(date), range) && moment(variation.date).isSameOrBefore(moment(date).endOf('day'))) {
      filteredVariations.push(variation);
    }
    return (filteredVariations);
  }, []))
}

export function computeAmount(variation, range) {
  let amount = Number(variation.amount);
  let daysInMonth = moment(variation.date).daysInMonth();
  let endOfMonth = moment(moment(variation.date).endOf('month'));

  if (variation.direction === "spending" || variation.direction === "project") {
    amount = -amount;
  }
  if (variation.direction === "project") {
    return (amount / moment(variation.end).diff(moment(variation.date).subtract(1, "day"), "days"));
  }
  if (variation.frequency === "one-time") {
    if (range == "day") {
      return (amount / endOfMonth.diff(moment(variation.date).subtract(1, "day"), "days"));
    }
    if (range == "month") {
      return (amount)
    }
  } else {
    return (amount / { "day": daysInMonth, "month": 1 }[range]);
  }
}

export function computeTotalRangeAmount(variations, currentDate, range) {
  if (variations.length === 0) {
    return (0);
  }

  const computeRecurringAmountAt = (variations, date) => {
    let daysInMonth = moment(date).daysInMonth();
    let initialAmount = variations.reduce((initialAmount, variation) => {
      let variationAmount = Number(variation.amount);
      let variationDate = moment(variation.date);

      if (variation.direction === "spending" || variation.direction === "project") {
        variationAmount = -variationAmount;
      }

      if (variation.direction === "project" && variationDate.isSame(date, 'month') && variationDate.isSame(date, 'day')) {
        return (initialAmount + variationAmount / moment(variation.end).diff(moment(variation.date).subtract(1, "day"), "days"));
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

  const start = moment(variations.sort((variation1, variation2) => ( variation1.date - variation2.date))[0].date).startOf('month');
  const endOfMonth = moment(currentDate).endOf("month");
  const end = { "day": moment(currentDate), "month": moment(currentDate).endOf("month") }[range];

  let totalAmount = 0;
  for (let n = 0; n < end.diff(start, 'days') + 1; n++) {
    let currentDay = start.clone().add(n, 'days');
    totalAmount = computeRecurringAmountAt(variations, currentDay) + totalAmount + totalAmount / (endOfMonth.diff(currentDay, 'days') + 1);
  }

  return (totalAmount > 0 ? totalAmount : 0)
}

export function sortVariations(variations) {
  return (variations.sort((variation1, variation2) => {
    return (variation1.date < variation2.date);
  }));
}

export function groupVariationsByTypeAndFrequency(variations) {
  return (
    variations.reduce((groupedVariations, variation) => {
      let key;

      if (variation.direction === "project") {
        key = "project"
      } else if (variation.frequency === "one-time") {
        key = "oneTime"
      }  else if (variation.frequency === "recurring") {
        key = "recurring"
      }
      groupedVariations[key].push(variation);

      return (groupedVariations);
    }, {
      "oneTime": [],
      "recurring": [],
      "project": []
    })
  );
}

export function groupVariationsByCategory(variations) {
  return (
    variations.reduce((groupedVariations, variation) => {
      if (!groupedVariations[variation.label]) {
        groupedVariations[variation.label] = [];
      }
      groupedVariations[variation.label].push(variation);

      return (groupedVariations);
    }, {})
  );
}
