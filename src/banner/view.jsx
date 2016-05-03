import React from 'react';
import { connect } from 'react-redux';

import Canvas from './canvas';
import {
  fitImageInsideBox,
  computePreviewDimension,
} from './helper';


function drawOnCanvas(canvas, props) {
  const { imageSets } = props;
  imageSets.forEach(({ dataURI, width, height, boxX, boxY, boxWidth, boxHeight }) => {
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
  imageSets: React.PropTypes.array,
  currentPage: React.PropTypes.string,
};


export default connect(
  (state, ownProps) => {
    const id = ownProps.id;
    const { page, propsById, imageSetsById } = state;
    return {
      properties: propsById[id],
      imageSets: imageSetsById[id],
      currentPage: page.value,
    };
  }
)(BannerView);
