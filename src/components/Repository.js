import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as TYPES from '../constants/actionType.js';
import './components.css';

function Repository(props) {
    const repoInfo = props.data;
    const history = useHistory();
    const dispatch = useDispatch();

    const changeDate = (date) => {
        date = date.replace("T", " ");
        date = date.replace("Z", "");
        return date;
    }

    const selectRepo = (repo) => {
        dispatch({
            type: TYPES.SET_SELECTED_REPO_NAME,
            payload: repo.name
        });
        history.push(`/repository/${repo.owner.login}/${repo.name}`);
    }

    return (
        <div className="item pd-10 mbt-5">
            { repoInfo &&
                // <a href={repoInfo.html_url} target="_blank">
                    <div className="item-info flex-display">
                        <div className="info-title main-title" onClick={() => selectRepo(repoInfo)}>
                            <h5>{repoInfo.full_name}</h5>
                            <span className="description">{repoInfo.description}</span><br />
                            <span>language: <b>{repoInfo.language}</b></span>
                        </div>
                        <div className="info-title">
                            <span>Updated at <b>{changeDate(repoInfo.updated_at)}</b></span><br/>
                            <a href={repoInfo.html_url} target="_blank" rel="noreferrer">
                                Details
                            </a>
                        </div>
                    </div>
                // </a>
            }
        </div>
    );
}

export default Repository;