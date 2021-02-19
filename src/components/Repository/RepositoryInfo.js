import React from 'react';
import PropTypes from 'prop-types';

function RepositoryInfo({repoInfo}) {
    const repositoryInfo = repoInfo;

    return (
        <div>
            <div className="main-info">
                <div className="infor ml-20">
                    <a href={repositoryInfo.html_url ? repositoryInfo.html_url : "https://github.com/404"} target="_blank" rel="noreferrer"><h4>{repositoryInfo.full_name}</h4></a>
                    <span>{repositoryInfo.description}</span><br />
                    <span>Owner: {repositoryInfo.owner.login}</span><br />
                    <span>Language: {repositoryInfo.language}</span><br />
                </div>
            </div>
            <div className="other-info mt-20 ml-20">
                <span>Forks : </span>&nbsp;
                <span>{repositoryInfo.forks}</span>&nbsp;&nbsp;&nbsp;
                <span>Watchers : </span>&nbsp;
                <span>{repositoryInfo.watchers}</span>
            </div>
        </div>
    )
}

RepositoryInfo.propTypes = {
    repoInfo: PropTypes.shape({
        html_url: PropTypes.string,
        full_name: PropTypes.string,
        description: PropTypes.string,
        language: PropTypes.string,
        forks: PropTypes.number,
        watchers: PropTypes.number,
        owner: PropTypes.shape({
            login: PropTypes.string
        })
    })
}

export default RepositoryInfo;