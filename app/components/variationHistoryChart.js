import React from 'react';
import { connect } from 'react-redux';
import { deepPurple900 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, CartesianGrid } from 'recharts';
import { computeTotalRangeAmount } from "../utils/variations";
import moment from "moment";
import translations from "../translations";

const dataFromVariations = (props) => (
  Array.from(Array(props.days).keys()).map((day) => (
    { amount: props.computer(props.variations, moment(props.currentDate).subtract(props.days - day - 1, 'days').toDate(), 'day') }
  ))
)

const VariationHistoryChart = (props) => (
  <div>
    <Subheader
      style={{
        fontFamily: "Roboto, sans-serif",
        fontWeight: "bold"
      }}
    >
      {translations[props.locale].graphTitles.days.replace("DAYS", props.days)}
    </Subheader>
    <ResponsiveContainer height={100}>
      <LineChart
        style={{
          fontSize: 10
        }}
        height={100}
        data={dataFromVariations(props)}
        margin={{
          top: 0,
          right: 20,
          left: -20,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>

        <YAxis
          padding={{
          }}
        />
        <Line type="monotone" dataKey="amount" stroke={deepPurple900} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VariationHistoryChart);
