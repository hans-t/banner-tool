import React from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Checkbox from 'material-ui/lib/checkbox';
import Divider from 'material-ui/lib/divider';
import { isAnySelected } from './helpers';
import { easeInOutFunction } from 'material-ui/lib/styles/transitions';


/**
 onChange props should accept an array of label objects. Label object has 2 keys:
 `value` and `selected`. `value` is a string that represents the label value. `selected` is
 a boolean that indicates whether the corresponding label is selected.
 */
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
    menuErrorStyle: {
      borderColor: '#F44336',
    },
    errorTextStyle: {
      position: 'relative',
      top: 13,
      left: -1,
      fontSize: 12,
      color: '#F44336',
      transition: `opacity 450ms ${easeInOutFunction}`,
      opacity: 1,
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
  if (valid) {
    defaultStyle.menuErrorStyle = {};
    defaultStyle.errorTextStyle.opacity = 0;
  }

  return (
    <div style={style}>
      <Menu style={{ ...defaultStyle.menu, ...defaultStyle.menuErrorStyle }}
        onChange={handleChange}
      >
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
      </Menu>
      <div style={defaultStyle.errorTextStyle}>{errorText}</div>
    </div>
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
