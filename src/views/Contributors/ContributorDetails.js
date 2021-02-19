import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getDataFromAPI } from '@services';
import { ContributorInfo, RepositoryList} from '@components';

function ContributorDetails() {
    const history = useHistory();
    const [ contributorInfo, setContributorInfo ] = useState(null);
    const [ repositories, setRepositories ] = useState([]);
    const [ loadingFlag, setLoadingFlag ] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (loadingFlag) {
                // parse uri
                const current_url = window.location.href.split('/');
                // get repo info
                try {
                    var uri_userAPI = `users/${current_url[current_url.length - 1]}`;
                    // var uri_userAPI = `users/${storeInfo.selectedContName}`;
                    const info = await getDataFromAPI(uri_userAPI);
                    const conts = await getDataFromAPI(uri_userAPI + '/repos');
        
                    setContributorInfo(info);
                    setRepositories(conts);
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
                <h3>Contributor Details</h3>
                <Button variant="contained" color="default" onClick={() => history.goBack()}>Go Back</Button>
            </div>
            {
                loadingFlag ? 
                <div className="loading">
                    <CircularProgress></CircularProgress>
                </div> :
                <div>
                    { contributorInfo ?
                        <div className="details org-info pd-10 mt-30">
                            <div className="row pd-20 no-margin">
                                <div className="col-sm-12 col-md-6 col-lg-6 col-xs-12">
                                    <ContributorInfo contInfo={contributorInfo}/>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6 col-xs-12">
                                    <RepositoryList repositories={repositories}/>
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

export default ContributorDetails;