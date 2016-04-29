import React from 'react';
import { generate as generateId } from 'shortid';
import { connect } from 'react-redux';
import { combination } from 'js-combinatorics';


const textsKeys = ['headline', 'title', 'copy1', 'copy2', 'copy3'];


function isImagesReady(images) {
  return images.every(el => el !== '');
}


function isArrayEqual(arr1, arr2) {
  return arr1.every((el, idx) => el === arr2[idx]);
}


function cloneInsideObjects(obj, keys) {
  const clonedObj = {};
  keys.forEach(key => {
    if (key in obj) {
      clonedObj[key] = { ...obj[key] };
    }
  });
  return clonedObj;
}


function getCombinations(templates, images) {
  // first get combination of images first.
  const imageSetsById = {};
  const bannerIds = [];
  const propsById = [];
  const textsById = [];

  templates.forEach(template => {
    const combinedImages = combination(images, template.images.length);
    for (const image of combinedImages) {
      const id = generateId();
      const imageSets = template.images.map(imageObj => ({
        ...imageObj,
        dataURI: image,
      }));

      bannerIds.push({ id, selected: false });
      imageSetsById[id] = imageSets;
      propsById[id] = template.props;
      textsById[id] = cloneInsideObjects(template.texts, textsKeys);
    }
  });
  return { bannerIds, imageSetsById, propsById, textsById };
}


function getSelectedTemplates(templates) {
  return Object.keys(templates)
    .map(name => templates[name])
    .filter(template => template.selected);
}


// TODO: rename updateCombinations, 'ADD_BANNER_IDS' action.


class Bridge extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {
      bannerIds,
      templates,
      images,
      removeBannerIds,
      updateCombinations,
    } = nextProps;

    // When images change and have non-empty dataURIs.
    if (!isArrayEqual(images, this.props.images) && isImagesReady(images)) {
      removeBannerIds(bannerIds);
      const combinations = getCombinations(templates, images);
      updateCombinations(combinations);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <span style={this.props.style} />;
  }
}

Bridge.propTypes = {
  currentCountry: React.PropTypes.string.isRequired,
  images: React.PropTypes.array.isRequired,
  templates: React.PropTypes.array.isRequired,
  updateCombinations: React.PropTypes.func.isRequired,
  removeBannerIds: React.PropTypes.func.isRequired,
  style: React.PropTypes.object,
};

Bridge.defaultProps = {
  style: {},
};


function mapStateToProps(state, ownProps) {
  const { currentCountry } = ownProps;
  return {
    images: state.imagesByCountry[currentCountry],
    bannerIds: state.bannerIdsByCountry[currentCountry],
    templates: getSelectedTemplates(state.templates),
  };
}


function mapDispatchToProps(dispatch, ownProps) {
  const country = ownProps.currentCountry;
  return {
    updateCombinations: (combinations) => dispatch({
      type: 'ADD_BANNER_IDS',
      country,
      ...combinations,
    }),
    removeBannerIds: ids => ids.length > 0 && dispatch({
      type: 'REMOVE_BANNER_IDS',
      country,
      ids,
    }),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Bridge);
