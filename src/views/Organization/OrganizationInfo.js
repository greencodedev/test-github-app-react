import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getDataFromAPI } from '@services';
import * as TYPES from '@constants/actionType.js';
import { ContributorList, RepositoryList } from '@components';

import './custom.css';

const sortTypes = [
    {
      value: 'contributions',
      label: 'Contributions',
    },
    {
      value: 'followers',
      label: 'Followers',
    },
    {
      value: 'public_repos',
      label: 'Public Repos',
    },
    {
      value: 'public_gists',
      label: 'Gists',
    },
];

function OrganizationInfo() {
    const dispatch = useDispatch();
    const storeInfo = useSelector((state) => state);

    const [ contributors, setContributors ] = useState(storeInfo ? storeInfo.contributors: []);
    const [ gitOrgName, setGitOrgName ] = useState(storeInfo ? storeInfo.gitOrgName: '');
    const [ repositories, setRepositories ] = useState(storeInfo ? storeInfo.repositories: []);

    const [ flag, setFlag ] = useState(storeInfo ? true : false);
    const [ orgName, setOrgName ] = useState(gitOrgName);
    const [ loadingFlag, setLoadingFlag ] = useState(false);
    // sort type
    const [ sortType, setSortType ] = useState('contributions');
    
    // remove duplicates from list of object
    function uniqByKeepLast(data, key) {
        return [
            ...new Map(
                data.map(x => [key(x), x])
            ).values()
        ]
    }

    // sort list of contributors
    function sortByKey(data, key) {
        return data.sort(function(a, b) {
            return b[key] - a[key];
        });
    }

    // get all of contributors in Group
    async function getAllContributors(repos) {
        var infos = [];    // list of all contributors
        await Promise.all(repos.map(async repo => {
            var conts = await getDataFromAPI(`repos/${gitOrgName}/${repo.name}/contributors`);
            infos = infos.concat(conts);
        }));
        // delete duplicated contributor info
        infos = uniqByKeepLast(infos, it => it.login)
        infos = await addInfoToPerson(infos);

        return sortByKey(infos, sortType);
    }

    // add some infors to object
    async function addInfoToPerson(conts) {
        return Promise.all(conts.map(async person => {
            const personInfo = await getDataFromAPI(`users/${person.login}`);
            return {
                ...person,
                public_repos: personInfo.public_repos,
                public_gists: personInfo.public_gists,
                followers: personInfo.followers
            }
        }));
    }

    const sortByType = (event) => {
        const conts = sortByKey(contributors, event.target.value);
        setContributors([...conts]);
        setSortType(event.target.value);
    }

    const handleChangeOrgName = (event) => {
        dispatch({
            type: TYPES.SET_ORGANIZATION_NAME,
            payload: event.target.value
        });
        setGitOrgName(event.target.value);
    }
    
    const handleSearchInformation = async () => {
        setLoadingFlag(true);
        setOrgName(gitOrgName);
        setRepositories([]);
        setContributors([]);
        // get all info
        if (gitOrgName === '') {
            setFlag(false);
        } else {
            setFlag(true);
            try {
                var orgInfo = await getDataFromAPI(`orgs/${gitOrgName}`);
                var repos = [];
                for (var i = 0; i < Math.ceil(orgInfo.public_repos/100); i++) {
                    repos = repos.concat(await getDataFromAPI(`orgs/${gitOrgName}/repos?per_page=100&page=${i + 1}`));
                }
                var allContributors = await getAllContributors(repos);  

                dispatch({
                    type: TYPES.SET_CONTRIBUTORS_ORG,
                    payload: allContributors
                });
                dispatch({
                    type: TYPES.SET_REPOSITORIES_ORG,
                    payload: repos
                });

                setRepositories([...repos]);
                setContributors([...allContributors]);            
            } catch (error) {
                alert(error);
            }
            setLoadingFlag(false);
        }
    }

    return (
        <div className="">
            {
                loadingFlag && 
                <div className="loading">
                    <CircularProgress ></CircularProgress>
                </div>
            }
            <div className="org-name-input center-content pt-50">
                <TextField
                    id="standard-basic" 
                    label="Organization Name"
                    value={gitOrgName}
                    onChange={handleChangeOrgName}
                ></TextField>
                <Button color="primary" variant="contained" onClick={handleSearchInformation}>Search</Button>
            </div>
            {
                flag &&
                <div className="org-info mt-20">
                    <div className="org-name pb-20">
                        <h2 className="name">{orgName}</h2>
                    </div>
                    <div className="org-data row pd-20 no-margin">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xs-12">
                            <RepositoryList repositories={repositories}/>
                        </div>
                        <div className="org-contributors col-sm-6 col-md-6 col-lg-6 col-xs-12">
                            <div className="title">
                                <span>All Contributors ({contributors.length})</span>
                                <div className="sort-items">
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={sortType}
                                        onChange={sortByType}
                                    >
                                    {
                                        sortTypes.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                    </TextField>
                                </div>
                            </div>
                            <ContributorList contributors={contributors} className="pd-10 contributors-list"/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default OrganizationInfo;
