import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SelectField from 'material-ui/lib/select-field';


const ChannelSelectBox = ({ style, onChange, selectedChannel }) => {
  const channels = ['Mobile', 'GDN'];
  const defaultStyle = {};
  return (
    <SelectField
      style={{ defaultStyle, ...style }}
      value={selectedChannel}
      onChange={(event, index, value) => onChange(value)}
      floatingLabelText="Select Channel"
    >
      {channels.map((el, index) => (
        <MenuItem key={index} value={el} primaryText={el} />
      ))}
    </SelectField>
  );
};

ChannelSelectBox.propTypes = {
  style: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  selectedChannel: React.PropTypes.string,
};


export default connect(
  state => ({
    selectedChannel: state.selectedChannel,
  }),
  dispatch => ({
    onChange: channel => dispatch({
      type: 'SELECT_CHANNEL',
      channel,
    }),
  })
)(ChannelSelectBox);
