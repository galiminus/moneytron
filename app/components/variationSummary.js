import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import { FlatButton } from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import { deepPurple900 } from 'material-ui/styles/colors';

import { connect } from 'react-redux';

import { setCurrentDate } from "../actions/currentDate";
import { removeOutdatedVariations, computeDailyAmount, computeCurrentRangeAmount, computeTotalRangeAmount } from "../utils/variations";
import translations from "../translations";

class VariationSummary extends React.Component {
  componentDidUpdate() {
    if (this.state && this.state.datePickerOpen)
      this.refs.datePicker.openDialog();
  }

  render() {
    const dailyAmount = computeTotalRangeAmount(this.props.variations, this.props.currentDate, 'day');

    return (
      <Paper style={{
        ...this.props.style
      }}>
        <List style={{ padding: 0 }}>
          <ListItem
            style={{ padding: "8px 0" }}
            onClick={() => this.setState({ datePickerOpen: true })}
            primaryText={
              <div>
                <div
                  style={{
                    color: "rgba(0, 0, 0, 0.74)",
                    display: "inline-block",
                    fontWeight: "bold"
                  }}
                >
                  {moment(this.props.currentDate).locale(this.props.locale).format("LL")}
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    textTransform: "lowercase",
                    background: deepPurple900,
                    padding: 6,
                    borderRadius: 3,
                    color: "white",
                    display: "inline-block",
                    position: "absolute",
                    right: 16,
                    top: 10
                  }}
                >
                {`${new Intl.NumberFormat(this.props.locale, { style: 'currency', currency: this.props.currency }).format(Math.abs(dailyAmount))} / ${translations[this.props.locale].shortRange[this.props.range]}`}
                </div>
              </div>
            }
          />
        </List>
        <DatePicker
          id="datePicker"
          ref="datePicker"
          style={{
            display: "none"
          }}
          autoOk={true}
          hideCalendarDate={true}
          onChange={(_, value) => {
            this.props.setCurrentDate(value);
            this.setState({ datePickerOpen: false });
          }}
          value={this.props.currentDate}
          onDismiss={() => this.setState({ datePickerOpen: false })}
          DateTimeFormat={Intl.DateTimeFormat}
          locale={this.props.locale}
          cancelLabel={translations[this.props.locale].cancel}
        />
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
