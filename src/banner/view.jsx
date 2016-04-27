import React from 'react';
import { connect } from 'react-redux';

import Canvas from './canvas';
import { PAGE } from '../common/constants';


const previewWidth = 250;
const previewHeight = 250;


function computePreviewDimension(width, height) {
  let dimension;
  if (width > height) {
    const resizedHeight = previewWidth / width * height;
    dimension = {
      dx: 0,
      dy: (previewHeight - resizedHeight) / 2,
      dWidth: previewWidth,
      dHeight: resizedHeight,
    };
  } else {
    const resizedWidth = previewHeight / height * width;
    dimension = {
      dx: (previewWidth - resizedWidth) / 2,
      dy: 0,
      dWidth: resizedWidth,
      dHeight: previewHeight,
    };
  }
  return dimension;
}


class BannerView extends React.Component {
  // work on rendering images specified in imagesById
  constructor(props) {
    super(props);
    const { width, height } = props.properties;
    const { dx, dy, dWidth, dHeight } = computePreviewDimension(width, height);
    this.dx = dx;
    this.dy = dy;
    this.dWidth = dWidth;
    this.dHeight = dHeight;
    this.width = width;
    this.height = height;
    this.canvas = new Canvas(width, height);
    this.previewCanvas = new Canvas(previewWidth, previewHeight);
    this.style = {
      margin: '0 2px',
    };
  }

  componentWillMount() {
    // manipulate canvas before mounting
    const { properties, useDataURI, currentPage, images } = this.props;

    // if useDataURI, draw background of canvas using dataURI
    // else, draw images if at addImages page, draw images and texts if at addTexts page.
    // is there a better/smarter way of doing this?
    if (useDataURI) {
      this.canvas.drawBackground(properties.dataURI);
    }

    switch(currentPage) {
      case PAGE.addImages:
        images.forEach(({ dataURI, dx, dy, dWidth, dHeight }) => (
          this.canvas.addImage(dataURI, dx, dy, dWidth, dHeight)
        ));
    }
  }

  componentWillUnmount() {
    const dataURI = this.canvas.toDataURI();
    this.props.setCanvasDataURI(dataURI);
  }

  render() {
    this.previewCanvas.renderPreview(this.canvas, this.dx, this.dy, this.dWidth, this.dHeight);
    const dataURI = this.previewCanvas.toDataURI();
    return <img src={dataURI} role="presentation" style={this.style}></img>;
  }
}

BannerView.propTypes = {
  id: React.PropTypes.string,
  properties: React.PropTypes.object,
  images: React.PropTypes.array,
  useDataURI: React.PropTypes.bool,
  setCanvasDataURI: React.PropTypes.func,
};


export default connect(
  (state, ownProps) => {
    const id = ownProps.id;
    const { page, propsById, imagesById } = state;
    return {
      properties: propsById[id],
      images: imagesById[id],
      currentPage: page.value,
      useDataURI: page.isNextPage,
    };
  },
  dispatch => ({
    setCanvasDataURI: dataURI => (
      dispatch({
        type: 'SET_BANNER_DATA_URI',
        dataURI,
      })
    ),
  })
)(BannerView);
