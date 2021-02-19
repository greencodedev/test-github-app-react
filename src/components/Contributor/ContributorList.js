import React from 'react';
import PropTypes from 'prop-types';

import { Contributor } from '@components';

function ContributorList({contributors}) {
    return (
        <div className="repos-list list-content">
        {
            contributors.length > 0 ?
                contributors.map((contributor, index) => (
                    <Contributor data={contributor} key={index}></Contributor>
                )) :
                <div className="error-text">
                    <span>No contributor</span>
                </div>
        }
        </div>        
    )
}

ContributorList.propTypes = {
    contributors: PropTypes.array
}

export default ContributorList;