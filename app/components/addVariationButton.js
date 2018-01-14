import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/av/playlist-add';

const style = {
  position: "fixed",
  bottom: 16,
  right: 16
}

const AddVariationButton = (props) => {
  return (
    <FloatingActionButton
      style={style}
      {...props}
    >
      <ContentAdd />
    </FloatingActionButton>
  );
};

export default AddVariationButton;
