import axios from "axios";
const baseURL = "http://localhost:4000/timeboxes";

const AxiosTimeboxesAPI = {
    getAllTimeboxes: async function(){
        const response = await axios.get(baseURL);
        const timeboxes = response.data;
        return timeboxes;
    },
    addTimebox: async function (timeboxToAdd){
        const response = await axios.post(baseURL, timeboxToAdd);
        const addedTimebox = response.data;
        return addedTimebox;
        },
    replaceTimebox: async function (idToReplace, timeboxToReplace){
        const response = await axios.put(`${baseURL}/${idToReplace}`, timeboxToReplace);
        const replacedTimebox = response.data;
        return replacedTimebox;
        },

    removeTimebox: async function (idToRemove){
        await axios.delete(`${baseURL}/${idToRemove}`);
    }
}

export default AxiosTimeboxesAPI;
