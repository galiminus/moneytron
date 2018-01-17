import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/av/playlist-add';

const AddVariationButton = (props) => {
  return (
    <FloatingActionButton
      style={{
        position: "fixed",
        bottom: 16,
        right: 16
      }}
      {...props}
    >
      <ContentAdd />
    </FloatingActionButton>
  );
};

export default AddVariationButton;
