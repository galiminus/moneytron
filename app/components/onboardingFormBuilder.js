import React from 'react';
import TextField from 'material-ui/TextField';
import DoneIcon from 'material-ui/svg-icons/action/done';
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect, dispatch } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { addVariation } from '../actions/variations';
import { updateConfiguration } from '../actions/configuration';
import { defaultMonthsSelection, numberOfMonthsToText } from "../utils/dates";
import AppBar from "./appbar";
import ResponsiveSelect from "./responsiveSelect";
import translations from "../translations";

const OnboardingFormBuilder = (options = {}) => {
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

  const OnboardingForm = (props) => (
    <Dialog
      open={true}
      title={options.title}
      modal={true}
      actions={[
        <FlatButton
          label={translations[props.locale].skipQuestion}
          primary={true}
          onClick={props.handleSkip}
        />,
        <RaisedButton
          label={translations[props.locale].nextQuestion}
          primary={true}
          onClick={props.handleSubmit}
          disabled={!props.valid}
        />
      ]}
    >
      <Field
        name="amount"
        component={AmountField}
        type="number"
        validate={required}
        autoFocus
      />
      <Field name="date" component='input' type="hidden" validate={required} />
      <Field name="direction" component='input' type="hidden" validate={required} />
      <Field name="frequency" component='input' type="hidden" validate={required} />
    </Dialog>
  )

  const mapStateToProps = (state) => {
    return {
      configuration: state.configuration,
      initialValues: {
        amount: null,
        ...options.initialValues
      },
      currency: state.configuration.currency,
      locale: state.configuration.locale,
      form: options.form
    }
  }

  const mapDispatchToProps = (dispatch, props) => {
    return {
      handleSkip: () => {
        dispatch(updateConfiguration({ onboarding: options.next }));
      },
      onSubmit: (variation) => {
        dispatch(addVariation(variation));
        dispatch(updateConfiguration({ onboarding: options.next }));
      }
    }
  }

  return (connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: options.form })(OnboardingForm)));
}

export default OnboardingFormBuilder;
