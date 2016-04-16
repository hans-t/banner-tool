import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SelectField from 'material-ui/lib/select-field';
import { AVAILABLE_CHANNELS_OPTION } from '../common/constants';


const getTemplates = (channel, refreshTemplatesOption) => {
  // replace with ajax
  switch (channel) {
    case 'GDN':
      refreshTemplatesOption([
        { value: '320x50_1', selected: true },
        { value: '320x50_2', selected: true },
        { value: '320x250_1', selected: true },
      ]);
      break;

    case 'Mobile':
      refreshTemplatesOption([
        { value: '1200x627_1', selected: true },
        { value: '480x320_1', selected: true },
        { value: '600x600_1', selected: true },
      ]);
      break;

    default:
      refreshTemplatesOption([]);
      break;
  }
};


const ChannelSelectBox = ({ style, updateChannel, refreshTemplatesOption, selectedChannel }) => {
  const channels = AVAILABLE_CHANNELS_OPTION;
  const defaultStyle = {};
  const handleChange = (event, index, channel) => {
    updateChannel(channel);
    getTemplates(channel, refreshTemplatesOption);
  };

  return (
    <SelectField
      style={{ defaultStyle, ...style }}
      value={selectedChannel}
      onChange={handleChange}
      floatingLabelText="Select Channel"
      errorText={selectedChannel ? '' : 'Required'}
    >
      {channels.map((el, index) => (
        <MenuItem key={index} value={el} primaryText={el} />
      ))}
    </SelectField>
  );
};

ChannelSelectBox.propTypes = {
  style: React.PropTypes.object,
  updateChannel: React.PropTypes.func.isRequired,
  refreshTemplatesOption: React.PropTypes.func.isRequired,
  selectedChannel: React.PropTypes.string,
};


export default connect(
  state => ({
    selectedChannel: state.selectedChannel,
  }),
  dispatch => ({
    updateChannel: channel => dispatch({
      type: 'SELECT_CHANNEL',
      channel,
    }),
    refreshTemplatesOption: templates => dispatch({
      type: 'REFRESH_TEMPLATE_OPTIONS',
      templates,
    }),
  })
)(ChannelSelectBox);
