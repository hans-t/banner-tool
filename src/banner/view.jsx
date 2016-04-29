import React from 'react';
import { connect } from 'react-redux';

import Canvas from './canvas';


function drawOnCanvas(canvas, props) {
  const { images } = props;

  images.forEach(({ dataURI, dx, dy, dWidth, dHeight }) => (
    canvas.addImage(dataURI, dx, dy, dWidth, dHeight)
  ));
}


function fitImageInsideBox(width, height, boxWidth, boxHeight) {
  let dimension;
  if (width > height) {
    const resizedHeight = boxWidth / width * height;
    dimension = {
      dx: 0,
      dy: (boxHeight - resizedHeight) / 2,
      dWidth: boxWidth,
      dHeight: resizedHeight,
    };
  } else {
    const resizedWidth = boxHeight / height * width;
    dimension = {
      dx: (boxWidth - resizedWidth) / 2,
      dy: 0,
      dWidth: resizedWidth,
      dHeight: boxHeight,
    };
  }
  return dimension;
}


function computePreviewDimension(width, height) {
  return {
    previewWidth: width / 2,
    previewHeight: height / 2,
  };
}


class BannerView extends React.Component {
  constructor(props) {
    super(props);
    const { width, height } = props.properties;
    const { previewWidth, previewHeight } = computePreviewDimension(width, height);
    const { dx, dy, dWidth, dHeight } = fitImageInsideBox(
      width,
      height,
      previewWidth,
      previewHeight
    );
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
    drawOnCanvas(this.canvas, this.props);
  }

  render() {
    const dataURI = this
      .previewCanvas
      .renderPreview(this.canvas, this.dx, this.dy, this.dWidth, this.dHeight);
    return <img src={dataURI} role="presentation" style={this.style}></img>;
  }
}

BannerView.propTypes = {
  id: React.PropTypes.string,
  properties: React.PropTypes.object,
  images: React.PropTypes.array,
  currentPage: React.PropTypes.string,
};


export default connect(
  (state, ownProps) => {
    const id = ownProps.id;
    const { page, propsById, imagesById } = state;
    return {
      properties: propsById[id],
      images: imagesById[id],
      currentPage: page.value,
    };
  }
)(BannerView);
