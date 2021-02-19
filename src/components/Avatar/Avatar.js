import React from 'react';
import PropTypes from 'prop-types';

function Avatar({avatar_url, altName, width, height}) {
    return (
        <div>
            <img src={avatar_url} alt={altName} width={width} height={height}/>
        </div>
    )
}

Avatar.propTypes = {
    avatar_url: PropTypes.string,
    altName: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
}

export default Avatar;