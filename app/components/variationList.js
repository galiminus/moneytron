import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';
import ArrowDropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropUpIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';

import { red900, green900 } from 'material-ui/styles/colors';

import {List, ListItem, makeSelectable} from 'material-ui/List';
import { connect } from 'react-redux';
import moment from 'moment';

import AddVariationButton from './addVariationButton';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';

import { removeVariation } from "../actions/variations";
import AppBar from "./appbar";
import VariationSummary from "./variationSummary";
import { filterVariations } from "../utils/variations";
import translations from "../translations";
import { setSelectedVariation } from "../actions/variations";
import { openVariationForm, closeVariationForm } from "../actions/variationForm";
import { spreadToText } from "../utils/dates";
import { computeAmount } from "../utils/variations";
import VariationForm from './variationForm';

const sortVariations = (variations) => {
  return (variations.sort((variation1, variation2) => {
    if (variation1.direction === "earning" && variation1.frequency === "recurring") {
      return (1);
    }
    if (variation2.direction === "earning" && variation2.frequency === "recurring") {
      return (-1);
    }

    if (variation1.frequency === "one-time" && variation2.frequency === "recurring") {
      return (-1);
    }
    if (variation1.frequency === "recurring" && variation2.frequency === "one-time") {
      return (1);
    }
    return (variation1.date < variation2.date);
  }));
}

let SelectableList = makeSelectable(List);

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
          {`${new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency }).format(computeAmount(props.variation, props.range))} / ${translations[props.locale].shortRange[props.range]}`}
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

const DeleteVariationButton = (props) => (
  <IconButton onClick={() => props.removeVariation(props.selectedVariation)}>
    <DeleteIcon color="white" />
  </IconButton>
)

const FilterMenuButton = (props) => (
  <IconMenu
    style={{
      width: "100%"
    }}
    iconButtonElement={<IconButton><FilterIcon color="white" /></IconButton>}
  >
  </IconMenu>
)

const VariationList = (props) => (
  <div>
    <AppBar
      title={translations[props.locale].estimate}
      showMenuIconButton={props.showMenuIconButton}
      iconElementRight={
        props.selectedVariation ? <DeleteVariationButton {...props} /> : null
      }
    />

    <VariationSummary style={{ position: "fixed", width: "100%", zIndex: 1, paddingTop: 64 }} range={props.range} />
    <div
      style={{
        paddingTop: 120,
        paddingBottom: 92,
        zIndex: 0
      }}
    >
      <SelectableList
        value={props.selectedVariation}
      >
        {sortVariations(filterVariations(props.variations, props.currentDate, 'month')).map((variation) =>
           React.Children.toArray([
             <ListItem
              value={variation.uuid}
               onClick={() => props.selectedVariation == variation.uuid ? props.setSelectedVariation(null) : props.setSelectedVariation(variation.uuid)}
               primaryText={<VariationItemAmount variation={variation} locale={props.locale} range={props.range} currency={props.currency} />}
               secondaryText={
                 <p
                   style={{
                     fontSize: "0.7em",
                     marginTop: 2,
                     fontWeight: "bold"
                   }}
                 >
                   {variation.label}
                 </p>
               }
               leftIcon={variation.direction === "spending" ? <ArrowDropDownIcon color={red900} /> : <ArrowDropUpIcon color={green900} />}
             />,
             <Divider />
           ])
        )}
      </SelectableList>
      <AddVariationButton onClick={props.openVariationForm} />
    </div>
    <VariationForm onRequestClose={props.closeVariationForm} />
  </div>
)

function mapStateToProps(state, props) {
  return ({
    variations: state.variations,
    selectedVariation: state.selectedVariation,
    range: props.match.params.range || "day",
    locale: state.configuration.locale,
    currency: state.configuration.currency,
    currentDate: state.currentDate
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeVariation: (uuid) => dispatch(removeVariation(uuid)),
    setSelectedVariation: (uuid) => dispatch(setSelectedVariation(uuid)),
    openVariationForm: () => dispatch(openVariationForm()),
    closeVariationForm: () => dispatch(closeVariationForm())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VariationList);
