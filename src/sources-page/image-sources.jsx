import React from 'react';
import { connect } from 'react-redux';

import ImageSource from './image-source';
import { initImage } from './actions';
import { debounce } from '../common/helpers';
import { editSource, removeSource } from './actionCreators';


const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  contentContainer: {
    padding: '3% 1% 0',
    height: '100%',
  },
};


const ImageSources = ({
  sources,
  style,
  onDelete,
  onChange,
}) => (
  <div style={{ ...styles.container, ...style }}>
    {sources.map((defaultValues, index) => (
      <ImageSource
        key={defaultValues.id}
        index={index}
        defaultValues={defaultValues}
        onValid={onChange}
        onDelete={() => onDelete(index)}
      />
    ))}
  </div>
);

ImageSources.propTypes = {
  style: React.PropTypes.object,
  sources: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

ImageSources.defaultProps = {
  style: {},
  sources: [],
};


export function fetchImage(url) {
  const image = new Image;
  fetch(url)
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          image.src = data.src;
        });
      }
    });
  return image;
}


function mapStateToProps(state) {
  return {
    sources: state.sources,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDelete: index => {
      dispatch(removeSource(index));
    },

    onChange: debounce((index, values) => {
      const { url, imageNumber } = values;
      const imageURL = `api/image?product_url=${url}&image_number=${imageNumber}`;
      const image = fetchImage(imageURL);
      image.onload = () => dispatch(
        editSource({
          index,
          values,
          image: initImage({ index, image }),
        })
      );
    }, 500),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    style: ownProps.style,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ImageSources);
