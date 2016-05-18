import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';


function serializeCanvas({ id, type, encoderOptions }) {
  const canvas = document.getElementById(id);
  return canvas.toDataURL(type, encoderOptions);
}


function saveFile({ url, filename }) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
}


function onClick({ banners }) {
  /**
   * canvas DOM element should be given ID, same ID as combination ID.
   * Then we retrieve from store, the country, size and canvas ID.
   * Get the canvas DOM element with that ID and call toDataURL().
   *
   * Data to be sent:
   * Country, size, canvas dataURL
   */

  // mutate banners array
  banners.forEach(el => {
    el.datauri = serializeCanvas(el); // eslint-disable-line no-param-reassign
  });

  if (Object.keys(banners).length > 0) {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/octet-stream',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ banners }),
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
  state => {
    const { bannerIdsByCountry, propsById } = state;
    const banners = Object.keys(bannerIdsByCountry).reduce((arr, country) => {
      const selectedBanners = bannerIdsByCountry[country]
        .filter(el => el.selected)
        .map(el => {
          const id = el.id;
          const { width, height } = propsById[id];
          const size = `${width}x${height}`;
          return { id, size, country, type: 'image/jpeg', encoderOptions: 0.92 };
        });
      return arr.concat(selectedBanners);
    }, []);
    return { banners };
  },
  undefined,
  stateProps => ({
    onClick: () => onClick(stateProps),
  })
)(SaveBtn);
