import React from 'react';
import { Menu, MenuItem, Checkbox, Divider } from 'material-ui';
import { easeInOutFunction } from 'material-ui/styles/transitions';

import { isAnySelected } from './helpers';


const styles = {
  menu: {
    zIndex: 0,
    boxSizing: 'border-box',
    transition: `border-color 450ms ${easeInOutFunction}`,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0)',
  },
  menuError: {
    borderColor: '#F44336',
  },
  checkbox: {
    boxSizing: 'border-box',
    paddingLeft: 8,
    paddingRight: 8,
  },
  errorText: {
    position: 'relative',
    top: 13,
    left: -1,
    fontSize: 12,
    color: '#F44336',
    transition: `opacity 450ms ${easeInOutFunction}`,
  },
};


/**
 onChange props should accept an array of label objects. Label object has 2 keys:
 `value` and `selected`. `value` is a string that represents the label value. `selected` is
 a boolean that indicates whether the corresponding label is selected.
 */
export const MultiSelectBox = ({ title, labels, required, errorText, style, onChange }) => {
  // BUG: Checkbox won't tick when parent setState.
  // https://github.com/callemall/material-ui/issues/2983

  const handleChange = (event) => {
    event.stopPropagation();
    const checkboxes = event.currentTarget.querySelectorAll("input[type='checkbox']");
    const newLabels = labels
      .map((el, index) => ({ ...el, selected: checkboxes[index].checked }));

    // required because of Checkbox bug, see above.
    setTimeout(() => onChange(newLabels), 0);
  };

  const valid = required ? isAnySelected(labels) : true;
  let menuBorderColor;
  let errorOpacity;
  if (valid) {
    menuBorderColor = styles.menu.borderColor;
    errorOpacity = 0;
  } else {
    menuBorderColor = styles.menuError.borderColor;
    errorOpacity = 1;
  }

  return (
    <div style={style}>
      <Menu
        style={{ ...styles.menu, borderColor: menuBorderColor }}
        onChange={handleChange}
      >
        <MenuItem primaryText={title} />
        <Divider />
        {labels.map((label, index) => (
          <Checkbox
            key={index}
            label={label.value}
            defaultChecked={label.selected}
            style={styles.checkbox}
          />
        ))}
      </Menu>
      <div style={{ ...styles.errorText, opacity: errorOpacity }}>
        {errorText}
      </div>
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
