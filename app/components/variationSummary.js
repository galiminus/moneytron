import React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import moment from 'moment';
import { deepPurple900, red900 } from 'material-ui/styles/colors';

import { connect } from 'react-redux';

import VariationHistoryChart from "./variationHistoryChart";
import { setCurrentDate } from "../actions/currentDate";
import { computeTotalRangeAmount } from "../utils/variations";
import translations from "../translations";

class VariationSummary extends React.Component {
  render() {
    const dailyAmount = computeTotalRangeAmount(this.props.variations, this.props.currentDate, 'day');

    return (
      <Paper style={{
        ...this.props.style
      }}>
        <List style={{ padding: 0 }}>
          <ListItem
            style={{ padding: "8px 0" }}
            primaryTogglesNestedList={true}
            nestedItems={
              [
                <VariationHistoryChart key={"30"} days={30} />,
                <VariationHistoryChart key={"90"} days={90} />,
                <ListItem
                  key={"changeDate"}
                  onClick={() => this.setState({ datePickerOpen: true })}
                  style={{
                    marginTop: 16
                  }}
                  innerDivStyle={{
                    textAlign: "right",
                    paddingBottom: 0
                  }}
                />
              ]
            }
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
                  {moment(this.props.currentDate).locale(this.props.locale).format("LL")}
                </div>
                <div
                  style={{
                    textTransform: "lowercase",
                    background: (dailyAmount > 0 ? deepPurple900 : red900),
                    padding: 6,
                    borderRadius: 3,
                    fontWeight: "bold",
                    color: "white",
                    display: "inline-block",
                    position: "absolute",
                    top: 10
                  }}
                >
                  {`${new Intl.NumberFormat(this.props.locale, { style: 'currency', currency: this.props.currency }).format(dailyAmount)} / ${translations[this.props.locale].shortRange[this.props.range]}`}
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
    currentDate: state.currentDate
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentDate: (date) => dispatch(setCurrentDate(date))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VariationSummary);
