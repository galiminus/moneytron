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
import translations from "../translations";

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

const VariationList = (props) => (
  <div>
    <AppBar
      title={translations[props.locale].range[props.range]}
      showMenuIconButton={props.showMenuIconButton}
      iconElementRight={
        props.selectedVariation &&
          <IconButton onClick={() => props.removeVariation(props.selectedVariation)}>
            <DeleteIcon />
          </IconButton>
      }
    />
    <VariationSummary style={{ position: "fixed", width: "100%", zIndex: 1, paddingTop: 64 }} range={props.range} />
    <div
      style={{
        paddingTop: 124,
        paddingBottom: 92,
        zIndex: 0
      }}
    >
      <List>
        {sortVariations(removeOutdatedVariations(props.variations)).map((variation) => <VariationItem {...props} key={variation.uuid} variation={variation} range={props.range} />)}
      </List>
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
