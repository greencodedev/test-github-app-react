import { createStore } from 'redux';
import reducer from '../reducers';

let preloadedState;
const persistedData = localStorage.getItem('gitInfos');

if (persistedData) {
    preloadedState = {
        infos: JSON.parse(persistedData)
    }
}

const store = createStore(reducer, preloadedState);

export default store;