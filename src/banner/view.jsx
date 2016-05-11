import React from 'react';

import Canvas from './canvas';
import CheckCircleIcon from './checkCircleIcon';
import { fitImageInsideBox, computePreviewDimension } from './helper';


const styles = {
  container: {
    boxSizing: 'border-box',
    display: 'inline-block',
    paddingTop: 1,
    margin: '0 4px 0 0',
    position: 'relative',
  },
  content: {
    margin: 0,
    padding: 0,
    outline: '1px solid black',
  },
};


/**
 * dx, dy, dWidth, dHeight are defined in: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
 * Render preview using canvas not img.
 */


export default class BannerView extends React.Component {
  constructor(props) {
    super(props);
    const { width, height } = props.properties;
    const { previewWidth, previewHeight } = computePreviewDimension(width, height);
    this.width = width;
    this.height = height;
    this.previewWidth = previewWidth;
    this.previewHeight = previewHeight;
    this.canvas = new Canvas(width, height);
    this.drawOnCanvas = this.drawOnCanvas.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  componentWillMount() {
    this.drawOnCanvas();
  }

  componentDidMount() {
    this.renderPreview();
  }

  componentDidUpdate() {
    this.renderPreview();
  }

  onImageLoad() {
    this.forceUpdate();
  }

  drawOnCanvas() {
    const { canvas, props } = this;
    const { country, imageSets, images, properties, texts } = props;
    canvas.addCTA({ country, onImageLoad: this.onImageLoad, ...properties });
    canvas.addLogo({ country, onImageLoad: this.onImageLoad, ...properties });
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

    Object.keys(texts).forEach(key => {
      canvas.addText(texts[key]);
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
    const { onClick, selected } = this.props;
    return (
      <div style={styles.container} onClick={onClick}>
        <CheckCircleIcon selected={selected} />
        <canvas
          width={this.previewWidth}
          height={this.previewHeight}
          ref={e => this.previewCanvas = e} // eslint-disable-line no-return-assign
          style={styles.content}
        />
      </div>
    );
  }
}

BannerView.propTypes = {
  country: React.PropTypes.string.isRequired,
  imageSets: React.PropTypes.array.isRequired,
  images: React.PropTypes.array.isRequired,
  selected: React.PropTypes.bool.isRequired,
  properties: React.PropTypes.object.isRequired,
  texts: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
};

BannerView.defaultProps = {
  texts: {},
};
