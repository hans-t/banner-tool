import React from 'react';
import { connect } from 'react-redux';

import ColorPicker from '../common/color-picker';
import { TextFieldWithValidation } from '../common/input';
import { updateTranslatedCopyAction } from './actionCreators';


const styles = {
  div: {
    width: '100%',
    height: '100%',
    padding: '2%',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  fieldContainer: {
    width: '60%',
    margin: '0 auto 4%',
  },
  textField: {
    width: '100%',
  },
};


const TextsBox = ({ updateTranslatedCopy, copies, style }) => (
  <div style={{ ...styles.div, ...style }}>
    {Object.keys(copies).map(copyType => {
      const { text, color } = copies[copyType];
      return (
        <div key={copyType} style={styles.fieldContainer}>
          <TextFieldWithValidation
            required
            style={styles.textField}
            defaultValue={text}
            floatingLabelText={copyType.toUpperCase()}
            onChange={event => updateTranslatedCopy({
              copy: { text: event.target.value, color },
              copyType,
            })}
          />
          <ColorPicker
            color={color}
            onChange={value => updateTranslatedCopy({
              copy: { text, color: value.hex },
              copyType,
            })}
          />
        </div>
      );
    })}
  </div>
);


TextsBox.propTypes = {
  updateTranslatedCopy: React.PropTypes.func.isRequired,
  copies: React.PropTypes.object,
  style: React.PropTypes.object,
};


/**
 * Users can land on edit texts page without filling in global texts. In that case,
 * copies is undefined, because textsByCountry is empty. So we need to set the default value
 * to cover that case.
 */
TextsBox.defaultProps = {
  copies: {},
};


export default connect(
  (state, ownProps) => ({
    copies: state.textsByCountry[ownProps.currentCountry],
  }),
  (dispatch, ownProps) => ({
    updateTranslatedCopy: ({ copy, copyType }) => dispatch(updateTranslatedCopyAction({
      country: ownProps.currentCountry,
      copyType,
      copy,
    })),
  })
)(TextsBox);
