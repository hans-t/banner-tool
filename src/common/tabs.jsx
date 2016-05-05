import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';


function wrapState(ComposedComponent) {
  class StateWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { selectedIndex: 0 };
      this.handleUpdateSelectedIndex = this.handleUpdateSelectedIndex.bind(this);
    }

    handleUpdateSelectedIndex(e, index) {
      this.setState({ selectedIndex: index });
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{
            value: this.state.selectedIndex,
            requestChange: this.handleUpdateSelectedIndex,
          }}
        />
      );
    }
  }

  return StateWrapper;
}


/* eslint-disable new-cap */
const SelectableList = wrapState(SelectableContainerEnhance(List));
/* eslint-enable new-cap */


const Tabs = ({ style, tabs, onTabClick }) => {
  const defaultStyles = {
    list: {},
  };

  return (
    <SelectableList
      value={0}
      zDepth={1}
      style={{ ...defaultStyles.list, ...style }}
    >
      {tabs.map((el, idx) => (
        <ListItem
          key={el}
          value={idx}
          primaryText={el}
          onClick={() => onTabClick(el)}
        />
      ))}
    </SelectableList>
  );
};

Tabs.propTypes = {
  style: React.PropTypes.object,
  tabs: React.PropTypes.array.isRequired,
  onTabClick: React.PropTypes.func,
};

Tabs.defaultProps = {
  style: {},
  onTabClick: () => {},
};

export default Tabs;
