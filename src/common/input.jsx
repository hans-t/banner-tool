import React from 'react';
import TextField from 'material-ui/lib/text-field';


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
      this.inputRef = c.refs.input;
    }
  }

  handleChange(event) {
    const { onChange, onValid } = this.props;
    const isValid = this.inputRef.checkValidity();
    this.setState({ valid: isValid });

    onChange(event);
    if (isValid) {
      onValid(event);
    }
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
  errorText: React.PropTypes.string.isRequired,
  required: React.PropTypes.bool,
  onValid: React.PropTypes.func,
  onChange: React.PropTypes.func,
};

TextFieldWithValidation.defaultProps = {
  required: false,
  onChange: () => {},
  onValid: () => {},
};
