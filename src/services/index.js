import Axios from 'axios';

const host = 'https://api.github.com/';

export async function getDataFromAPI(uri) {
    let retItems;
    
    await Axios.get(
        host + uri,
        {
            headers: { 
                "Authorization": "Bearer [your-github-key]"
            },
        }
    ).then(response => {
        retItems = response.data;
    });
    return retItems;
}
