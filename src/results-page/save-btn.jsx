import React from 'react';
import { RaisedButton } from 'material-ui';

import { drawBorder } from '../banner/canvas';


function onClick() {
  const canvases = document.getElementsByClassName('hidden-canvas');
  Array.from(canvases).forEach(canvas => {
    const dataURL = canvas.toDataURL('image/jpeg');
    // should POST to backend
    console.log(dataURL);
  });
}


const SaveBtn = () => (
  <RaisedButton
    primary
    onClick={onClick}
    label="Download Selected Banners"
  />
);


export default SaveBtn;
