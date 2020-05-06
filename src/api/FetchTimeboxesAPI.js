const baseURL = "http://localhost:4000/timeboxes"

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

async function makeRequest(url,method,body,accessToken){
    const jsonBody = body ? JSON.stringify(body) : undefined
    const headers = {
        "Content-Type":"application/json"
    } 
    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`
    }
    const response = await window.fetch(url,{
        method,
        headers,
        body: jsonBody
    });
    if (!response.ok){
        throw new Error("Something went wrong!")
    }
    console.log(response)
    return response;
}