import React from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Checkbox from 'material-ui/lib/checkbox';
import Divider from 'material-ui/lib/divider';
import { isAnySelected } from './helpers';
import { easeInOutFunction } from 'material-ui/lib/styles/transitions';


export const MultiSelectBox = ({ title, labels, required, errorText, style, onChange }) => {
  // BUG: Checkbox won't tick when parent setState.
  // https://github.com/callemall/material-ui/issues/2983

  const defaultStyle = {
    menu: {
      zIndex: 0,
      boxSizing: 'border-box',
      transition: `border-color 450ms ${easeInOutFunction}`,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'rgba(0,0,0,0)',
    },
    checkbox: {
      boxSizing: 'border-box',
      paddingLeft: 8,
      paddingRight: 8,
    },
  };

  const handleChange = (event) => {
    event.stopPropagation();
    const checkboxes = event.currentTarget.querySelectorAll("input[type='checkbox']");
    const newLabels = labels
      .map((el, index) => ({ ...el, selected: checkboxes[index].checked }));

    // required because of Checkbox bug, see above.
    setTimeout(() => onChange(newLabels), 0);
  };

  const valid = required ? isAnySelected(labels) : true;
  const errorStyle = valid ? null : { borderColor: '#F44336' };

  return (
    <Menu style={{ ...defaultStyle.menu, ...style, ...errorStyle }} onChange={handleChange}>
      <MenuItem primaryText={title} />
      <Divider />
      {labels.map((label, index) => (
        <Checkbox
          key={index}
          label={label.value}
          defaultChecked={label.selected}
          style={defaultStyle.checkbox}
        />
      ))}
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: -2,
        fontSize: 12,
        color: '#F44336',
        transition: `opacity 450ms ${easeInOutFunction}`,
        opacity: valid ? 0 : 1,
      }}
      >
        {errorText}
      </div>
    </Menu>
  );
};

MultiSelectBox.propTypes = {
  title: React.PropTypes.string,
  style: React.PropTypes.object,
  required: React.PropTypes.bool,
  errorText: React.PropTypes.string,
  labels: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

MultiSelectBox.defaultProps = {
  style: {},
  required: false,
  errorText: 'Required',
};
