import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Icon from "../icon.png";
import { deepPurple900 } from 'material-ui/styles/colors';
import { deepPurple100 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import moment from "moment";

import onboardingFormBuilder from "./onboardingFormBuilder";
import { updateConfiguration } from '../actions/configuration';

import translations from "../translations";

const Onboarding = (props) => (
  <div
    style={{
      textAlign: "center",
      fontFamily: "Roboto, sans-serif",
      background: deepPurple900,
      height: "100%"
    }}
  >
    <img
      style={{
        margin: "2vh 0",
        height: 148
      }}
      src={Icon}
    />
    <div
      style={{
        padding: "0em 2em",
        color: "white",
        fontSize: "1.2em"
      }}
    >
      <p>
        {translations[props.locale].welcomeText}
      </p>
      <RaisedButton
        label={translations[props.locale].startOnboarding}
        onClick={() => props.setOnboardingStep("incomeQuestion")}
        style={{
          marginTop: "1em"
        }}
      />
      {
        React.createElement(onboardingFormBuilder({
          form: "incomeQuestion",
          next: "spendingQuestion",
          title: translations[props.locale].incomeQuestion,
          initialValues: {
            direction: "earning",
            frequency: "recurring",
            date: moment().startOf('month'),
            label: translations[props.locale].incomeQuestionLabel
          }
        }))
      }
      {
        React.createElement(onboardingFormBuilder({
          form: "spendingQuestion",
          next: "done",
          title: translations[props.locale].spendingQuestion,
          initialValues: {
            direction: "spending",
            frequency: "one-time",
            date: moment().startOf('month'),
            label: translations[props.locale].spendingQuestionLabel
          }
        }))
      }
    </div>
  </div>
)

function mapStateToProps(state, props) {
  return ({
    locale: state.configuration.locale,
    step: state.configuration.onboarding
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    setOnboardingStep: (step) => ( dispatch(updateConfiguration({ onboarding: step })) )
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
