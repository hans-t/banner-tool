import React from 'react';
import { connect } from 'react-redux';
import { MenuItem, SelectField } from 'material-ui';

import ColorPicker from '../common/color-picker';
import copyTranslations from '../common/copyTranslations';
import { getSelectedCountries } from '../common/helpers';
import { updateCopyAction } from './actionCreators';


const styles = {
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
    overflowY: 'auto',
  },
  fieldContainer: {
    width: '60%',
    margin: '0 auto 4%',
  },
  selectField: {
    width: '100%',
  },
};


const CopyBox = ({ style, updateCopy, copies }) => (
  <div style={{ ...styles.container, ...style }}>
    {Object.keys(copyTranslations).map(copyType => {
      const { text, color } = copies[copyType];
      return (
        <div key={copyType} style={styles.fieldContainer}>
          <SelectField
            style={styles.selectField}
            onChange={(event, index, value) => updateCopy({
              copy: { text: value, color },
              copyType,
            })}
            value={text}
            floatingLabelText={copyType.toUpperCase()}
            errorText={text ? '' : 'Required'}
          >
            {Object.keys(copyTranslations[copyType].global).map(copy => (
              <MenuItem key={copy} value={copy} primaryText={copy} />
            ))}
          </SelectField>
          <ColorPicker
            color={color}
            onChange={value => updateCopy({
              copy: { text, color: value.hex },
              copyType,
            })}
          />
        </div>
      );
    })}
  </div>
);


CopyBox.propTypes = {
  updateCopy: React.PropTypes.func.isRequired,
  copies: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
};


export default connect(
  state => ({
    copies: state.copies,
    countries: getSelectedCountries(state.countries),
  }),
  dispatch => ({
    updateCopy: ({ countries, copy, copyType }) => dispatch(updateCopyAction({
      countries,
      copyType,
      copy,
    })),
  }),
  (stateProps, dispatchProps) => {
    const { copies, countries } = stateProps;
    const { updateCopy } = dispatchProps;
    return {
      copies,
      updateCopy: ({ copy, copyType }) => (
        updateCopy({ countries, copy, copyType })
      ),
    };
  }
)(CopyBox);
