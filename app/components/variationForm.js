import React from 'react';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import DoneIcon from 'material-ui/svg-icons/action/done';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';

import { connect, dispatch } from 'react-redux';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import { addVariation } from '../actions/variations';
import AppBar from "./appbar";
import ResponsiveSelect from "./responsiveSelect";
import ResponsiveContainer from './responsiveContainer';
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

const EndField = ({ input: { onBlur, onChange, ...inputProps }, label, locale, defaultDate, meta: { touched, error }, ...custom }) => (
  <DatePicker
    floatingLabelText={label}
    { ...inputProps }
    { ...custom }
    minDate={new Date()}
    DateTimeFormat={Intl.DateTimeFormat}
    locale={locale}
    fullWidth={true}
    cancelLabel={translations[locale].cancel}
    onChange={(_, value) => {
      onChange(value)
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
      <ResponsiveContainer
        paperStyle={{
          padding: "2em",
          height: "calc(100vh - 64px - 2em)"
        }}
      >
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
              "earning": translations[props.locale].earning,
              "project": translations[props.locale].project
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
        {
          (props.direction === 'earning' || props.direction === 'spending') &&
            <ResponsiveSelect
              name="frequency"
              validate={[required]}
              label={translations[props.locale].end}
              collection={
                {
                  "one-time": translations[props.locale].oneTime,
                  "recurring": translations[props.locale].recurring
                }
              }
            />
        }
        {
          props.direction === 'project' &&
            <Field
              name="end"
              component={EndField}
              type="text"
              validate={[required]}
              label={translations[props.locale].end}
              locale={props.locale}
            />
        }
      </ResponsiveContainer>
    </div>
  </div>
)

const selector = formValueSelector('variation');

const mapStateToProps = (state) => {
  return {
    initialValues: {
      direction: "spending",
      frequency: "one-time",
      end: moment().add(2, 'month').startOf('month').toDate()
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
      ownProps.history.goBack();
    },
    onSubmit: (variation) => {
      ownProps.history.goBack();
      dispatchProps.addVariation(variation);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(reduxForm({ form: "variation", enableReinitialize: false })(VariationForm));
