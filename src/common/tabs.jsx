import React from 'react';
import { List, ListItem, MakeSelectable } from 'material-ui/List';


let SelectableList = MakeSelectable(List); // eslint-disable-line new-cap


function wrapState(ComposedComponent) {
  class WrappedSelectableList extends React.Component {
    constructor(props) {
      super(props);
      this.handleRequestChange = this.handleRequestChange.bind(this);
    }

    componentWillMount() {
      this.setState({ selectedIndex: this.props.defaultValue });
    }

    handleRequestChange(event, index) {
      this.setState({ selectedIndex: index });
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  }

  WrappedSelectableList.propTypes = {
    children: React.PropTypes.node.isRequired,
    defaultValue: React.PropTypes.number.isRequired,
  };

  return WrappedSelectableList;
}


SelectableList = wrapState(SelectableList);


const Tabs = ({ style, tabs, onTabClick }) => {
  const defaultStyles = {
    list: {},
  };

  return (
    <SelectableList
      defaultValue={0}
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
