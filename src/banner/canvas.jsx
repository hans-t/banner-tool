export default class Canvas {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');

    this.clear = this.clear.bind(this);
    this.toDataURI = this.toDataURI.bind(this);
    this.addImage = this.addImage.bind(this);
    this.addText = this.addText.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
    this.colorBackground = this.colorBackground.bind(this);
    this.drawBorder = this.drawBorder.bind(this);
  }

  clear() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  drawBorder(color) {
    const { width, height } = this.canvas;
    this.ctx.fillStyle = color || '#FFFFFF';
    this.ctx.strokeRect(0, 0, width, height);
  }

  toDataURI(...args) {
    this.drawBorder();
    return this.canvas.toDataURL(...args);
  }

  addImage(dataURI, ...args) {
    const image = new Image;
    image.src = dataURI;
    this.ctx.drawImage(image, ...args);
  }

  colorBackground(color) {
    const { width, height } = this.canvas;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, width, height);
  }

  renderPreview(canvas, dx, dy, dWidth, dHeight) {
    // canvas is a Canvas instance.
    this.clear();
    this.addImage(canvas.toDataURI(), dx, dy, dWidth, dHeight);
  }

  addText() {}

  drawBackground(dataURI) {
    this.addImage(dataURI, 0, 0);
  }
}
