import React from 'react';
import { connect } from 'react-redux';

import { setBannerProps } from './actionCreators';
import ColorPicker from '../common/color-picker';


const styles = {
  container: {
    width: '60%',
    height: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  span: {
    flex: 1,
    color: '#666666',
  },
  input: {
    flex: 5,
  },
};


function SettingsBox({ globalProps, setBackgroundColor }) {
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <span style={styles.span}>Background Color</span>
        <div style={styles.input}>
          <ColorPicker
            color={globalProps.backgroundColor}
            onChange={setBackgroundColor}
          />
        </div>
      </div>
    </div>
  );
}


SettingsBox.propTypes = {
  globalProps: React.PropTypes.object.isRequired,
  setBackgroundColor: React.PropTypes.func.isRequired,
};


export default connect(
  state => ({
    globalProps: state.globalProps,
  }),
  dispatch => ({
    setBackgroundColor: ({ hex }) => (
      dispatch(setBannerProps({ property: 'backgroundColor', value: hex }))
    ),
  })
)(SettingsBox);
