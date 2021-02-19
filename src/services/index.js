import Axios from 'axios';

const host = 'https://api.github.com/';

export async function getDataFromAPI(uri) {
    return await Axios.get(
        host + uri,
        {
            headers: { 
                "Authorization": "Bearer [token]"
            },
        }
    ).then(response => response.data);
}
