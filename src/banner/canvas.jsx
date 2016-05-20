import { CanvasTextWrapper } from 'canvas-text-wrapper';


const textWrapperOpts = {
  textAlign: 'center',
  lineBreak: 'auto',
  verticalAlign: 'middle',
  sizeToFill: true,
};


export default class Canvas {
  constructor(width, height) {
    const { canvas, context } = this.createElement({ width, height });
    this.width = width;
    this.height = height;
    this.element = canvas;
    this.context = context;
    this.drawBorder = this.drawBorder.bind(this);
    this.addImage = this.addImage.bind(this);
    this.addText = this.addText.bind(this);
    this.addCTA = this.addCTA.bind(this);
    this.addLogo = this.addLogo.bind(this);
    this.colorBackground = this.colorBackground.bind(this);
  }

  createElement({ width, height }) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return { canvas, context: canvas.getContext('2d') };
  }

  /**
   * Odd linewidth:
   * http://stackoverflow.com/questions/7530593/html5-canvas-and-line-width
   */
  drawBorder(color) {
    const { width, height, context } = this;
    context.fillStyle = color || '#FFFFFF';
    context.lineWidth = 1;
    const adjustedHeight = height % 2 ? height - 1 : height;
    const adjustedWidth = width % 2 ? width - 1 : width;
    context.strokeRect(0, 0, adjustedWidth, adjustedHeight);
  }

  /**
   * image needs to be a <canvas/>, <img>, or <video>
   */
  addImage(image, ...args) {
    this.context.drawImage(image, ...args);
  }

  addText({ dx, dy, boxWidth, boxHeight, text, fillStyle, font }) {
    const opts = { ...textWrapperOpts, font };
    const { canvas, context } = this.createElement({
      width: boxWidth,
      height: boxHeight,
    });
    context.fillStyle = fillStyle;
    CanvasTextWrapper(canvas, text, opts);  // eslint-disable-line new-cap
    this.addImage(canvas, dx, dy);
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
    const { width, height, context } = this;
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
  }
}
