import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';

import UUID from 'uuid-js';

import { connect, dispatch } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { addVariation } from '../actions/variations';
import { defaultMonthsSelection, numberOfMonthsToText } from "../utils/dates";
import AppBar from "./appbar";
import ResponsiveSelect from "./responsiveSelect";
import { setMessage } from "../actions/message";
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
    value={input.value ? new Date(input.value) : new Date()}
    onChange={(event, value) => {
      input.onChange(value)
    }}
  />
)

class VariationForm extends React.Component {
  render() {
    return (
      <div className="transition-item">
        <AppBar
          onLeftIconButtonClick={this.props.history.goBack}
          iconElementLeft={<IconButton><BackIcon /></IconButton>}
          iconElementRight={this.props.valid ? <FlatButton label={translations[this.props.locale].save} onClick={this.props.handleSubmit} /> : undefined}
        />
        <div style={{ padding: "64px 1em 1em 1em" }}>
          <Field
            name="amount"
            component={AmountField}
            type="number"
            validate={[required]}
            label={translations[this.props.locale].amount}
            autoFocus
          />
          <Field
            name="label"
            component={LabelField}
            type="text"
            label={translations[this.props.locale].label}
            dataSource={this.props.variations.map((variation) => variation.label)}
          />
          <ResponsiveSelect
            name="direction"
            validate={[required]}
            label={translations[this.props.locale].direction}
          >
            <option value="spending">
              {translations[this.props.locale].spending}
            </option>
            <option value="earning">
              {translations[this.props.locale].earning}
            </option>
          </ResponsiveSelect>
          <ResponsiveSelect
            name="frequency"
            validate={[required]}
            label={translations[this.props.locale].frequency}
          >
            <option value={"one-time"}>
              {translations[this.props.locale].oneTime}
            </option>
            <option value={"recurring"}>
              {translations[this.props.locale].recurring}
            </option>
          </ResponsiveSelect>
          {
            this.props.frequency === "one-time" &&
              <Field
                name="date"
                component={DateField}
                type="text"
                validate={[required]}
                label={translations[this.props.locale].date}
              />
          }
          <Field name="uuid" component='input' type="hidden" validate={[required]} />
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('variation');

const mapStateToProps = (state) => {
  return {
    initialValues: {
      uuid: UUID.create().toString(),
      amount: null,
      direction: "spending",
      frequency: "one-time",
      date: new Date()
    },
    currency: state.configuration.currency,
    locale: state.configuration.locale,
    variations: state.variations,
    frequency: selector(state, 'frequency')
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
