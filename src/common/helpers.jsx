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
