import React from 'react';
import { IconButton } from 'material-ui';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import { TextFieldWithValidation } from '../common/input';


const styles = {
  container: {
    display: 'flex',
  },
  urlField: {
    marginTop: -14,
    marginBottom: 28,
    flex: 20,
    marginRight: 10,
  },
  imageNumberField: {
    marginTop: -14,
    marginBottom: 28,
    flex: 5,
  },
  deleteBtn: {
    flex: 1,
    marginTop: 12,
    marginRight: -12,
  },
};


class ImageSource extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = this.props.defaultValues;
  }

  handleChange(event, isValid) {
    const { index, onValid } = this.props;
    const newState = {
      ...this.state,
      [event.target.name]: event.target.value,
    };

    this.setState(newState);
    if (isValid) {
      onValid(index, newState);
    }
  }

  render() {
    const { onDelete, style } = this.props;
    return (
      <div style={{ ...styles.container, ...style }}>
        <TextFieldWithValidation
          type="url"
          name="url"
          value={this.state.url}
          hintText="Image Source URL"
          floatingLabelText="Image Source URL"
          errorText="This field must be filled with valid URL."
          required
          onChange={this.handleChange}
          style = {styles.urlField}
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
          style = {styles.imageNumberField}
        />
        <IconButton
          tooltip="SVG Icon"
          style={styles.deleteBtn}
          onClick={onDelete}
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

ImageSource.defaultProps = {
  style: {},
};


export default ImageSource;
