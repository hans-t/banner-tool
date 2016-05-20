import React from 'react';

import SelectTemplateBox from './select-template-box';
import Editor from './editor';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
  selectBox: {
    flex: 0,
    backgroundColor: '#fff',
    fontSize: 24,
    lineHeight: 1,
    border: '1px solid #ddd',
    borderRadius: 3,
    margin: '24px 0',
  },
  editor: {
    flex: 3,
  },
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: {},
      selectedTemplate: '',
      templateNames: [],
      channel: 'mobile',
    };
    this.fetchTemplateList = this.fetchTemplateList.bind(this);
    this.fetchTemplate = this.fetchTemplate.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillMount() {
    this.fetchTemplateList();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  fetchTemplateList() {
    const { channel } = this.state;
    const url = `/static/templates/${channel}/templates.json`;
    fetch(url)
      .then(response => response.json())
      .then(templateNames => {
        this.setState({ templateNames });
      });
  }

  fetchTemplate(url) {
    fetch(url)
      .then(response => response.json())
      .then(template => {
        template.id = template.props.templateName; // eslint-disable-line no-param-reassign
        this.setState({ template });
      });
  }

  handleSelect(event) {
    const selectedTemplate = event.target.value;
    this.setState({ selectedTemplate });

    const { channel } = this.state;
    const url = `/static/templates/${channel}/${selectedTemplate}.json`;
    clearInterval(this.intervalID);
    this.intervalID = setInterval(this.fetchTemplate, 500, url);
  }

  render() {
    const { templateNames, selectedTemplate, template } = this.state;
    return (
      <div style={styles.container}>
        <SelectTemplateBox
          templateNames={templateNames}
          selectedTemplate={selectedTemplate}
          handleSelect={this.handleSelect}
          style={styles.selectBox}
        />
        <Editor
          template={template}
          style={styles.editor}
        />
      </div>
    );
  }
}
