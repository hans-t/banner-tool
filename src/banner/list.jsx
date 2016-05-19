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
  size,
  propsById,
  images,
  imageSetsById,
  handleBannerClick,
  textsById,
  country,
}) => (
  <div style={styles.container}>
    <p style={styles.header}>{size}</p>
    <div style={styles.content}>
      {bannerIds.map(bannerId => {
        const { id, selected, index } = bannerId;
        return (
          <BannerView
            key={id}
            id={id}
            size={size}
            country={country}
            images={images}
            selected={selected}
            handleClick={banner => handleBannerClick({ index, banner })}
            imageSets={imageSetsById[id]}
            properties={propsById[id]}
            texts={textsById[id]}
          />
        );
      })}
    </div>
  </div>
);

BannerList.propTypes = {
  country: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
  bannerIds: React.PropTypes.array.isRequired,
  textsById: React.PropTypes.object.isRequired,
  propsById: React.PropTypes.object.isRequired,
  images: React.PropTypes.array.isRequired,
  imageSetsById: React.PropTypes.object.isRequired,
  handleBannerClick: React.PropTypes.func.isRequired,
};


export default BannerList;
