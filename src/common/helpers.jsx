export function setDefaultValue(val, defVal = null) {
  if (typeof val === 'undefined') {
    return defVal;
  }
  return val;
}
