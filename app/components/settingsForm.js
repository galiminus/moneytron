import React from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';

import currencyToSymbolMap from 'currency-symbol-map/map';

import AppBar from "./appbar";

import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateConfiguration } from '../actions/configuration';
import { defaultMonthsSelection, numberOfMonthsToText } from "../utils/dates";
import ResponsiveSelect from "./responsiveSelect";
import { setMessage } from "../actions/message";
import translations from "../translations";

const required = value => (value ? undefined : 'This field is required.')

class SettingsForm extends React.Component {
  render() {
    return (
      <div>
        <AppBar
          onLeftIconButtonClick={this.props.history.goBack}
          iconElementLeft={<IconButton><BackIcon /></IconButton>}
          iconElementRight={<FlatButton label={translations[this.props.locale].save} onClick={this.props.handleSubmit} disabled={!this.props.valid} />}
        />
        <div style={{ padding: "64px 1em 0 1em" }}>
          <ResponsiveSelect
            name="currency"
            validate={[required]}
            label={translations[this.props.locale].currency}
          >
            {Object.keys(currencyToSymbolMap).map((currency) =>
              <option value={currency} key={currency}>
                {currency}
              </option>
            )}
          </ResponsiveSelect>
          <ResponsiveSelect
            name="locale"
            validate={[required]}
            label={translations[this.props.locale].language}
          >
            {Object.keys(translations).map((locale) =>
              <option value={locale} key={locale}>
                {translations[locale].name}
              </option>
            )}
          </ResponsiveSelect>
        </div>
      </div>
    );
  }
}

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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: "settings" })(SettingsForm));
