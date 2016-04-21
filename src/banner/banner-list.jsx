import React from 'react';
import BannerView from './banner-view';


class BannerList extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        width: '100%',
        overflowX: 'auto',
        margin: '0 0 24px 0',
        outline: '1px solid black',
      },
    };
  }

  render() {
    const { bannerIds } = this.props;

    return (
      <div style={this.styles.container}>
        {bannerIds.map(id => (
          <BannerView key={id} id={id} />
        ))}
      </div>
    );
  }
}

BannerList.propTypes = {
  bannerIds: React.PropTypes.array.isRequired,
};


export default BannerList;
