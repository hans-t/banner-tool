import React from 'react';
import { TextField } from 'material-ui';


export class TextFieldWithValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { valid: false };
    this.attachInputRef = this.attachInputRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ valid: this.inputRef.checkValidity() });
    /* eslint-enable react/no-did-mount-set-state */
  }

  attachInputRef(c) {
    if (c) {
      this.inputRef = c.getInputNode();
    }
  }

  handleChange(event) {
    const { onChange } = this.props;
    const isValid = this.inputRef.checkValidity();
    this.setState({ valid: isValid });
    onChange(event, isValid);
  }

  render() {
    const { errorText, ...rest } = this.props;
    const displayedErrorText = !this.state.valid ? errorText : '';
    return (
      <TextField
        {...rest}
        errorText={displayedErrorText}
        onChange={this.handleChange}
        ref={this.attachInputRef}
      />
    );
  }
}

TextFieldWithValidation.propTypes = {
  errorText: React.PropTypes.string,
  required: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

TextFieldWithValidation.defaultProps = {
  required: false,
  errorText: 'Please fill in the following field',
  onChange: () => {},
};
