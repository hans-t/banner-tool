import React from 'react';
import { connect } from 'react-redux';

import { TextFieldWithValidation } from '../common/input';
import { updateTranslatedCopyAction } from './actionCreators';


const defaultStyle = {
  div: {
    width: '100%',
    height: '100%',
    padding: 0,
    overflowY: 'auto',
  },
  textField: {
    width: '60%',
    display: 'block',
    margin: '0 auto 30px',
  },
};


const TextsBox = ({ updateCopy, currentCountry, copies, style }) => (
  <div style={{ ...defaultStyle.div, ...style }}>
    {Object.keys(copies).map(copyType => (
      <TextFieldWithValidation
        required
        key={`${currentCountry}${copyType}`}
        style={defaultStyle.textField}
        defaultValue={copies[copyType]}
        floatingLabelText={copyType.toUpperCase()}
        onChange={(event) => updateCopy({
          copy: event.target.value,
          copyType,
        })}
      />
    ))}
  </div>
);


TextsBox.propTypes = {
  updateCopy: React.PropTypes.func.isRequired,
  currentCountry: React.PropTypes.string.isRequired,
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
    updateCopy: ({ copy, copyType }) => dispatch(updateTranslatedCopyAction({
      country: ownProps.currentCountry,
      copyType,
      copy,
    })),
  })
)(TextsBox);
