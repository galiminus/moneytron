import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';

import UUID from 'uuid-js';

import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addVariation } from '../actions/variations';
import { defaultMonthsSelection, numberOfMonthsToText } from "../utils/dates";
import AppBar from "./appbar";
import ResponsiveSelect from "./responsiveSelect";
import { setMessage } from "../actions/message";

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
          iconElementRight={this.props.valid ? <FlatButton label="Save" onClick={this.props.handleSubmit} /> : undefined}
        />
        <div style={{ padding: "64px 1em 0 1em" }}>
          <Field
            name="amount"
            component={AmountField}
            type="number"
            validate={[required]}
            label="Amount"
            autoFocus
          />
          <Field
            name="date"
            component={DateField}
            type="text"
            validate={[required]}
            label="Date"
          />
          <Field
            name="label"
            component={LabelField}
            type="text"
            label="Label"
            dataSource={this.props.variations.map((variation) => variation.label)}
          />
          <ResponsiveSelect
            name="direction"
            validate={[required]}
            label="Direction"
          >
            <option value={"spending"}>
              Spending
            </option>
            <option value={"earning"}>
              Earning
            </option>
          </ResponsiveSelect>
          <ResponsiveSelect
            name="frequency"
            validate={[required]}
            label="Frequency"
          >
            <option value={"one-time"}>
              One-time
            </option>
            <option value={"recurring"}>
              Recurring
            </option>
          </ResponsiveSelect>
          <ResponsiveSelect
            name="spreading"
            validate={[required]}
            label="Spreading time"
          >
            {defaultMonthsSelection().map((numberOfMonths) =>
              <option value={numberOfMonths} key={numberOfMonths}>
                {numberOfMonthsToText(numberOfMonths)}
              </option>
            )}
          </ResponsiveSelect>
          <Field name="uuid" component='input' type="hidden" validate={[required]} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: {
      uuid: UUID.create().toString(),
      amount: null,
      direction: "spending",
      frequency: "one-time",
      spreading: 1,
      date: new Date()
    },
    currency: state.configuration.currency,
    variations: state.variations
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addVariation: (variation) => { dispatch(addVariation(variation)) },
    setMessage: (variation, currency) => { dispatch(setMessage(`${new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(variation.amount)} ${variation.direction} added`)) }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSubmit: (variation) => {
      dispatchProps.addVariation(variation);
      dispatchProps.setMessage(variation, stateProps.currency);
      ownProps.history.goBack();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(reduxForm({ form: "variation" })(VariationForm));
