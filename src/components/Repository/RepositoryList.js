import React from 'react';

import { Repository } from '@components';
import PropTypes from 'prop-types';

function RepositoryList({repositories}) {
    return (
        <div>
            <div className="title">
                <span>Repositories({repositories.length})</span>
            </div>
            <div className="repos-list list-content">
            {
                repositories.length > 0 ?
                    repositories.map((repo, index) => (
                        <Repository data={repo} key={index}></Repository>
                    )) :
                    <div className="error-text">
                        <span>No Repository</span>
                    </div>
            }
            </div>
        </div>
    )
}

RepositoryList.propTypes = {
    repositories: PropTypes.array
}

export default RepositoryList;