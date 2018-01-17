import React from 'react';
import moment from "moment";
import FlatButton from 'material-ui/FlatButton';
import { ListItem } from 'material-ui/List';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropUpIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';
import Divider from 'material-ui/Divider';
import { deepPurple100, red900, green900 } from 'material-ui/styles/colors';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setSelectedVariation } from "../actions/variations";
import { spreadToText } from "../utils/dates";
import { computeAmount } from "../utils/variations";
import translations from "../translations";

const VariationItemAmount = (props) => {
  return (
    <span>
      <span>{new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency }).format(props.variation.amount)}</span>
      <div
        style={{
          fontSize: "0.7em",
          color: "#444",
          paddingLeft: 3,
          float: "right",
          textAlign: "right"
        }}
      >
        <div>
          {`${new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency }).format(computeAmount(props.variation, props.range))}/${translations[props.locale].shortRange[props.range]}`}
        </div>
        <div>
          {
            props.variation.frequency === "one-time" ? translations[props.locale].untilEndOfTheMonth : translations[props.locale].everyMonth
          }
        </div>
      </div>
    </span>
  );
}

const VariationItem = (props) => (
  <div>
    <ListItem
      style={props.isSelected ? { background: deepPurple100 } : {}}
      onClick={() => props.isSelected ? props.setSelectedVariation(null) : props.setSelectedVariation(props.variation.uuid)}
      primaryText={VariationItemAmount(props)}
      secondaryText={
        <p
          style={{
            fontSize: "0.7em",
            marginTop: 2,
            fontWeight: "bold"
          }}
        >
          {props.variation.label}
        </p>
      }
      leftIcon={props.variation.direction === "spending" ? <ArrowDropDownIcon color={red900} /> : <ArrowDropUpIcon color={green900} />}
    />
    <Divider />
  </div>
)

function mapStateToProps(state, props) {
  return ({
    configuration: state.configuration,
    isSelected: (state.selectedVariation === props.variation.uuid),
    currency: state.configuration.currency,
    locale: state.configuration.locale
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    setSelectedVariation: (uuid) => dispatch(setSelectedVariation(uuid))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(VariationItem);
