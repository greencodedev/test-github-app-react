import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Repository } from '../../components';
import { getDataFromAPI } from '../../services';

function ContributorDetails() {
    // const storeInfo = useSelector(state => state);
    const [ contributorInfo, setContributorInfo ] = useState(null);
    const [ repositories, setRepositories ] = useState([]);
    const [ loadingFlag, setLoadingFlag ] = useState(true);
    // const repositories = [];
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            if (loadingFlag) {
                // parse uri
                const current_url = window.location.href.split('/');
                // get repo info
                var uri_userAPI = `users/${current_url[current_url.length - 1]}`;
                // var uri_userAPI = `users/${storeInfo.selectedContName}`;
                const info = await getDataFromAPI(uri_userAPI);
                const conts = await getDataFromAPI(uri_userAPI + '/repos');
    
                setContributorInfo(info);
                setRepositories(conts);
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
            <h3>Contributor Details</h3>
            <Button variant="contained" color="default" onClick={() => history.goBack()}>Go Back</Button>
        </div>
        { contributorInfo ? 
            <div className="details org-info pd-10 mt-10">
                <div className="row pd-20 no-margin">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xs-12">
                        <div className="main-info">
                            <div className="avatar">
                                <img src={contributorInfo.avatar_url} width={250} height={250}/>
                            </div>
                            <div className="infor ml-20">
                                <a href={contributorInfo.html_url ? contributorInfo.html_url : "https://github.com/404"} target="_blank" rel="noreferrer">
                                    <h4>{contributorInfo.name ? contributorInfo.name : contributorInfo.login}</h4>
                                </a>
                                <span>email: {contributorInfo.email}</span><br />
                                <span>Location: {contributorInfo.location}</span><br />
                                <span>Company: {contributorInfo.company}</span><br />
                            </div>
                        </div>
                        <div className="other-info mt-20">
                            <div className="">
                                <span>Followers : </span>
                                <span>{contributorInfo.followers}</span>
                            </div>
                            <div className="">
                                <span>Following : </span>
                                <span>{contributorInfo.following}</span>
                            </div>
                            <div className="">
                                <span>Gists : </span>
                                <span>{contributorInfo.public_gists}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xs-12">
                        <div className="title">
                            <span>Repositories({contributorInfo.public_repos})</span>
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
                </div>
            </div> :
            <div className="error-text">
                <p>{loadingFlag ? 'Loading....' : 'Wrong Data'}</p>
            </div>
        }
        </>
    )
}

export default ContributorDetails;