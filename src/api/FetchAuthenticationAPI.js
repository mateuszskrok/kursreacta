import makeRequest from "./MakeFetchRequest";
const baseURL = "http://localhost:4000/login";

const FetchAuthenticationAPI = {
    
    login: async function (credentials){
        const response = await makeRequest(`${baseURL}`,"POST",credentials)
        const authenticationToken = await response.json();
        return authenticationToken;
        },

}

export default FetchAuthenticationAPI;