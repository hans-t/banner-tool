import React from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Checkbox from 'material-ui/lib/checkbox';
import Divider from 'material-ui/lib/divider';


export const MultiSelectBox = ({ title, labels, style, onChange }) => {
  // BUG: Checkbox won't tick when parent setState.
  // https://github.com/callemall/material-ui/issues/2983

  const defaultStyle = {
    menu: {
      zIndex: 0,
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
    const checkedLabels = labels
      .filter((el, index) => checkboxes[index].checked)
      .map(el => el.value);

    // required because of Checkbox bug, see above.
    setTimeout(() => onChange(checkedLabels), 0);
  };

  return (
    <Menu style={{ ...defaultStyle.menu, ...style }} onChange={handleChange}>
      <MenuItem primaryText={title} />
      <Divider />
      {labels.map((label, index) => (
        <Checkbox
          key={index}
          label={label.value}
          defaultChecked={label.checked}
          style={defaultStyle.checkbox}
        />
      ))}
    </Menu>
  );
};

MultiSelectBox.propTypes = {
  title: React.PropTypes.string,
  style: React.PropTypes.object,
  labels: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

MultiSelectBox.defaultProps = {
  style: {},
};
