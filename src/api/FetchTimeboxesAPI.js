const baseURL = "http://localhost:4000/timeboxes"

const FetchTimeboxesAPI = {
    getAllTimeboxes: async function(){
        const response = await makeRequest(`${baseURL}`,"GET");
        const timeboxes = await response.json();
        return timeboxes;
    },
    addTimebox: async function (timeboxToAdd){
        const response = await makeRequest(`${baseURL}`,"POST",timeboxToAdd)
        const addedTimebox = await response.json();
        return addedTimebox;
        },
    replaceTimebox: async function (idToReplace, timeboxToReplace){
        const response = await makeRequest(`${baseURL}/${idToReplace}`, "PUT", timeboxToReplace)
        const replacedTimebox = await response.json();
        return replacedTimebox;
        },

    removeTimebox: async function (idToRemove){
        await makeRequest(`${baseURL}/${idToRemove}`,"DELETE")
    }
}

export default FetchTimeboxesAPI;

async function makeRequest(url,method,body){
    const response = await window.fetch(url,{
        method: method,
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    });
    if (!response.ok){
        throw new Error("Something went wrong!")
    }
    return response;
}