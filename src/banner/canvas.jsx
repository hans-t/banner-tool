import { CanvasTextWrapper } from 'canvas-text-wrapper';


export default class Canvas {
  constructor(width, height) {
    this.element = document.createElement('canvas');
    this.element.width = this.width = width;
    this.element.height = this.height = height;
    this.textWrapperOpts = {
      textAlign: 'center',
      lineBreak: 'auto',
      verticalAlign: 'middle',
      sizeToFill: true,
    };

    this.ctx = this.element.getContext('2d');
    this.drawBorder = this.drawBorder.bind(this);
    this.toDataURI = this.toDataURI.bind(this);
    this.addImage = this.addImage.bind(this);
    this.colorBackground = this.colorBackground.bind(this);
    this.addText = this.addText.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
  }

  drawBorder(color) {
    const { width, height } = this;
    this.ctx.fillStyle = color || '#FFFFFF';
    this.ctx.strokeRect(0, 0, width, height);
  }

  toDataURI(...args) {
    this.drawBorder();
    return this.element.toDataURL(...args);
  }

  /**
   * image needs to be a <canvas/>, <img>, or <video>
   */
  addImage(image, ...args) {
    this.ctx.drawImage(image, ...args);
  }

  colorBackground(color) {
    const { width, height } = this;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, width, height);
  }

  addText({ dx, dy, boxWidth, boxHeight, text, fillStyle, fontFamily }) {
    const opts = { ...this.textWrapperOpts, font: fontFamily };
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

  drawBackground(image) {
    this.addImage(image, 0, 0);
  }
}
