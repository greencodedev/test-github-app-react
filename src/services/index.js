import Axios from 'axios';

const host = 'https://api.github.com/';

export async function getDataFromAPI(uri) {
    return await Axios.get(
        host + uri,
        {
            headers: { 
                "Authorization": "Bearer a640af9aa839845c6abcb79d2fc8f29f95e79e3b"
            },
        }
    ).then(response => response.data);
}