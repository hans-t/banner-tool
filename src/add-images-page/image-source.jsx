import React from 'react';
import { TextFieldWithValidation } from '../common/input';
import { ContentScrollableContainer } from '../common/containers';

import IconButton from 'material-ui/lib/icon-button';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';


const ImageSource = ({ id, style, deleteInputField }) => {
  const defaultStyle = {
    marginTop: -14,
    marginBottom: 28,
  };

  return (
    <div style={{ display: 'flex' }}>
      <TextFieldWithValidation
        type="url"
        defaultValue="https://www.zalora."
        hintText="Image Source URL"
        floatingLabelText="Image Source URL"
        errorText="This field must be filled with valid URL."
        required
        onValid={(event) => console.log(event.target.value)}
        style = {{ ...defaultStyle, ...style, flex: 20, marginRight: 10 }}
      />
      <TextFieldWithValidation
        type="number"
        defaultValue="1"
        hintText="Image Number"
        floatingLabelText="Image Number"
        errorText="This field must be filled with integer between 1 and 8."
        min="1"
        max="8"
        step="1"
        required
        style = {{ ...defaultStyle, ...style, flex: 5 }}
        onValid={(event) => console.log(event.target.value)}
      />
      <IconButton
        tooltip="SVG Icon"
        style={{ flex: 1, marginTop: 12, marginRight: -12 }}
        onClick={() => deleteInputField(id)}
      >
        <ActionDelete />
      </IconButton>
    </div>
  );
};

ImageSource.propTypes = {
  style: React.PropTypes.object,
  id: React.PropTypes.number.isRequired,
  deleteInputField: React.PropTypes.func.isRequired,
};

ImageSource.defaultProps = { style: {} };


const ImageSources = ({ keys, deleteInputField }) => {
  const style = {
    container: {
      width: '80%',
      margin: 'auto',
      padding: '1%',
      paddingBottom: 0,
      height: '100%',
    },
    imageSource: {},
  };

  return (
      <ContentScrollableContainer style={style.container}>
        {keys.map(key => (
          <ImageSource
            id={key}
            key={key}
            style={style.imageSource}
            deleteInputField={deleteInputField}
          />
        ))}
      </ContentScrollableContainer>
  );
};

ImageSources.propTypes = {
  keys: React.PropTypes.array.isRequired,
  deleteInputField: React.PropTypes.func.isRequired,
};


export default class ImageSourcesBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
    this.deleteInputField = this.deleteInputField.bind(this);
    this.state = {
      keys: [1, 2, 3, 4, 5, 6],
    };

    this.style = {
      container: {
        height: '30%',
        position: 'relative',
      },
      addButton: {
        position: 'absolute',
        left: 99,
        top: -20,
      },
    };
  }

  handleAddBtnClick() {
    const keys = this.state.keys;
    this.setState({
      keys: [...keys, Math.max(...keys) + 1],
    });
  }

  deleteInputField(key) {
    const keys = this.state.keys;
    const keyIndex = keys.findIndex(el => el === key);
    const newKeys = keys.slice(0, keyIndex).concat(keys.slice(keyIndex + 1));
    this.setState({
      keys: newKeys.length > 0 ? newKeys : [1],
    });
  }

  render() {
    return (
      <div style={this.style.container}>
        <FloatingActionButton
          mini
          primary
          style={this.style.addButton}
          onClick={this.handleAddBtnClick}
        >
          <ContentAdd />
        </FloatingActionButton>
        <ImageSources keys={this.state.keys} deleteInputField={this.deleteInputField} />
      </div>
    );
  }
}
