import makeRequest from "./MakeFetchRequest";
const baseURL = "http://localhost:4000/timeboxes";

const FetchTimeboxesAPI = {
    getAllTimeboxes: async function(accessToken){
        const response = await makeRequest(`${baseURL}`,"GET", null, accessToken);
        const timeboxes = await response.json();
        return timeboxes;
    },
    addTimebox: async function (timeboxToAdd, accessToken){
        const response = await makeRequest(`${baseURL}`,"POST",timeboxToAdd, accessToken)
        const addedTimebox = await response.json();
        return addedTimebox;
        },
    replaceTimebox: async function (idToReplace, timeboxToReplace, accessToken){
        const response = await makeRequest(`${baseURL}/${idToReplace}`, "PUT", timeboxToReplace, accessToken)
        const replacedTimebox = await response.json();
        return replacedTimebox;
        },

    removeTimebox: async function (idToRemove, accessToken){
        await makeRequest(`${baseURL}/${idToRemove}`,"DELETE", null, accessToken)
    }
}

export default FetchTimeboxesAPI;

