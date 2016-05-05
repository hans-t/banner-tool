import { SELECT_COUNTRIES } from '../index-page/actions';


export function setDefaultValue(val, defVal = null) {
  if (typeof val === 'undefined') {
    return defVal;
  }
  return val;
}


export function removeFromArray(arr, index) {
  return arr
    .slice(0, index)
    .concat(arr.slice(index + 1));
}


export function addToArray(arr, value) {
  return arr.concat(value);
}


export function replaceValueInArray(arr, index, value) {
  return arr
    .slice(0, index)
    .concat(value)
    .concat(arr.slice(index + 1));
}


export function isAnySelected(arr) {
  return arr.some(el => el.selected);
}


export function debounce(func, delay = 500) {
  // func should provide their own `this` context.
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}


export function omitKeys(obj, omitted) {
  const newObj = { ...obj };
  omitted.forEach(key => {
    delete newObj[key];
  });
  return newObj;
}


export function groupReducerByCountry(reducer, initialStateFactory = () => []) {
  return (state = {}, action) => {
    if (action.type === SELECT_COUNTRIES) {
      return action.countries
        .filter(obj => obj.selected)
        .reduce((obj, elm) => ({
          ...obj,
          [elm.value]: initialStateFactory(),
        }), {});
    } else if (action.country) {
      const { country } = action;
      return {
        ...state,
        [country]: reducer(state[country], action),
      };
    } else {
      return state;
    }
  };
}


export function bindCountryToDispatchProps(dispatchProps, country) {
  return Object.keys(dispatchProps).reduce((obj, key) => {
    const dispatcher = dispatchProps[key];
    /* eslint-disable no-param-reassign */
    obj[key] = (...args) => dispatcher(country, ...args);
    /* eslint-enable no-param-reassign */
    return obj;
  }, {});
}
