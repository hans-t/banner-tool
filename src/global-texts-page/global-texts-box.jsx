import React from 'react';
import { connect } from 'react-redux';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import copyTranslations from '../common/copyTranslations';
import { getSelectedCountries } from '../common/helpers';
import { updateGlobalCopyAction } from './actionCreators';


const defaultStyle = {
  width: '100%',
  height: '95%',
  marginBottom: '1%',
  padding: 0,
  overflowY: 'auto',
};


const selectFieldStyle = {
  width: '60%',
  display: 'block',
  margin: '0 auto 30px',
};


const GlobalTextsBox = ({ style, updateGlobalCopy, copies }) => (
  <div style={{ ...defaultStyle, ...style }}>
    {Object.keys(copyTranslations).map(copyType => {
      const copyValue = copies[copyType];
      return (
        <SelectField
          key={copyType}
          style={selectFieldStyle}
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


GlobalTextsBox.propTypes = {
  updateGlobalCopy: React.PropTypes.func.isRequired,
  copies: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
};


export default connect(
  state => ({
    copies: state.globalTexts,
    countries: getSelectedCountries(state.countries),
  }),
  dispatch => ({
    updateGlobalCopy: ({ countries, copy, copyType }) => dispatch(updateGlobalCopyAction({
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
)(GlobalTextsBox);
