import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Icon from "../icon.png";
import { deepPurple900 } from 'material-ui/styles/colors';
import { deepPurple100 } from 'material-ui/styles/colors';

import translations from "../translations";

const Onboarding = (props) => (
  <div
    style={{
      textAlign: "center",
      fontFamily: "Roboto, sans-serif",
      background: deepPurple900,
      height: "100vh",
      padding: "0 1em"
    }}
  >
    <img
      style={{
        margin: "5vh 0",
        height: 128
      }}
      src={Icon}
    />
    <div
      style={{
        padding: "1em",
        color: "white",
        fontSize: "1.2em"
      }}
    >
      <p>
        {translations[props.locale].welcome}
      </p>
      <p>
        {translations[props.locale].askQuestions}
      </p>
      <FlatButton
        label={translations[props.locale].startOnboarding}
        backgroundColor={deepPurple100}
      />
    </div>
  </div>
)

function mapStateToProps(state, props) {
  return ({
    locale: state.configuration.locale
  });
}

export default connect(mapStateToProps)(Onboarding);
