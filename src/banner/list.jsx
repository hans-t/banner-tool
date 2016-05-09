import React from 'react';
import BannerView from './view';


const styles = {
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
    padding: '1px 0 0 1px',
    whiteSpace: 'nowrap',
  },
};


const BannerList = ({
  bannerIds,
  sizeStr,
  propsById,
  images,
  imageSetsById,
  handleBannerClick,
}) => (
  <div style={styles.container}>
    <p style={styles.header}>{sizeStr}</p>
    <div style={styles.content}>
      {bannerIds.map(bannerId => {
        const { id, selected, index } = bannerId;
        return (
          <BannerView
            key={id}
            images={images}
            selected={selected}
            onClick={() => handleBannerClick(index)}
            imageSets={imageSetsById[id]}
            properties={propsById[id]}
          />
        );
      })}
    </div>
  </div>
);

BannerList.propTypes = {
  handleBannerClick: React.PropTypes.func.isRequired,
  sizeStr: React.PropTypes.string.isRequired,
  bannerIds: React.PropTypes.array.isRequired,
  propsById: React.PropTypes.object.isRequired,
  images: React.PropTypes.array.isRequired,
  imageSetsById: React.PropTypes.object.isRequired,
};


export default BannerList;
