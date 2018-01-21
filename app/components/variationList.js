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
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router-dom';

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
    if (variation2.direction === "project") {
      return (-1);
    }
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

const targetDateText = (props) => {
  if (props.variation.direction === "project") {
    return (translations[props.locale].untilDate.replace("END_DATE", moment(props.variation.end).locale(props.locale).format("LL")));
  }
  if (props.variation.frequency === "one-time") {
    return (translations[props.locale].untilEndOfTheMonth);
  }
  if (props.variation.frequency === "recurring") {
    return (translations[props.locale].everyMonth);
  }
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
          {targetDateText(props)}
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
    {
      Object.entries({ "recurringOnly": { frequency: "one-time"}, "oneTimeOnly": { frequency: "one-time" } }).map(([name, filters]) => (
        <MenuItem primaryText={translations[props.locale].filters[name]} key={name} />
      ))
    }
  </IconMenu>
)

const SettingsButton = (props) => (
  <IconButton containerElement={<Link to="/settings" />}>
    <SettingsIcon color="white" />
  </IconButton>
)

const VariationList = (props) => (
  <div>
    <AppBar
      title={translations[props.locale].estimate}
      showMenuIconButton={false}
      iconElementRight={
        props.selectedVariation ? <DeleteVariationButton {...props} /> : <SettingsButton {...props} />
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
               leftIcon={variation.direction === "spending" || variation.direction === "project" ? <ArrowDropDownIcon color={red900} /> : <ArrowDropUpIcon color={green900} />}
             />,
             <Divider />
           ])
        )}
      </SelectableList>
      <AddVariationButton onClick={props.openVariationForm} />
    </div>
    { props.formOpen && <VariationForm onRequestClose={props.closeVariationForm} /> }
  </div>
)

function mapStateToProps(state, props) {
  return ({
    variations: state.variations,
    selectedVariation: state.selectedVariation,
    range: props.match.params.range || "day",
    locale: state.configuration.locale,
    currency: state.configuration.currency,
    currentDate: state.currentDate,
    formOpen: state.variationForm,
    currentFilter: state.currentFilter
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
