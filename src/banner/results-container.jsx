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


function mapStateToProps(state, ownProps) {
  const country = ownProps.currentCountry;
  const {
    imageSetsById,
    propsById,
    textsById,
    pageNum,
    imagesByCountry,
    bannerIdsByCountry,
  } = state;

  return {
    country,
    bannerIds: bannerIdsByCountry[country],
    propsById,
    textsById,
    images: imagesByCountry[country],
    imageSetsById,
    currentPageNum: pageNum,
    style: ownProps.style,
  };
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  handleBannerClick: (currentPageNum, index) => (
    dispatch(toggleBannerSelection({
      country: ownProps.currentCountry,
      index,
      currentPageNum,
    }))
  ),
});


const mergeProps = (stateProps, dispatchProps) => {
  const { currentPageNum } = stateProps;
  const { handleBannerClick } = dispatchProps;
  return {
    ...stateProps,
    handleBannerClick: index => handleBannerClick(currentPageNum, index),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ResultsContainer);
