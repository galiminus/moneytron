import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { connect } from 'react-redux';

import { removeOutdatedVariations, computeDailyAmount, computeCurrentDayAmount, computeTotalDailyAmount } from "../utils/variations";
import translations from "../translations";

const VariationSummary = (props) => {
  const dailyAmount = Math.floor(computeTotalDailyAmount(props.variations));

  return (
    <Paper style={props.style}>
      <List>
        <Subheader
          style={{ lineHeight: "32px", paddingTop: 8 }}
        >
          {translations[props.locale].youShouldNotSpendMoreThan}
        </Subheader>
        <ListItem
          innerDivStyle={{ padding: "0px 16px 4px 16px" }}
          primaryText={
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  float: "left"
                }}
              >
                {`${new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency }).format(Math.abs(dailyAmount))} ${translations[props.locale].everyDay}`}
              </div>
              <span
                style={{
                  fontSize: "0.7em",
                  color: "rgba(0, 0, 0, 0.54)",
                  float: "right"
                }}
              >
                {`${new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency }).format(computeCurrentDayAmount(props.variations))} ${translations[props.locale].today}`}
              </span>
              <div style={{ clear: "both" }}></div>
            </div>
          }
        />
      </List>
    </Paper>
  );
}

function mapStateToProps(state) {
  return ({
    variations: state.variations,
    currency: state.configuration.currency,
    locale: state.configuration.locale
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VariationSummary);
