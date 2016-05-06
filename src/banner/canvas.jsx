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

  addImage(dataURI, ...args) {
    const image = new Image;
    image.src = dataURI;
    this.ctx.drawImage(image, ...args);
  }

  colorBackground(color) {
    const { width, height } = this;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, width, height);
  }

  addText() {}

  drawBackground(dataURI) {
    this.addImage(dataURI, 0, 0);
  }
}
