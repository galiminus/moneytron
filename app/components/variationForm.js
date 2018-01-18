import React from 'react';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import DoneIcon from 'material-ui/svg-icons/action/done';
import AutoComplete from 'material-ui/AutoComplete';

import { connect, dispatch } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
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
  <div>
    <AppBar
      onLeftIconButtonClick={props.history.goBack}
      iconElementLeft={<IconButton><BackIcon /></IconButton>}
      iconElementRight={props.valid ? <IconButton onClick={props.handleSubmit}><DoneIcon /></IconButton> : undefined}
    />
    <div style={{ padding: "0 1em", paddingTop: 64 }}>
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
      <Field name="date" component='input' type="hidden" validate={[required]} />
      <Field name="uuid" component='input' type="hidden" validate={[required]} />
    </div>
  </div>
)

const selector = formValueSelector('variation');

const mapStateToProps = (state) => {
  return {
    initialValues: {
      uuid: new Date().getTime().toString(),
      amount: null,
      direction: "spending",
      frequency: "one-time",
      date: new Date()
    },
    currency: state.configuration.currency,
    locale: state.configuration.locale,
    variations: state.variations,
    frequency: selector(state, 'frequency'),
    direction: selector(state, 'direction')
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addVariation: (variation) => { dispatch(addVariation(variation)) }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSubmit: (variation) => {
      dispatchProps.addVariation(variation);
      ownProps.history.goBack();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(reduxForm({ form: "variation" })(VariationForm));
