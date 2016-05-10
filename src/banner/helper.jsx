export function fitImageInsideBox({ width, height, boxWidth, boxHeight, dx = 0, dy = 0 }) {
  let dimension;
  if (width > height) {
    const resizedHeight = boxWidth / width * height;
    dimension = {
      dx,
      dy: dy + (boxHeight - resizedHeight) / 2,
      dWidth: boxWidth,
      dHeight: resizedHeight,
    };
  } else {
    const resizedWidth = boxHeight / height * width;
    dimension = {
      dx: dx + (boxWidth - resizedWidth) / 2,
      dy,
      dWidth: resizedWidth,
      dHeight: boxHeight,
    };
  }
  return dimension;
}


export function computePreviewDimension(width, height) {
  let previewWidth;
  let previewHeight;

  if (width > 600 || height > 600) {
    if (width > height) {
      previewWidth = 600;
      previewHeight = previewWidth / width * height;
    } else {
      previewHeight = 600;
      previewWidth = previewHeight / height * width;
    }
  } else {
    previewWidth = width;
    previewHeight = height;
  }

  return { previewWidth, previewHeight };
}


export function isAllImagesInitialized(images) {
  return images.every(image => image.hasOwnProperty('image'));
}


export function isAllTextsInitialized(texts) {
  return Object.keys(texts)
    .every(copyType => texts[copyType] === '');
}


export function getSelectedTemplates(templates) {
  return Object.keys(templates)
    .map(name => templates[name])
    .filter(template => template.selected);
}
