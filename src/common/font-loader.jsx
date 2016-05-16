import React from 'react';


/**
 * Force font to load.
 * According to: http://stackoverflow.com/a/2756611/3118765
 */

const FontLoader = ({ fontFamily }) => (
    <span style={{ fontFamily }}>.</span>
);

FontLoader.propTypes = {
  fontFamily: React.PropTypes.string,
};


export default FontLoader;
