import React from 'react';
import { connect } from 'react-redux';
import { MultiSelectBox } from './common/multi-select';


class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { templates: [] };
    this.defaultStyle = {};
    this.updateSelectedTemplates = this.props.updateSelectedTemplates;
  }

  componentDidMount() {
    // from ajax

    const templates = [
      { value: '320x50_1', checked: true },
      { value: '320x50_2', checked: true },
      { value: '600x600_1', checked: true },
    ];

    this.setState({ templates });
    this.updateSelectedTemplates(templates.map(el => el.value));
  }

  render() {
    return (
      <MultiSelectBox
        title="Select Templates"
        style={{ ...this.defaultStyle, ...this.props.style }}
        labels={this.state.templates}
        onChange={this.updateSelectedTemplates}
      />
    );
  }
}

SelectBox.propTypes = {
  updateSelectedTemplates: React.PropTypes.func.isRequired,
  style: React.PropTypes.object,
};

SelectBox.defaultProps = {
  style: {},
};


export default connect(
  state => ({ selectedTemplates: state.selectedTemplates }),
  dispatch => ({
    updateSelectedTemplates: templates => dispatch({
      type: 'SELECT_TEMPLATES',
      templates,
    }),
  })
)(SelectBox);
