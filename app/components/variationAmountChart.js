import React from 'react';
import { connect } from 'react-redux';
import { deepPurple900 } from 'material-ui/styles/colors';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { computeGroupedVariations, groupVariationsByCategory } from "../utils/variations";
import moment from "moment";
import translations from "../translations";

const filterLastDaysSpendings = (variations, start) => (
  variations.reduce((filteredVariations, variation) => {
    if ((variation.direction === "spending" || variation.direction === "project") && moment(variation.date).isAfter(start, 'day')) {
      filteredVariations.push(variation);
    }
    return (filteredVariations);
  }, [])
)

const dataFromVariations = (props) => (
  computeGroupedVariations(Object.entries(groupVariationsByCategory(filterLastDaysSpendings(props.variations, moment().subtract(props.days, 'days').startOf('day')))), props.range, props.currentDate).map((variation) => (
    { subject: variation.label, amount: variation.amount, fullMark: 150 }
  ))
)

const VariationAmountChart = (props) => (
  <ResponsiveContainer height={200}>
    <RadarChart
      data={dataFromVariations(props)}
      margin={{
        top: 0,
        right: 20,
        left: -20,
        bottom: 10
      }}
      style={{
        fontSize: 10,
        padding: "10px 0"
      }}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Radar dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
    </RadarChart>
  </ResponsiveContainer>
)

function mapStateToProps(state, props) {
  return ({
    variations: state.variations,
    currentDate: state.currentDate,
    locale: state.configuration.locale
  });
}

function mapDispatchToProps(dispatch) {
  return ({
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(VariationAmountChart);
