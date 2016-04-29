import React from 'react';
import { connect } from 'react-redux';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import ImageSource from './image-source';
import ContentScrollableContainer from '../common/content-scrollable-container';
import { debounce } from '../common/helpers';


// const placeholder = require('../../static/placeholder.js');
import shortid from 'shortid';


class ImageSources extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = debounce(this._handleChange.bind(this), 700);
    this.handleDelete = this.handleDelete.bind(this);
    this.style = {
      container: {
        position: 'relative',
      },
      addButton: {
        position: 'absolute',
        top: -20,
      },
      contentContainer: {
        marginLeft: '2%',
        padding: '3% 1% 0',
        height: '100%',
      },
    };
  }

  handleAdd() {
    const { addSourceURL, addImage } = this.props;
    addSourceURL();
    addImage();
  }

  _handleChange(index, values) {
    const { editSourceURL, replaceImage } = this.props;
    editSourceURL(index, values);
    const simulateAJAXCall = () => replaceImage(index, shortid.generate());
    simulateAJAXCall();
  }

  handleDelete(index) {
    const { removeImage, removeSourceURL } = this.props;
    removeSourceURL(index);
    removeImage(index);
  }

  render() {
    const { currentCountry, sourceURLs, style } = this.props;
    const { container, contentContainer, addButton } = this.style;
    return (
      <div style={{ ...container, ...style }}>
        <ContentScrollableContainer style={contentContainer}>
          <FloatingActionButton
            mini
            primary
            style={addButton}
            onClick={this.handleAdd}
          >
            <ContentAdd />
          </FloatingActionButton>
          {sourceURLs.map((defaultValues, index) => (
            <ImageSource
              key={`${currentCountry}${index}`}
              index={index}
              defaultValues={defaultValues}
              onValid={this.handleChange}
              onDelete={this.handleDelete}
            />
          ))}
        </ContentScrollableContainer>
      </div>
    );
  }
}

ImageSources.propTypes = {
  style: React.PropTypes.object,
  countries: React.PropTypes.array,
  currentCountry: React.PropTypes.string,
  sourceURLs: React.PropTypes.array,
  addImage: React.PropTypes.func,
  replaceImage: React.PropTypes.func,
  removeImage: React.PropTypes.func,
  editSourceURL: React.PropTypes.func,
  addSourceURL: React.PropTypes.func,
  removeSourceURL: React.PropTypes.func,
};

ImageSources.defaultProps = {
  style: {},
};


export default connect(
  (state, ownProps) => ({
    sourceURLs: state.sourceURLsByCountry[ownProps.currentCountry],
    currentCountry: ownProps.currentCountry,
  }),
  (dispatch, ownProps) => {
    const country = ownProps.currentCountry;
    return {
      addImage: () => dispatch({
        type: 'ADD_IMAGE',
        country,
      }),

      replaceImage: (index, imageDataURI) => dispatch({
        type: 'REPLACE_IMAGE',
        country,
        index,
        imageDataURI,
      }),

      removeImage: (index) => dispatch({
        type: 'REMOVE_IMAGE',
        country,
        index,
      }),

      addSourceURL: () => dispatch({
        type: 'ADD_SOURCE_URL',
        country,
      }),

      editSourceURL: (index, values) => dispatch({
        type: 'EDIT_SOURCE_URL',
        country,
        index,
        values,
      }),

      removeSourceURL: (index) => dispatch({
        type: 'REMOVE_SOURCE_URL',
        country,
        index,
      }),
    };
  }
)(ImageSources);
