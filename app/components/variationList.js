import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';
import moment from 'moment';

import VariationItem from "./variationItem";
import AddVariationButton from './addVariationButton';
import { removeVariation } from "../actions/variations";
import AppBar from "./appbar";
import VariationSummary from "./variationSummary";
import { removeOutdatedVariations } from "../utils/variations";
import { Desktop, Mobile } from "./devices";

import { Link } from 'react-router-dom';

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

const currentMonthName = (locale) => {
  const currentTime = moment();
  currentTime.locale(locale);

  let name = currentTime.format("MMMM");

  return (name.charAt(0).toUpperCase() + name.slice(1))
}

const ListAppBar = (props) => (
  <AppBar
    title={currentMonthName(props.locale)}
    showMenuIconButton={props.showMenuIconButton}
    iconElementRight={
      props.selectedVariation &&
        <IconButton onClick={() => props.removeVariation(props.selectedVariation)}>
          <DeleteIcon />
        </IconButton>
    }
  />
)

const InternalList = (props) => (
  <List>
    {sortVariations(removeOutdatedVariations(props.variations)).map((variation) => <VariationItem {...props} key={variation.uuid} variation={variation} range={props.range} />)}
  </List>
)

const VariationList = (props) => (
  <div>
    <Desktop>
      <ListAppBar {...props} showMenuIconButton={false} />
    </Desktop>
    <Mobile>
      <ListAppBar {...props} showMenuIconButton={true} />
    </Mobile>
    <div>
      <VariationSummary style={{ position: "fixed", width: "100%", zIndex: 1 }} range={props.range} />
      <div
        style={{
          paddingTop: 68,
          paddingBottom: 92,
          zIndex: 0
        }}
      >
        <Desktop>
          <div
            style={{
              width: "40%",
              margin: "auto"
            }}
          >
            <InternalList {...props} />
          </div>
        </Desktop>
        <Mobile>
          <InternalList {...props} />
        </Mobile>
      </div>
      <AddVariationButton containerElement={<Link to="/variations/new" />} />
    </div>
  </div>
)

function mapStateToProps(state, props) {
  return ({
    variations: state.variations,
    selectedVariation: state.selectedVariation,
    range: props.match.params.range || "day",
    locale: state.configuration.locale
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeVariation: (uuid) => dispatch(removeVariation(uuid))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VariationList);
