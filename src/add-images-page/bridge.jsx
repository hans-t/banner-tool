import React from 'react';
import { connect } from 'react-redux';
import { combination } from 'js-combinatorics';


function isImagesReady(images) {
  return images.every(el => el !== '');
}


function getImageCombinations(templates, images) {
  console.log('Getting image combinations...failed....')
  // const combinationsByTemplates = templates.map(template => {
  //   const imageCombinations = combination(images, template.images.length);
  // });
  // return combinationsByTemplates
}


function getSelectedTemplates(templates) {
  return Object.keys(templates)
    .map(name => templates[name])
    .filter(template => template.selected);
}


class Bridge extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {
      style,
      bannerIds,
      templates,
      images,
      removeBannerIds,
    } = nextProps;

    if (isImagesReady(images)) {
      removeBannerIds(bannerIds);
      console.log('Delete old bannerIds');
      // somehow get these 4 things:
      // addBannerIds(newBannerIds, imageCombinations, props, texts)
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
  addBannerIds: React.PropTypes.func.isRequired,
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
  return {
    addBannerIds: (bannerIds, imageCombinations, props, texts) => dispatch({
      type: 'ADD_BANNER_IDS',
      bannerIds,
      imageCombinations,
      props,
      texts,
    }),
    removeBannerIds: ids => ids.length > 0 && dispatch({
      type: 'REMOVE_BANNER_IDS',
      ids,
    })
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Bridge);
