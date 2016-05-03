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
  return {
    previewWidth: width,
    previewHeight: height,
  };
}
