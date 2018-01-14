import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { connect } from 'react-redux';

import { removeOutdatedVariations, computeDailyAmount  } from "../utils/variations";

const computeTotalDailyAmount = (variations) => {
  const filteredVariations = removeOutdatedVariations(variations);

  return (filteredVariations.reduce((dailyAmount, variation) => {
    dailyAmount += computeDailyAmount(variation);

    return (dailyAmount);
  }, 0));
}

const VariationSummary = (props) => {
  return (
    <Paper style={props.style}>
      <List>
        <Subheader
          style={{ lineHeight: "32px", paddingTop: 8 }}
        >
          Today you should spend no more than
        </Subheader>
        <ListItem
          innerDivStyle={{ padding: "8px 16px", fontWeight: "bold" }}
          primaryText={`${Math.floor(computeTotalDailyAmount(props.variations))} ${props.currency}`}
        />
      </List>
    </Paper>
  );
}

function mapStateToProps(state) {
  return ({
    variations: state.variations,
    currency: state.configuration.currency
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VariationSummary);
