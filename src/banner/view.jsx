import React from 'react';
import { connect } from 'react-redux';

import Canvas from './canvas';
import {
  fitImageInsideBox,
  computePreviewDimension,
} from './helper';


/**
 dx, dy, dWidth, dHeight are defined in: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
 */
function drawOnCanvas(canvas, props) {
  const { imageSets, images, properties } = props;
  canvas.colorBackground(properties.backgroundColor);
  imageSets.forEach(({ index, boxX, boxY, boxWidth, boxHeight }) => {
    const { width, height, dataURI } = images[index];
    const { dx, dy, dWidth, dHeight } = fitImageInsideBox({
      width,
      height,
      boxWidth,
      boxHeight,
      dx: boxX,
      dy: boxY,
    });
    canvas.addImage(dataURI, dx, dy, dWidth, dHeight);
  });
}


class BannerView extends React.Component {
  constructor(props) {
    super(props);
    const { width, height } = props.properties;
    const { previewWidth, previewHeight } = computePreviewDimension(width, height);
    const { dx, dy, dWidth, dHeight } = fitImageInsideBox({
      width,
      height,
      boxWidth: previewWidth,
      boxHeight: previewHeight,
    });
    this.dx = dx;
    this.dy = dy;
    this.dWidth = dWidth;
    this.dHeight = dHeight;
    this.width = width;
    this.height = height;
    this.canvas = new Canvas(width, height);
    this.previewCanvas = new Canvas(previewWidth, previewHeight);
    this.styles = {
      container: {
        boxSizing: 'border-box',
        display: 'inline-block',
        padding: 0,
        margin: '0 4px 0 0',
      },
      content: {
        margin: 0,
        padding: 0,
      },
    };
  }

  componentWillMount() {
    drawOnCanvas(this.canvas, this.props);
  }

  render() {
    const dataURI = this
      .previewCanvas
      .renderPreview(this.canvas, this.dx, this.dy, this.dWidth, this.dHeight);
    return (
      <div style={this.styles.container}>
        <img src={dataURI} role="presentation" style={this.styles.content}></img>
      </div>
    );
  }
}

BannerView.propTypes = {
  id: React.PropTypes.string.isRequired,
  currentCountry: React.PropTypes.string.isRequired,
  properties: React.PropTypes.object,
  imageSets: React.PropTypes.array,
};


export default connect(
  (state, ownProps) => {
    const { id, currentCountry } = ownProps;
    const { propsById, imageSetsById, imagesByCountry } = state;
    return {
      properties: propsById[id],
      imageSets: imageSetsById[id],
      images: imagesByCountry[currentCountry],
    };
  }
)(BannerView);
