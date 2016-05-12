import React from 'react';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ImageSource from './image-source';
import { initImage } from './actions';
import { debounce } from '../common/helpers';
import ContentScrollableContainer from '../common/content-scrollable-container';
import {
  addSourceURL,
  editSourceURL,
  removeSourceURL,
} from './actionCreators';


const styles = {
  container: {
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
  sourceURLs,
  style,
  onAdd,
  onDelete,
  onChange,
}) => (
  <div style={{ ...styles.container, ...style }}>
    <ContentScrollableContainer style={styles.contentContainer}>
      <FloatingActionButton
        mini
        primary
        style={styles.addButton}
        onClick={onAdd}
      >
        <ContentAdd />
      </FloatingActionButton>
      {sourceURLs.map((defaultValues, index) => (
        <ImageSource
          key={defaultValues.id}
          index={index}
          defaultValues={defaultValues}
          onValid={onChange}
          onDelete={() => onDelete(index)}
        />
      ))}
    </ContentScrollableContainer>
  </div>
);

ImageSources.propTypes = {
  style: React.PropTypes.object,
  sourceURLs: React.PropTypes.array,
  onAdd: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

ImageSources.defaultProps = {
  style: {},
};


function fetchImage(url) {
  const image = new Image;
  image.src = url;
  return image;
}


function mapStateToProps(state, ownProps) {
  return {
    sourceURLs: state.sourceURLsByCountry[ownProps.currentCountry],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const country = ownProps.currentCountry;
  const onAdd = () => {
    dispatch(addSourceURL(country));
  };

  const onChange = (index, values) => {
    const imageURL = `static/dummy/${index}.jpg`;
    const image = fetchImage(imageURL);
    image.onload = () => dispatch(
      editSourceURL({
        country,
        index,
        values,
        image: initImage({ index, image }),
      })
    );
  };

  const onDelete = (index) => {
    dispatch(removeSourceURL(country, index));
  };

  return {
    onAdd,
    onDelete,
    onChange: debounce(onChange, 700),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { style } = ownProps;
  return {
    ...stateProps,
    ...dispatchProps,
    style,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ImageSources);
