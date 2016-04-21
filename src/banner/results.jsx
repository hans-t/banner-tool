import React from 'react';
import { connect } from 'react-redux';

import BannerList from './banner-list';
import { ContentScrollableContainer } from '../common/containers';


class BannerResults extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      container: {
        position: 'relative',
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

  render() {
    return (
      <div style={{ ...this.style.container, ...this.props.style }}>
        <ContentScrollableContainer style={this.style.contentContainer}>
          <BannerList bannerIds={this.props.bannerIds} />
        </ContentScrollableContainer>
      </div>
    );
  }
}

BannerResults.propTypes = {
  style: React.PropTypes.object,
  countries: React.PropTypes.array,
  currentCountry: React.PropTypes.string,
  bannerIds: React.PropTypes.array,
};

BannerResults.defaultProps = {
  style: {},
};


export default connect(
  state => ({ bannerIds: state.bannerIds })
)(BannerResults);
