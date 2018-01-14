import React from 'react';
import { Field } from 'redux-form';

const ResponsiveSelect = (props) => {
  const { label, ...others } = props;
  return (
    <div style={{
      marginTop: 14
    }}>
      {
        props.label &&
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              lineHeight: "22px",
              fontSize: "13px",
              color: "rgba(0, 0, 0, 0.3)"
            }}
          >
            {props.label}
          </span>
      }
      <Field
        style={{
          width: "100%",
          background: "white",
          border: "none",
          height: 32,
          lineHeight: "32px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.13)",
          fontSize: "1em"
        }}
        type="select"
        component="select"
        {...others}
      >
        {props.children}
      </Field>
    </div>
  );
};

export default ResponsiveSelect;
