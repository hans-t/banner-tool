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
    const { bannerIds, sizeStr, propsById, images, setSelection } = this.props;
    return (
      <div style={this.styles.container}>
        <p style={this.styles.header}>{sizeStr}</p>
        <div style={this.styles.content}>
          {bannerIds.map(bannerId => {
            const { id, selected, index } = bannerId;
            return (
              <BannerView
                key={id}
                id={id}
                images={images}
                selected={selected}
                properties={propsById[id]}
                onClick={() => setSelection(index)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

BannerList.propTypes = {
  sizeStr: React.PropTypes.string.isRequired,
  bannerIds: React.PropTypes.array.isRequired,
  propsById: React.PropTypes.object.isRequired,
  setSelection: React.PropTypes.func.isRequired,
  images: React.PropTypes.array.isRequired,
};


export default BannerList;
