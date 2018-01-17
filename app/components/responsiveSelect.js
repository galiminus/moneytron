import React from 'react';
import { Field } from 'redux-form';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const MobileField = ({ label, collection, ...others }) => (
  <div style={{
    marginTop: 14
  }}>
    {
      label &&
        <span
          style={{
            fontFamily: "Roboto, sans-serif",
            lineHeight: "22px",
            fontSize: "13px",
            color: "rgba(0, 0, 0, 0.3)"
          }}
        >
          {label}
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
      {Object.entries(collection).map(([value, label]) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </Field>
  </div>
)

const DesktopMaterialField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    fullWidth={true}
    { ...input }
    { ...custom }
  />
)

const DesktopField = ({ collection, ...others }) => (
  <Field
    type="select"
    component={DesktopMaterialField}
    {...others}
  >
    {Object.entries(collection).map(([value, label]) => (
      <MenuItem value={value} primaryText={label} />
    ))}
  </Field>
)

const ResponsiveSelect = (props) => (
  <MobileField {...props} />
)

export default ResponsiveSelect;
