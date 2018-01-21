import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';

const AppBar = (props) => (
  <MaterialAppBar
    style={{ position: "fixed", top: 0, width: "100%" }}
    {...props}
  />
)

export default AppBar;
