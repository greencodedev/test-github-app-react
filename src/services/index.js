import Axios from 'axios';

const host = 'https://api.github.com/';

export async function getDataFromAPI(uri) {
    let retItems;
    
    await Axios.get(
        host + uri,
        {
            headers: { 
                "Authorization": "Bearer d4a1b13447a21df247a971101e57fc3212970dd1"
            },
        }
    ).then(response => {
        retItems = response.data;
    });
    return retItems;
}