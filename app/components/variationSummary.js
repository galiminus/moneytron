import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { connect } from 'react-redux';

import { removeOutdatedVariations, computeDailyAmount, computeCurrentRangeAmount, computeTotalRangeAmount } from "../utils/variations";
import translations from "../translations";

const VariationSummary = (props) => {
  const dailyAmount = computeTotalRangeAmount(props.variations, props.range);

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
                  float: "left",
                  textTransform: "lowercase"
                }}
              >
                {`${new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency }).format(Math.abs(dailyAmount))} ${translations[props.locale].range[props.range]}`}
              </div>
              <span
                style={{
                  fontSize: "0.7em",
                  color: "rgba(0, 0, 0, 0.54)",
                  float: "right"
                }}
              >
                {`${new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency }).format(computeCurrentRangeAmount(props.variations, props.range))} ${translations[props.locale].currentRange[props.range]}`}
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
