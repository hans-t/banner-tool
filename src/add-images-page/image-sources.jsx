import React from 'react';

import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import ImageSource from './image-source';
import { debounce } from '../common/helpers';
import { ContentScrollableContainer } from '../common/containers';


class ImageSources extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
    this.debouncedHandleChange = debounce(this._handleChange.bind(this), 1000);

    this.state = {
      ...props.countries.reduce((obj, curr) => {
        const defaultArray = Array(6)
          .fill(0)
          .map(() => ({
            url: 'https://www.zalora.',
            imageNumber: 1,
          }));

        return {
          ...obj,
          [curr]: defaultArray,
        };
      }, {}),
    };

    this.style = {
      container: {
        height: '20%',
        position: 'relative',
      },
      addButton: {
        position: 'absolute',
        top: -20,
      },
      contentContainer: {
        width: '90%',
        marginLeft: '3%',
        marginRight: 'auto',
        padding: '3% 1% 0',
        height: '100%',
      },
    };
  }

  _handleChange(index, values) {
    console.log(index, values);
    const currentCountry = this.props.currentCountry;
    const valuesArray = this.state[currentCountry];
    const newValuesArray = valuesArray
      .slice(0, index)
      .concat(values)
      .concat(valuesArray.slice(index + 1));
    this.setState({ [currentCountry]: newValuesArray });
  }

  handleChange(values, index) {
    this.debouncedHandleChange(index, values);
  }

  handleAddBtnClick() {
    const currentCountry = this.props.currentCountry;
    const valuesArray = this.state[currentCountry];
    const newValuesArray = valuesArray.concat({});

    this.setState({
      [currentCountry]: newValuesArray,
    });
  }

  handleDeleteBtnClick(index) {
    const currentCountry = this.props.currentCountry;
    const valuesArray = this.state[currentCountry];

    if (valuesArray.length > 1) {
      const newValuesArray = valuesArray
        .slice(0, index)
        .concat(valuesArray.slice(index + 1));

      this.setState({
        [currentCountry]: newValuesArray,
      });
    }
  }

  render() {
    console.log(this.state);
    const { currentCountry } = this.props;

    return (
      <div style={{ ...this.style.container, ...this.props.style }}>
        <ContentScrollableContainer style={this.style.contentContainer}>
          <FloatingActionButton
            mini
            primary
            style={this.style.addButton}
            onClick={this.handleAddBtnClick}
          >
            <ContentAdd />
          </FloatingActionButton>
          {this.state[currentCountry].map((defaultValues, index) => (
            <ImageSource
              key={`${currentCountry}${index}`}
              index={index}
              defaultValues={defaultValues}
              onValid={this.handleChange}
              onDelete={this.handleDeleteBtnClick}
            />
          ))}
        </ContentScrollableContainer>
      </div>
    );
  }
}

ImageSources.propTypes = {
  style: React.PropTypes.object,
  countries: React.PropTypes.array.isRequired,
  currentCountry: React.PropTypes.string.isRequired,
};

ImageSources.defaultProps = {
  style: {},
};


export default ImageSources;
