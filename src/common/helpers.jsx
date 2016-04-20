export function setDefaultValue(val, defVal = null) {
  if (typeof val === 'undefined') {
    return defVal;
  }
  return val;
}


export function removeFromArray(arr, value) {
  return arr.filter(el => el !== value);
}


export function isAnySelected(arr) {
  return arr.some(el => el.selected);
}


export function debounce(func, delay) {
  // func should provide their own `this` context.
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
