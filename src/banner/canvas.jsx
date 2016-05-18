import React from 'react';
import { CanvasTextWrapper } from 'canvas-text-wrapper';


const textWrapperOpts = {
  textAlign: 'center',
  lineBreak: 'auto',
  verticalAlign: 'middle',
  sizeToFill: true,
};


export default class Canvas {
  constructor(id, width, height) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.component = (
      <canvas
        id={id}
        width={width}
        height={height}
        ref={e => this.element = e}  // eslint-disable-line no-return-assign
        style={{ display: 'none' }}
      />
    );

    this.getContext = this.getContext.bind(this);
    this.addImage = this.addImage.bind(this);
    this.addText = this.addText.bind(this);
    this.addCTA = this.addCTA.bind(this);
    this.addLogo = this.addLogo.bind(this);
    this.colorBackground = this.colorBackground.bind(this);
  }

  /**
   * Need this because this.element will not be initialized until this.component is mounted.
   */
  getContext() {
    return this.element.getContext('2d');
  }

  drawBorder(color) {
    const { width, height } = this;
    const context = this.element.getContext('2d');
    context.fillStyle = color || '#FFFFFF';
    context.strokeRect(0, 0, width, height);
  }

  /**
   * image needs to be a <canvas/>, <img>, or <video>
   */
  addImage(image, ...args) {
    this.getContext().drawImage(image, ...args);
  }

  addText({ dx, dy, boxWidth, boxHeight, text, fillStyle, fontFamily }) {
    const opts = { ...textWrapperOpts, font: fontFamily };
    const textCanvas = document.createElement('canvas');
    const context = textCanvas.getContext('2d');
    textCanvas.width = boxWidth;
    textCanvas.height = boxHeight;
    context.fillStyle = fillStyle;
    CanvasTextWrapper(textCanvas, text, opts);  // eslint-disable-line new-cap
    this.addImage(textCanvas, dx, dy);
  }

  // TODO: refactor addCTA and addLogo
  addCTA({ country, width, height, onImageLoad, cta }) {
    if (Object.keys(cta).length > 0) {
      const { dx, dy, dWidth, dHeight } = cta;
      const src = `static/cta/${width}x${height}/${country}.jpg`;
      const image = new Image;
      image.src = src;
      image.onload = () => {
        this.addImage(image, dx, dy, dWidth, dHeight);
        onImageLoad();
      };
    }
  }

  addLogo({ onImageLoad, logo }) {
    if (Object.keys(logo).length > 0) {
      const { dx, dy, dWidth, dHeight, name } = logo;
      const src = `static/logo/${name}`;
      const image = new Image;
      image.src = src;
      image.onload = () => {
        this.addImage(image, dx, dy, dWidth, dHeight);
        onImageLoad();
      };
    }
  }

  colorBackground(color) {
    const { width, height } = this;
    const context = this.getContext();
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
  }
}
