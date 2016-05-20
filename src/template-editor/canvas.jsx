import React from 'react';
import { CanvasTextWrapper as canvasTextWrap } from 'canvas-text-wrapper';


const styles = {
  canvas: {
    outline: '1px solid black',
    display: 'none',
  },
};


function createCanvas({ width, height }) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return { canvas, context: canvas.getContext('2d') };
}


function drawBorder(context) {
  const { width, height } = context.canvas;
  context.fillStyle = '#000000';  // eslint-disable-line no-param-reassign
  context.strokeRect(0, 0, width, height);
}


export default class Canvas {
  constructor() {
    this.attachRef = this.attachRef.bind(this);
    this.setDimension = this.setDimension.bind(this);
    this.clear = this.clear.bind(this);
    this.loadImageBox = this.loadImageBox.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.loadLogo = this.loadLogo.bind(this);
    this.loadTemplate = this.loadTemplate.bind(this);
    this.component = (
      <canvas
        ref={this.attachRef}
        style={styles.canvas}
      />
    );
  }

  attachRef(e) {
    if (e) {
      this.element = e;
      this.context = this.element.getContext('2d');
    }
  }

  setDimension({ width, height }) {
    const { element } = this;
    element.width = this.width = width;
    element.height = this.height = height;
    element.style.display = '';
  }

  clear() {
    const { width, height, context } = this;
    context.clearRect(0, 0, width, height);
  }

  loadImageBox(imageBoxes = []) {
    const { context } = this;
    context.fillStyle = '#000000';
    context.lineWidth = 1;
    imageBoxes.forEach(imageBox => {
      context.strokeRect(
        imageBox.boxX,
        imageBox.boxY,
        imageBox.boxWidth,
        imageBox.boxHeight
      );
    });
  }

  loadImage(src, { dx, dy, dWidth, dHeight }) {
    const image = new Image;
    image.src = src;
    image.onload = () => {
      this.context.drawImage(image, dx, dy, dWidth, dHeight);
    };
  }

  loadLogo(logo) {
    const { name, ...args } = logo;
    if (name) {
      const src = `static/logo/${name}`;
      this.loadImage(src, args);
    }
  }

  loadCTA(cta) {
    const args = cta;
    if (args) {
      const { width, height } = this;
      const src = `static/cta/${width}x${height}/SG.jpg`;
      this.loadImage(src, args);
    }
  }

  loadTexts(texts) {
    const opts = {
      textAlign: 'center',
      lineBreak: 'auto',
      verticalAlign: 'middle',
      sizeToFill: true,
    };

    Object.keys(texts).forEach(type => {
      const { font, fillStyle, boxWidth, boxHeight, dx, dy, text } = texts[type];
      const { canvas, context } = createCanvas({ width: boxWidth, height: boxHeight });
      context.fillStyle = fillStyle;
      canvasTextWrap(canvas, text || type, { ...opts, font });
      drawBorder(context);
      this.context.drawImage(canvas, dx, dy);
    });
  }

  loadTemplate(template) {
    if (template.id) {
      this.clear();
      this.loadImageBox(template.imageBoxes);
      this.loadLogo(template.props.logo);
      this.loadCTA(template.props.cta);
      this.loadTexts(template.texts);
    }
  }
}
