import React from 'react';
import { connect } from 'react-redux';

import Canvas from './canvas';
import {
  fitImageInsideBox,
  computePreviewDimension,
} from './helper';


/**
 * dx, dy, dWidth, dHeight are defined in: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
 * Render preview using canvas not img.
 */


class BannerView extends React.Component {
  constructor(props) {
    super(props);
    const { width, height } = props.properties;
    const { previewWidth, previewHeight } = computePreviewDimension(width, height);
    this.width = width;
    this.height = height;
    this.previewWidth = previewWidth;
    this.previewHeight = previewHeight;
    this.canvas = new Canvas(width, height);
    this.styles = {
      container: {
        boxSizing: 'border-box',
        display: 'inline-block',
        padding: '1px 0 0 1px',
        margin: '0 4px 0 0',
      },
      content: {
        margin: 0,
        padding: 0,
        outline: '1px solid black',
      },
    };

    this.drawOnCanvas = this.drawOnCanvas.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  }

  componentWillMount() {
    this.drawOnCanvas();
  }

  componentDidMount() {
    this.renderPreview();
  }

  drawOnCanvas() {
    const { canvas, props } = this;
    const { imageSets, images, properties } = props;
    canvas.colorBackground(properties.backgroundColor);
    imageSets.forEach(({ index, boxX, boxY, boxWidth, boxHeight }) => {
      const { width, height, image } = images[index];
      const { dx, dy, dWidth, dHeight } = fitImageInsideBox({
        width,
        height,
        boxWidth,
        boxHeight,
        dx: boxX,
        dy: boxY,
      });
      canvas.addImage(image, dx, dy, dWidth, dHeight);
    });
  }

  renderPreview() {
    const { width, height, previewWidth, previewHeight } = this;
    const { dx, dy, dWidth, dHeight } = fitImageInsideBox({
      width,
      height,
      boxWidth: previewWidth,
      boxHeight: previewHeight,
    });
    this.previewCtx = this.previewCanvas.getContext('2d');
    this.previewCtx.drawImage(this.canvas.element, dx, dy, dWidth, dHeight);
  }

  render() {
    return (
      <div style={this.styles.container}>
        <canvas
          width={this.previewWidth}
          height={this.previewHeight}
          ref={e => this.previewCanvas = e} // eslint-disable-line no-return-assign
          style={this.styles.content}
        />
      </div>
    );
  }
}

BannerView.propTypes = {
  properties: React.PropTypes.object,
  imageSets: React.PropTypes.array,
  images: React.PropTypes.array,
};


export default connect(
  (state, ownProps) => ({ imageSets: state.imageSetsById[ownProps.id] })
)(BannerView);
