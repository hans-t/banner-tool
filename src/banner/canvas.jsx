export default class Canvas {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');

    this.clear = this.clear.bind(this);
    this.toDataUrl = this.toDataURL.bind(this);
    this.addImage = this.addImage.bind(this);
    this.addText = this.addText.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
  }

  clear() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  toDataURL(...args) {
    return this.canvas.toDataURL(...args);
  }

  addImage(dataURI, x, y) {
    const image = new Image;
    image.src = dataURI;
    this.ctx.drawImage(image, x, y);
  }

  addText() {}

  drawBackground(dataURI) {
    this.addImage(dataURI, 0, 0);
  }
}
