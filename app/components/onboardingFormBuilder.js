import React from 'react';
import TextField from 'material-ui/TextField';
import DoneIcon from 'material-ui/svg-icons/action/done';
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addVariation } from '../actions/variations';
import { updateConfiguration } from '../actions/configuration';
import { defaultMonthsSelection, numberOfMonthsToText } from "../utils/dates";
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

const OnboardingFormBuilder = (options = {}) => {
  const OnboardingForm = (props) => (
    <Dialog
      open={props.configuration.onboarding === options.form}
      title={options.title}
      actions={
        <FlatButton
          label={translations[props.locale].nextQuestion}
          primary={true}
          onClick={props.handleSubmit}
          disabled={!props.valid}
        />
      }
    >
      <Field
        name="amount"
        component={AmountField}
        type="number"
        validate={[required]}
        label={translations[props.locale].amount}
        autoFocus
      />
      <Field name="date" component='input' type="hidden" validate={[required]} />
      <Field name="uuid" component='input' type="hidden" validate={[required]} />
      <Field name="direction" component='input' type="hidden" validate={[required]} />
      <Field name="frequency" component='input' type="hidden" validate={[required]} />
    </Dialog>
  )

  const mapStateToProps = (state) => {
    return {
      configuration: state.configuration,
      initialValues: {
        uuid: new Date().getTime().toString(),
        amount: null,
        date: new Date(),
        ...options.initialValues
      },
      currency: state.configuration.currency,
      locale: state.configuration.locale
    }
  }

  const mapDispatchToProps = (dispatch, props) => {
    return {
      onSubmit: (variation) => {
        dispatch(addVariation(variation));
        dispatch(updateConfiguration({ onboarding: options.next }));
      }
    }
  }

  return (connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: options.form })(OnboardingForm)));
}

export default OnboardingFormBuilder;
