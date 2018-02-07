import React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import moment from 'moment';
import { deepPurple900, red900 } from 'material-ui/styles/colors';

import { connect } from 'react-redux';

import VariationHistoryChart from "./variationHistoryChart";
import VariationAmountChart from "./variationAmountChart";
import { setCurrentDate } from "../actions/currentDate";
import { setSummaryDisplay } from "../actions/summaryDisplay";
import { computeTotalRangeAmount, computeCurrentDayAbsoluteAmount } from "../utils/variations";
import translations from "../translations";

const removeCurrentVariations = (variations, date) => {
  return (variations.reduce((filteredVariations, variation) => {
    if (variation.direction === "project" || variation.frequency === "recurring") {
      filteredVariations.push(variation)
    } else if (variation.frequency === "one-time" && moment(variation.date).isBefore(moment(date).startOf('day'))) {
      filteredVariations.push(variation)
    }
    return (filteredVariations);
  }, []))
}

class VariationSummary extends React.Component {
  render() {
    const averageAmount = computeTotalRangeAmount(removeCurrentVariations(this.props.variations, this.props.currentDate), this.props.currentDate, 'dayWithoutCurrent');
    const averageAmountText = new Intl.NumberFormat(this.props.locale, { style: 'currency', currency: this.props.currency }).format(averageAmount);

    const absoluteAmount = computeCurrentDayAbsoluteAmount(this.props.variations, this.props.currentDate);
    const absoluteAmountText = new Intl.NumberFormat(this.props.locale, { style: 'currency', currency: this.props.currency }).format(Math.abs(absoluteAmount));

    const tomorrowAverageAmount = computeTotalRangeAmount(this.props.variations, moment(this.props.currentDate).add(1, 'day').toDate(), 'day');
    const tomorrowAverageAmountText = new Intl.NumberFormat(this.props.locale, { style: 'currency', currency: this.props.currency }).format(tomorrowAverageAmount);

    return (
      <Paper style={{
        ...this.props.style
      }}>
        <List style={{ padding: 0 }}>
          <ListItem
            style={{ padding: "8px 0" }}
            primaryTogglesNestedList={true}
            nestedItems={[
              <Subheader
                key={"title"}
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "bold"
                }}
              >
                {translations[this.props.locale].graphTitles.days.replace("DAYS", 30)}
              </Subheader>,
              <VariationHistoryChart key={"history"} days={30} computer={computeTotalRangeAmount} />,
            ]}
            primaryText={
              <div
                style={{
                  height: 16
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    position: "absolute",
                    right: 48,
                    display: "inline-block",
                    color: "rgba(0, 0, 0, 0.74)",
                    top: 17
                  }}
                >
                </div>
                <div
                  style={{
                    textTransform: "lowercase",
                    background: (Math.abs(absoluteAmount) <= averageAmount || absoluteAmount > 0 ? deepPurple900 : red900),
                    padding: "8px 12px",
                    borderRadius: 3,
                    fontWeight: "bold",
                    color: "white",
                    display: "inline-block",
                    position: "absolute",
                    top: 0,
                  }}
                >
                  {`${absoluteAmountText} / ${averageAmountText} ${translations[this.props.locale].today}`}
                </div>
                <div
                  style={{
                    textTransform: "lowercase",
                    color: "rgba(0, 0, 0, 0.7)",
                    display: "inline-block",
                    position: "absolute",
                    fontSize: "0.7em",
                    top: 34,
                    left: 18
                  }}
                >
                  {`${tomorrowAverageAmountText} par jour à partir de demain`}
                </div>
              </div>
            }
          />
        </List>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    variations: state.variations,
    currency: state.configuration.currency,
    locale: state.configuration.locale,
    currentDate: state.currentDate,
    summaryDisplay: state.summaryDisplay
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentDate: (date) => dispatch(setCurrentDate(date)),
    setSummaryDisplay: (type) => dispatch(setSummaryDisplay(type))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VariationSummary);
