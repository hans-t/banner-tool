import React from 'react';

import Canvas from './canvas';


class Editor extends React.Component {
  componentWillMount() {
    this.canvas = new Canvas;
  }

  componentWillReceiveProps(nextProps) {
    if (!(this.canvas && nextProps.template.id === this.props.template.id)) {
      this.canvas.setDimension(nextProps.template.props);
    }
  }

  componentDidUpdate() {
    this.canvas.loadTemplate(this.props.template);
  }

  // initialize Canvas;
  render() {
    const { style } = this.props;
    return (
      <div style={style}>
        {this.canvas.component}
      </div>
    );
  }
}


Editor.propTypes = {
  template: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
};


export default Editor;
