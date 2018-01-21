import React from 'react';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import DoneIcon from 'material-ui/svg-icons/action/done';
import AutoComplete from 'material-ui/AutoComplete';
import FullscreenDialog from 'material-ui-fullscreen-dialog';

import { connect, dispatch } from 'react-redux';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import { addVariation } from '../actions/variations';
import AppBar from "./appbar";
import ResponsiveSelect from "./responsiveSelect";
import translations from "../translations";

const required = value => (value ? undefined : 'This field is required.')

const AmountField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    fullWidth={true}
    autoFocus
    { ...input }
    { ...custom }
  />
)

const SpreadingField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    fullWidth={true}
    { ...input }
    { ...custom }
  />
)

const LabelField =  ({ input, label, meta: { touched, error }, ...custom }) => (
  <AutoComplete
    floatingLabelText={label}
    fullWidth={true}
    filter={AutoComplete.caseInsensitiveFilter}
    { ...input }
    { ...custom }
    onUpdateInput={(value) => {
      input.onChange(value)
    }}
  />
)

const DateField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <DatePicker
    floatingLabelText={label}
    fullWidth={true}
    { ...input }
    { ...custom }
    maxDate={new Date()}
    value={input.value ? new Date(input.value) : new Date()}
    onChange={(event, value) => {
      input.onChange(value)
    }}
  />
)

const labelDataSource = (variations, direction) => (
  variations
    .filter((variation) => variation.direction === direction)
    .map((variation) => variation.label)
    .reduce((x, y) => x.includes(y) ? x : [...x, y], [])
)

const VariationForm = (props) => (
  <FullscreenDialog
    style={{
      background: "white"
    }}
    open={props.open}
    onRequestClose={props.handleClose}
    closeIcon={<BackIcon />}
    actionButton={
      props.valid ? <IconButton onClick={props.handleSubmit}><DoneIcon /></IconButton> : undefined
    }
  >
    <div style={{ padding: "0 1em" }}>
      <Field
        name="amount"
        component={AmountField}
        type="number"
        validate={[required]}
        label={translations[props.locale].amount}
        autoFocus
      />
      <ResponsiveSelect
        name="direction"
        validate={[required]}
        label={translations[props.locale].direction}
        collection={
          {
            "spending": translations[props.locale].spending,
            "earning": translations[props.locale].earning
          }
        }
      />
      <Field
        name="label"
        component={LabelField}
        type="text"
        label={translations[props.locale].label}
        dataSource={labelDataSource(props.variations, props.direction)}
      />
      <ResponsiveSelect
        name="frequency"
        validate={[required]}
        label={translations[props.locale].frequency}
        collection={
          {
            "one-time": translations[props.locale].oneTime,
            "recurring": translations[props.locale].recurring
          }
        }
      />
    </div>
  </FullscreenDialog>
)

const selector = formValueSelector('variation');

const mapStateToProps = (state) => {
  return {
    open: state.variationForm,
    initialValues: {
      direction: "spending",
      frequency: "one-time"
    },
    currency: state.configuration.currency,
    locale: state.configuration.locale,
    variations: state.variations,
    frequency: selector(state, 'frequency'),
    direction: selector(state, 'direction'),
    amount: selector(state, 'amount')
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addVariation: (variation) => { dispatch(addVariation(variation)) },
    resetForm: () => { dispatch(reset("variation")) }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    handleClose: (variation) => {
      ownProps.onRequestClose();
      dispatchProps.resetForm();
    },
    onSubmit: (variation) => {
      ownProps.onRequestClose();
      dispatchProps.addVariation(variation);
      dispatchProps.resetForm();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(reduxForm({ form: "variation", enableReinitialize: false })(VariationForm));
