import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Contributor } from '../../components';
import { getDataFromAPI } from '../../services';

function RepositoryDetails() {
    const [ repositoryInfo, setRepositoryInfo ] = useState(null);
    const [ contributors, setContributors ] = useState([]);
    const [ loadingFlag, setLoadingFlag ] = useState(true);
    // const repositories = [];
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            if (loadingFlag) {
                // parse uri
                const current_url = window.location.href.split('/');

                // get repo info
                var uri_repoAPI = `repos/${current_url[current_url.length - 2]}/${current_url[current_url.length - 1]}`;
                const info = await getDataFromAPI(uri_repoAPI);
                const conts = await getDataFromAPI(uri_repoAPI + '/contributors');

                setRepositoryInfo(info);
                setContributors(conts);
                setLoadingFlag(false);
            }
        }
        fetchData();
    }, []);

    return (
        <>
        {
            loadingFlag && 
            <div className="loading">
                <CircularProgress ></CircularProgress>
            </div>
        }
        <div className="page-title pt-30">
            <h3>Repository Details</h3>
            <Button variant="contained" color="default" onClick={() => history.goBack()}>Go Back</Button>
        </div>
        { repositoryInfo ? 
            <div className="details org-info pd-10 mt-30">
                <div className="row pd-20 no-margin">
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">
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
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12">
                        <div className="title">
                            <span>Contributors</span>
                        </div>
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
                    </div>
                </div>
            </div> :
            <div className="error-text">
                <p>{loadingFlag ? 'Loading....' : 'Wrong Data'}</p>
            </div>
        }
        </>
    )
}

export default RepositoryDetails;