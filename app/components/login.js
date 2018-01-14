import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { firebaseConnect } from 'react-redux-firebase'

import GoogleIcon from '../assets/google_signin_icon';
import { grey50, deepPurple900 } from 'material-ui/styles/colors';

const Login = ({ firebase }) => {
  return (
    <div
      style={{
        background: deepPurple900,
        height: "100%",
        textAlign: "center",
        paddingTop: "35vh"
      }}
    >
      <p
        style={{
          fontWeight: 800,
          color: "white",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontSize: "1.5em",
          fontFamily: "Roboto, sans-serif"
        }}
      >
        MoneyTron
      </p>
      {
          <RaisedButton
            buttonStyle={{
              height: 48
            }}
            label="Sign in with Google"
            labelPosition="after"
            backgroundColor={"white"}
            icon={<GoogleIcon />}
            onClick={() => firebase.login({ provider: 'google', type: 'redirect' })}
          />
      }
    </div>
  );
};

export default firebaseConnect()(Login);
