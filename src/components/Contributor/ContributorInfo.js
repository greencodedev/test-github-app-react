import React, { Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

const AvatarLazyComponent = React.lazy(() => import('@components/Avatar/Avatar'));

function ContributorInfo({contInfo}) {
    const contributorInfo = contInfo;

    return (
        <div>
            <div className="main-info">
                <div className="avatar">
                    <Suspense fallback={<CircularProgress color="secondary" />}>
                        <AvatarLazyComponent avatar_url={contributorInfo.avatar_url} altName={contributorInfo.login} width={250} height={250}/>
                    </Suspense>
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
    )
}

ContributorInfo.propTypes = {
    contInfo: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        avatar_url: PropTypes.string,
        login: PropTypes.string,
        html_url: PropTypes.string,
        company: PropTypes.string,
        location: PropTypes.string,
        following: PropTypes.number,
        followers: PropTypes.number,
        public_gists: PropTypes.number,
    }),
}

export default ContributorInfo;