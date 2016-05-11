export default class Canvas {
  constructor(width, height) {
    this.element = document.createElement('canvas');
    this.element.width = this.width = width;
    this.element.height = this.height = height;
    this.ctx = this.element.getContext('2d');

    this.clear = this.clear.bind(this);
    this.drawBorder = this.drawBorder.bind(this);
    this.toDataURI = this.toDataURI.bind(this);
    this.addImage = this.addImage.bind(this);
    this.colorBackground = this.colorBackground.bind(this);
    this.addText = this.addText.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
  }

  clear() {
    const { width, height } = this;
    this.ctx.clearRect(0, 0, width, height);
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

  addText({
    text,
    x,
    y,
    fontFamily,
    fontSize,
    textBaseline,
    textAlign,
    fillStyle,
  }) {
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = textBaseline;
    this.ctx.font = `${fontSize}px ${fontFamily}`;
    this.ctx.fillStyle = fillStyle;
    this.ctx.fillText(text, x, y);
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
