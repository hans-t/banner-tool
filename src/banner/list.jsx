import React from 'react';
import BannerView from './view';


class BannerList extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        width: '100%',
        overflowX: 'auto',
        margin: '0 0 24px 0',
        outline: '1px solid black',
        padding: '5px 2px 0',
        whiteSpace: 'nowrap',
      },
    };
  }

  render() {
    const { bannerIds, sizeStr } = this.props;
    return (
      <div>
        <p>{sizeStr}</p>
        <div style={this.styles.container}>
          {bannerIds.map(id => (
            <BannerView key={id} id={id} />
          ))}
        </div>
      </div>
    );
  }
}

BannerList.propTypes = {
  bannerIds: React.PropTypes.array.isRequired,
  sizeStr: React.PropTypes.string.isRequired,
};


export default BannerList;
