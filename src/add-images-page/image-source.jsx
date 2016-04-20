import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';

import { TextFieldWithValidation } from '../common/input';


class ImageSource extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = this.props.defaultValues;
    this.defaultStyle = {
      marginTop: -14,
      marginBottom: 28,
    };
  }

  handleChange(event, isValid) {
    const { index, onValid } = this.props;
    const newState = {
      ...this.state,
      [event.target.name]: event.target.value,
    };

    this.setState(newState);
    if (isValid) {
      onValid(newState, index);
    }
  }

  render() {
    const { index, onDelete, style } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        <TextFieldWithValidation
          type="url"
          name="url"
          value={this.state.url}
          hintText="Image Source URL"
          floatingLabelText="Image Source URL"
          errorText="This field must be filled with valid URL."
          required
          onChange={this.handleChange}
          style = {{ ...this.defaultStyle, ...style, flex: 20, marginRight: 10 }}
        />
        <TextFieldWithValidation
          type="number"
          name="imageNumber"
          value={this.state.imageNumber}
          hintText="Image Number"
          floatingLabelText="Image Number"
          errorText="This field must be filled with integer between 1 and 8."
          min="1"
          max="8"
          step="1"
          required
          onChange={this.handleChange}
          style = {{ ...this.defaultStyle, ...style, flex: 5 }}
        />
        <IconButton
          tooltip="SVG Icon"
          style={{ flex: 1, marginTop: 12, marginRight: -12 }}
          onClick={() => onDelete(index)}
        >
          <ActionDelete />
        </IconButton>
      </div>
    );
  }
}


ImageSource.propTypes = {
  index: React.PropTypes.number.isRequired,
  onValid: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  defaultValues: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
};

ImageSource.defaultProps = { style: {} };


export default ImageSource;
