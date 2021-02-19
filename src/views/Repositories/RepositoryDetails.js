import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getDataFromAPI } from '@services';
import { RepositoryInfo, ContributorList } from '@components';

function RepositoryDetails() { 
    const history = useHistory();
    const [ repositoryInfo, setRepositoryInfo ] = useState(null);
    const [ contributors, setContributors ] = useState([]);
    const [ loadingFlag, setLoadingFlag ] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (loadingFlag) {
                // parse uri
                const current_url = window.location.href.split('/');
                try {
                    // get repo info
                    var uri_repoAPI = `repos/${current_url[current_url.length - 2]}/${current_url[current_url.length - 1]}`;
                    const info = await getDataFromAPI(uri_repoAPI);
                    const conts = await getDataFromAPI(uri_repoAPI + '/contributors');

                    setRepositoryInfo(info);
                    setContributors(conts);
                } catch (error) {
                    alert(error);
                }
                setLoadingFlag(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className="page-title pt-30">
                <h3>Repository Details</h3>
                <Button variant="contained" color="default" onClick={() => history.goBack()}>Go Back</Button>
            </div>
            {
                loadingFlag ? 
                <div className="loading">
                    <CircularProgress></CircularProgress>
                </div> :
                <div>
                    { repositoryInfo ?
                        <div className="details org-info pd-10 mt-30">
                            <div className="row pd-20 no-margin">
                                <div className="col-sm-12 col-md-6 col-lg-6 col-xs-12">
                                    <RepositoryInfo repoInfo={repositoryInfo}/>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6 col-xs-12">
                                    <div className="title">
                                        <span>Contributors({contributors.length})</span>
                                    </div>
                                    <ContributorList contributors={contributors}/>
                                </div>
                            </div>
                        </div> :
                        <div className="error-text">
                            <p>Wrong Data</p>
                        </div>
                    }
                </div>
            }            
        </div>
    )
}

export default RepositoryDetails;