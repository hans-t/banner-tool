import React from 'react';
import BannerView from './view';


class BannerList extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        padding: '10px 5px 5px 5px',
      },
      header: {
        margin: 0,
        marginBottom: 6,
      },
      content: {
        width: '100%',
        overflowX: 'auto',
        margin: 0,
        padding: 0,
        whiteSpace: 'nowrap',
      },
    };
  }

  render() {
    const { bannerIds, sizeStr, currentCountry } = this.props;
    return (
      <div style={this.styles.container}>
        <p style={this.styles.header}>{sizeStr}</p>
        <div style={this.styles.content}>
          {bannerIds.map(id => (
            <BannerView
              key={id}
              id={id}
              currentCountry={currentCountry}
            />
          ))}
        </div>
      </div>
    );
  }
}

BannerList.propTypes = {
  bannerIds: React.PropTypes.array.isRequired,
  sizeStr: React.PropTypes.string.isRequired,
  currentCountry: React.PropTypes.string.isRequired,
};


export default BannerList;
