const baseURL = "http://localhost:4000/login"

const FetchAuthenticationAPI = {
    
    login: async function (credentials){
        const response = await makeRequest(`${baseURL}`,"POST",credentials)
        const authenticationToken = await response.json();
        return authenticationToken;
        },

}

export default FetchAuthenticationAPI;

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