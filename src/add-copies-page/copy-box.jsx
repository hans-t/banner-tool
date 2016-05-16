import React from 'react';
import { connect } from 'react-redux';
import { MenuItem, SelectField } from 'material-ui';


import copyTranslations from '../common/copyTranslations';
import { getSelectedCountries } from '../common/helpers';
import { updateCopyAction } from './actionCreators';


const styles = {
  div: {
    width: '100%',
    height: '100%',
    padding: 0,
    overflowY: 'auto',
  },
  selectField: {
    width: '60%',
    display: 'block',
    margin: '0 auto 30px',
  },
};


const CopyBox = ({ style, updateGlobalCopy, copies }) => (
  <div style={{ ...styles.div, ...style }}>
    {Object.keys(copyTranslations).map(copyType => {
      const copyValue = copies[copyType];
      return (
        <SelectField
          key={copyType}
          style={styles.selectField}
          onChange={(event, index, copy) => updateGlobalCopy({ copy, copyType })}
          value={copyValue}
          floatingLabelText={copyType.toUpperCase()}
          errorText={copyValue ? '' : 'Required'}
        >
          {Object.keys(copyTranslations[copyType].global).map(copy => (
            <MenuItem key={copy} value={copy} primaryText={copy} />
          ))}
        </SelectField>
      );
    })}
  </div>
);


CopyBox.propTypes = {
  updateGlobalCopy: React.PropTypes.func.isRequired,
  copies: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
};


export default connect(
  state => ({
    copies: state.copies,
    countries: getSelectedCountries(state.countries),
  }),
  dispatch => ({
    updateGlobalCopy: ({ countries, copy, copyType }) => dispatch(updateCopyAction({
      countries,
      copyType,
      copy,
    })),
  }),
  (stateProps, dispatchProps) => {
    const { copies, countries } = stateProps;
    const { updateGlobalCopy } = dispatchProps;
    return {
      copies,
      updateGlobalCopy: ({ copy, copyType }) => (
        updateGlobalCopy({ countries, copy, copyType })
      ),
    };
  }
)(CopyBox);
