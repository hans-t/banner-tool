import React from 'react';
import { connect } from 'react-redux';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import ImageSource from './image-source';
import ContentScrollableContainer from '../common/content-scrollable-container';
import { debounce } from '../common/helpers';


const placeholder = 'data:image/png;base64,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wnP8bl78xC3OtsbDmXFWNJ8ZjZ3Hn4aJJQJn/KRu/ApNXEIeFVhxw3vceI9HJuKvjsbvCI4nxbddko42T/O18riiXxmP0xyPbesELly+fPmfv4Vb16aWTigQ95LeeOONg3tP67J4xGF8M87r4l7Vm2++ucSfBV4v8XT8o48+uv548z5+7ee99947tC7OiF577bWdnWFVH1fW4xCED85dwBnWuQ/B9g7Eje9XX3310FlUXAbG31k/Kqxib3Gm9OKLL27OpMZN+bici+ektoVV1MXffI9HE8YN9/gsLhVjX7u6HIx9Vh9X1iP6atkvAWdY+zUeW3sTZyVxLyvOduZA2VrwvxVxSRf3v7b9ysu2+rjsjHZ2GVRHtVV9XFmPo/rus3oBgVVvrkUCBJICLgmTcMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgXEFj15lokQCApILCScMoIEKgX+A8nwGVPd3WcLAAAAABJRU5ErkJggg==';


function getTemplates() {
  // trigger in constructor
}


function getCombinations() {

}


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
    this.templates = getTemplates(props.templateList);
  }

  handleAdd() {
    const { addSourceURL, addImage } = this.props;
    addSourceURL();
    addImage();
  }

  _handleChange(index, values) {
    const { editSourceURL, replaceImage } = this.props;
    editSourceURL(index, values);
    const simulateAJAXCall = () => replaceImage(index, placeholder);
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
    templateList: state.templates.filter(el => el.selected).map(el => el.value),
    currentCountry: ownProps.currentCountry,
  }),
  (dispatch, ownProps) => {
    const country = ownProps.currentCountry;
    return {
      addImage: () => dispatch({
        type: 'ADD_IMAGE',
        country,
      }),

      addImageCombinations: (combinations) => dispatch({
        type: 'ADD_OR_REPLACE_COMBINATIONS',
        combinations,
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
