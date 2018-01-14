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

const required = value => (value ? undefined : 'This field is required.')

class SettingsForm extends React.Component {
  render() {
    return (
      <div>
        <AppBar
          onLeftIconButtonClick={this.props.history.goBack}
          iconElementLeft={<IconButton><BackIcon /></IconButton>}
          iconElementRight={<FlatButton label="Save" onClick={this.props.handleSubmit} disabled={!this.props.valid} />}
        />
        <div style={{ padding: "64px 1em 0 1em" }}>
          <ResponsiveSelect
            name="currency"
            validate={[required]}
            label="Currency"
          >
            {Object.keys(currencyToSymbolMap).map((currency) =>
              <option value={currency} key={currency}>
                {currency}
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
    initialValues: state.configuration
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (values) => {
      dispatch(updateConfiguration(values));
      dispatch(setMessage("Settings updated"));
      props.history.goBack();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: "settings" })(SettingsForm));
