import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SelectField from 'material-ui/lib/select-field';
import { AVAILABLE_CHANNELS_OPTION } from '../common/constants';


function getTemplateLabels(channel, addTemplateLabels) {
  // TODO: replace with ajax
  if (channel === 'Mobile') {
    addTemplateLabels([
      { value: '1200x627_1', selected: true },
      { value: '480x320_1', selected: true },
      { value: '600x600_1', selected: true },
    ]);
  }
}


function getTemplates(channel, addTemplates) {
  // TODO: replace with ajax
  const templates = [
    require('../../static/templates/mobile_320x50_1.js'),
  ];
  addTemplates(templates);
}


const ChannelSelectBox = (props) => {
  const {
    style,
    updateChannel,
    addTemplateLabels,
    addTemplates,
    selectedChannel,
  } = props;

  const channels = AVAILABLE_CHANNELS_OPTION;
  const defaultStyle = {};
  const handleChange = (event, index, channel) => {
    updateChannel(channel);
    getTemplateLabels(channel, addTemplateLabels);
    getTemplates(channel, addTemplates);
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
  selectedChannel: React.PropTypes.string,
  updateChannel: React.PropTypes.func.isRequired,
  addTemplateLabels: React.PropTypes.func.isRequired,
  addTemplates: React.PropTypes.func.isRequired,
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
    addTemplateLabels: labels => dispatch({
      type: 'ADD_OR_REPLACE_TEMPLATE_LABELS',
      labels,
    }),
    addTemplates: templates => dispatch({
      type: 'ADD_OR_REPLACE_TEMPLATES',
      templates,
    }),
  })
)(ChannelSelectBox);
