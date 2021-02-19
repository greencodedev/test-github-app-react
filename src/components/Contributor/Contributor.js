import React, { Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as TYPES from '@constants/actionType.js';
import '../components.css';

const AvatarLazyComponent = React.lazy(() => import('@components/Avatar/Avatar'));

function Contributor({data}) {
    const contributorInfo = data;
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
                        <Suspense fallback={<CircularProgress color="secondary" />}>
                            <AvatarLazyComponent avatar_url={contributorInfo.avatar_url} altName={contributorInfo.login} width={50} height={50}/>
                        </Suspense>
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

Contributor.propTypes = {
    data: PropTypes.shape({
        avatar_url: PropTypes.string,
        login: PropTypes.string,
        html_url: PropTypes.string,
        contributions: PropTypes.number,
        public_repos: PropTypes.number,
        followers: PropTypes.number,
        public_gists: PropTypes.number,
    }),
}
export default Contributor;