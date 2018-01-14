export function numberOfMonthsToText(numberOfMonths) {
  return (
    {
      1: "One month",
      2: "Two months",
      3: "Three months",
      4: "Four months",
      5: "Five months",
      6: "Six months",
      7: "Seven months",
      8: "Height months",
      9: "Nine months",
      10: "Ten months",
      11: "Eleven months",
      12: "One year",
      24: "Two years",
      36: "Three years",
      48: "Four years",
      60: "Five years"
    }[numberOfMonths]
  )
}

export function defaultMonthsSelection() {
  return ([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24, 36, 48, 60
  ])
}
