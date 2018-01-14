import moment from "moment";

export function removeOutdatedVariations(variations) {
  const today = moment();

  return (variations.reduce((filteredVariations, variation) => {
    const endDate = moment(variation.date).add(moment.duration(variation.spreading, 'months'));
    if (variation.frequency === "recurring" || endDate.isAfter(today)) {
      filteredVariations.push(variation);
    }
    return (filteredVariations);
  }, []))
}

export function computeDailyAmount(variation) {
  let amount = variation.amount;

  if (variation.direction === "spending") {
    amount = -amount;
  }
  return (amount / (variation.spreading * 30.5));
}
