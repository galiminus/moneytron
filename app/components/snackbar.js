import React from 'react';
import MaterialSnackbar from 'material-ui/Snackbar';

import { connect } from 'react-redux';
import { openDrawer } from "../actions/drawer";

const Snackbar = (props) => {
  return (
    props.message &&
      <MaterialSnackbar
        open={true}
        message={props.message}
        autoHideDuration={1000}
      />
  );
};

function mapStateToProps(state, props) {
  return ({
    message: state.message
  });
}

export default connect(mapStateToProps)(Snackbar);
