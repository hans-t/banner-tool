import React from 'react';
import { RaisedButton } from 'material-ui';

import { drawBorder } from '../banner/canvas';


function onClick() {
  /**
   * canvas DOM element should be given ID, same ID as combination ID.
   * Then we retrieve from store, the country, size and canvas ID.
   * Get the canvas DOM element with that ID and call toDataURL().
   *
   * Data to be sent:
   * Country, size, canvas dataURL
   */
  const canvases = document.getElementsByClassName('hidden-canvas');
  const formData = new FormData;


  Array.from(canvases).forEach(canvas => {
    const dataURL = canvas.toDataURL('image/jpeg');
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
