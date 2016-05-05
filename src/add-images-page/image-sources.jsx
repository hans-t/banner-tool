import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import ImageSource from './image-source';
import * as actionCreators from './actionCreators';
import { debounce, bindCountryToDispatchProps } from '../common/helpers';
import ContentScrollableContainer from '../common/content-scrollable-container';


class ImageSources extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = debounce(this._handleChange.bind(this), 700);
    this.handleDelete = this.handleDelete.bind(this);
    this.simulateAJAXCall = this.simulateAJAXCall.bind(this);
    this.style = {
      container: {
        position: 'relative',
      },
      addButton: {
        position: 'absolute',
        top: -20,
      },
      contentContainer: {
        padding: '3% 1% 0',
      },
    };
  }

  handleAdd() {
    const { addSourceURL, addImage } = this.props;
    addSourceURL();
    addImage();
  }

  _handleChange(index, values) {
    const { editSourceURL } = this.props;
    editSourceURL(index, values);
    this.simulateAJAXCall(index);
  }

  simulateAJAXCall(index) {
    const { replaceImage } = this.props;
    const imageURL = `static/dummy/${index}.b64`;
    fetch(imageURL)
      .then(response => response.text())
      .then(response => replaceImage(index, ({
        index,
        dataURI: response,
        width: 762,
        height: 1100,
      })));
  }

  handleDelete(index) {
    const { removeImage, removeSourceURL } = this.props;
    removeSourceURL(index);
    removeImage(index);
  }

  render() {
    const { sourceURLs, style } = this.props;
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
              key={defaultValues.id}
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


function mapStateToProps(state, ownProps) {
  return {
    sourceURLs: state.sourceURLsByCountry[ownProps.currentCountry],
    currentCountry: ownProps.currentCountry,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { currentCountry } = ownProps;
  const boundDispatchProps = bindCountryToDispatchProps(dispatchProps, currentCountry);
  return {
    ...stateProps,
    ...boundDispatchProps,
    ...ownProps,
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ImageSources);
