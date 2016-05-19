import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';


function saveFile({ url, filename }) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
}


function onClick({ bannersById }) {
  if (Object.keys(bannersById).length > 0) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/octet-stream',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bannersById }),
    };

    fetch('/api/zip', init)
      .then(response => response.json())
      .then(response => saveFile(response));
  }
}


const SaveBtn = props => (
  <RaisedButton
    primary
    onClick={props.onClick}
    label="Download Selected Banners"
  />
);


SaveBtn.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};


export default connect(
  ({ bannersById }) => ({ bannersById }),
  undefined,
  stateProps => ({
    onClick: () => onClick(stateProps),
  })
)(SaveBtn);
