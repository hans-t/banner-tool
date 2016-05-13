import React from 'react';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ImageSource from './image-source';
import { initImage } from './actions';
import { debounce } from '../common/helpers';
import {
  addSource,
  editSource,
  removeSource,
} from './actionCreators';


const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    top: -20,
  },
  contentContainer: {
    padding: '3% 1% 0',
    height: '100%',
  },
};


const ImageSources = ({
  sources,
  style,
  onAdd,
  onDelete,
  onChange,
}) => (
  <div style={{ ...styles.container, ...style }}>
    <FloatingActionButton
      mini
      primary
      style={styles.addButton}
      onClick={onAdd}
    >
      <ContentAdd />
    </FloatingActionButton>
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
  onAdd: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

ImageSources.defaultProps = {
  style: {},
  sources: [],
};


function fetchImage(url) {
  const image = new Image;
  fetch(url)
    .then(response => {
      if (response.ok) {
        response.json().then(response => {
          image.src = response.src;
        });
      }
    })
  return image;
}


function mapStateToProps(state) {
  return {
    sources: state.sources,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: () => {
      dispatch(addSource());
    },

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
    }, 700),
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
