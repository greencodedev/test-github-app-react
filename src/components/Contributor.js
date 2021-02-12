import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as TYPES from '../constants/actionType.js';
import './components.css';

function Contributor(props) {
    const contributorInfo = props.data;
    const history = useHistory();
    const dispatch = useDispatch();

    const selectContributor = (contibutor) => {
        dispatch({
            type: TYPES.SET_SELECTED_CONT_NAME,
            payload: contibutor.login
        });
        history.push('/contributor/' + contibutor.login);
    }

    return (
        <div className="item pd-10 mbt-5 contributor-info">
            { contributorInfo &&
                <div className="item-info flex-display">
                    <div className="info-title main-title" onClick={() => selectContributor(contributorInfo)}>
                        <div>
                            <img src={contributorInfo.avatar_url} width={50} height={50}/>
                        </div>
                        <div className="ml-10">
                            <h6>{contributorInfo.login}</h6>
                            <div className="detail-info">
                                <div>
                                    <span>contributions: <b>{contributorInfo.contributions}</b></span>
                                </div>
                                <div className="ml-10">
                                    <span>repos: <b>{contributorInfo.public_repos}</b></span>
                                </div>
                                <div className="ml-10">
                                    <span>followers: <b>{contributorInfo.followers}</b></span>
                                </div>
                                <div className="ml-10">
                                    <span>gists: <b>{contributorInfo.public_gists}</b></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="info-title">
                        <a href={contributorInfo.html_url} target="_blank" rel="noreferrer">
                            Details
                        </a>
                    </div>
                </div>
            }
        </div>
    );
}

export default Contributor;