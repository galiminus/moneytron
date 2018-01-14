import React from 'react';
import { deepPurple900 } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = ({ firebase }) => {
  return (
    <div
      style={{
        background: deepPurple900,
        height: "100%",
        textAlign: "center",
        paddingTop: "35vh"
      }}
    >
      <CircularProgress size={100} thickness={7} color="white" />
    </div>
  );
};

export default Loading;
