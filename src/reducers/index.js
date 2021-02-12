import * as TYPES from '../constants/actionType.js';

const initialState = {
    gitOrgName: '',
    repositories: [],
    contributors: [],
    selectedRepoName: '',
    selectedContName: ''
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case TYPES.SET_ORGANIZATION_NAME: { 
            const orgName = action.payload;
            
            return {
                ...state,
                gitOrgName: orgName
            };
        }
        case TYPES.SET_CONTRIBUTORS_ORG: {
            const contributors = action.payload;
            return {
                ...state,
                contributors
            };
        }
        case TYPES.SET_REPOSITORIES_ORG: {
            console.log("repositories =>", action.payload);
            const repositories = action.payload;
            return {
                ...state,
                repositories
            }
        }
        case TYPES.SET_SELECTED_REPO_NAME: {
            const repoName = action.payload;
            return {
                ...state,
                selectedRepoName: repoName
            }
        }
        case TYPES.SET_SELECTED_CONT_NAME: {
            const contName = action.payload;
            return {
                ...state,
                selectedContName: contName
            }
        }
        default:
            break;
    }
}

export default reducer;