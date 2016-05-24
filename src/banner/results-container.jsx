import React from 'react';
import { connect } from 'react-redux';

import Results from './results';
import { toggleBannerSelection } from '../banner/actionCreators';


const ResultsContainer = props => (<Results {...props} />);


ResultsContainer.propTypes = {
  country: React.PropTypes.string.isRequired,
  bannerIds: React.PropTypes.array.isRequired,
  propsById: React.PropTypes.object.isRequired,
  textsById: React.PropTypes.object.isRequired,
  images: React.PropTypes.array.isRequired,
  imageSetsById: React.PropTypes.object.isRequired,
  currentPageNum: React.PropTypes.number.isRequired,
  handleBannerClick: React.PropTypes.func.isRequired,
  style: React.PropTypes.object,
};


function updatePropsValues(propsById, globalProps) {
  return Object.keys(propsById).reduce((obj, key) => ({
    ...obj,
    [key]: { ...propsById[key], ...globalProps },
  }), {});
}


function mapStateToProps(state, ownProps) {
  const country = ownProps.currentCountry;
  const {
    imageSetsById,
    propsById,
    textsById,
    pageNum,
    imagesByCountry,
    bannerIdsByCountry,
    globalProps,
  } = state;

  return {
    country,
    bannerIds: bannerIdsByCountry[country],
    propsById,
    textsById,
    images: imagesByCountry[country],
    imageSetsById,
    globalProps,
    currentPageNum: pageNum,
    style: ownProps.style,
  };
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  handleBannerClick: ({ currentPageNum, index, banner }) => (
    dispatch(toggleBannerSelection({
      country: ownProps.currentCountry,
      currentPageNum,
      index,
      banner,
    }))
  ),
});


const mergeProps = (stateProps, dispatchProps) => {
  const { globalProps, propsById, currentPageNum, ...states } = stateProps;
  const { handleBannerClick } = dispatchProps;
  return {
    ...states,
    currentPageNum,
    propsById: updatePropsValues(propsById, globalProps),
    handleBannerClick: ({ index, banner }) => handleBannerClick({
      currentPageNum,
      index,
      banner,
    }),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ResultsContainer);
