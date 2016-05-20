import React from 'react';


export default function SelectBox({
  selectedTemplate,
  handleSelect,
  templateNames,
  style,
}) {
  return (
    <select value={selectedTemplate} onChange={handleSelect} style={style}>
      <option value="" disabled>Choose Template</option>
      {templateNames.map(name => (
        <option key={name} value={name}>{name}</option>
      ))}
    </select>
  );
}


SelectBox.propTypes = {
  selectedTemplate: React.PropTypes.string.isRequired,
  handleSelect: React.PropTypes.func.isRequired,
  templateNames: React.PropTypes.array.isRequired,
  style: React.PropTypes.object,
};
