import React from 'react';
import IconButton from 'material-ui/IconButton';
import DoneIcon from 'material-ui/svg-icons/action/done';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import LanguageIcon from 'material-ui/svg-icons/action/language';
import Checkbox from 'material-ui/Checkbox';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { red900 } from 'material-ui/styles/colors';

import currencyToSymbolMap from 'currency-symbol-map/map';

import AppBar from "./appbar";

import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateConfiguration } from '../actions/configuration';
import { resetVariations } from '../actions/variations';
import { defaultMonthsSelection, numberOfMonthsToText } from "../utils/dates";
import ResponsiveSelect from "./responsiveSelect";
import ResponsiveContainer from './responsiveContainer';
import translations from "../translations";

const required = value => (value ? undefined : 'This field is required.')

const Toggle = ({ input: { onChange, value, ...inputProps }, label, locale, meta: { touched, error }, ...custom }) => (
  <Checkbox
    labelPosition="left"
    label={label}
    {...custom}
    checked={value ? true : false}
    onCheck={(event, isInputChecked) => onChange(isInputChecked)}
    style={{
      marginTop: 32
    }}
  />
)

const SettingsForm = (props) => (
  <div>
    <AppBar
      title={translations[props.locale].settings}
      onLeftIconButtonClick={props.history.goBack}
      iconElementLeft={<IconButton><BackIcon /></IconButton>}
      iconElementRight={<IconButton onClick={props.handleSubmit}><DoneIcon /></IconButton>}
    />
    <div style={{ padding: "0 1em", paddingTop: 64 }}>
      <ResponsiveContainer
        paperStyle={{
          padding: "2em",
          height: "calc(100vh - 64px - 2em)"
        }}
      >
        <ResponsiveSelect
          name="currency"
          validate={[required]}
          label={translations[props.locale].currency}
          collection={
            Object.keys(currencyToSymbolMap).reduce((collection, currency) => (
              { ...collection, [currency]: currency }
            ), {})
          }
        />
        <ResponsiveSelect
          name="locale"
          validate={[required]}
          label={translations[props.locale].language}
          collection={
            Object.keys(translations).reduce((collection, locale) => (
              { ...collection, [locale]: translations[locale].name }
            ), {})}
        />
        <Field
          name="groupByCategory"
          component={Toggle}
          label={translations[props.locale].groupByCategory}
        />
        <Divider
          style={{
            marginTop: "2em"
          }}
        />
        <RaisedButton
          style={{
            marginTop: "2em"
          }}
          fullWidth={true}
          backgroundColor={red900}
          labelColor="white"
          label={translations[props.locale].resetAll}
          onClick={props.resetVariations}
        />
      </ResponsiveContainer>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    initialValues: state.configuration,
    locale: state.configuration.locale
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (values) => {
      props.history.goBack();
      dispatch(updateConfiguration(values));
    },
    resetVariations: () => {
      dispatch(resetVariations());
      props.history.goBack();
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    resetVariations: () => {
      if (confirm(translations[stateProps.locale].confirmReset)) {
        dispatchProps.resetVariations();
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(reduxForm({ form: "settings" })(SettingsForm));
