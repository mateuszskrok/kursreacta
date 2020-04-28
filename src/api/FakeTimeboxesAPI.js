import { v4 as uuidv4 } from 'uuid';

function wait(ms=1000){
    return new Promise(
        (resolve) => {
            setTimeout(resolve,ms);
        }
    )
}

const timeboxes = [
    {
      "id": 1,
      "title": "Uczę się Reacta",
      "totalTimeInMinutes": 25,
      "isEditable": false
    },
    {
      "id": 2,
      "title": "Uczę się grać",
      "totalTimeInMinutes": 15,
      "isEditable": false
    },
    {
      "id": 3,
      "title": "Uczę się list",
      "totalTimeInMinutes": 2,
      "isEditable": false
    }]

function findIndexByAnId(id){
    const result = timeboxes.findIndex((timebox) => timebox.id === id)
    console.log("szukam", id, "w tablicy: ", timeboxes)
    if (result < 0) {
        throw new Error("Timebox o podanym id nie istnieje")
    }
    return result;
}    
const FakeTimeboxesAPI = {
    getAllTimeboxes: async function(){
        await wait(1000);
        console.log("GET: ", timeboxes);
        return [...timeboxes]
    },
    addTimebox: async function (timeboxToAdd){
        await wait(1000);
        const addedTimebox = {...timeboxToAdd, id: uuidv4()}
        timeboxes.push(addedTimebox);
        console.log("POST: ", timeboxes);
        return addedTimebox;
        },
    replaceTimebox: async function (idToReplace, timeboxToReplace){
        if (!idToReplace) {
            throw new Error("Cannot replace timebox without an id")
        }
        await wait(1000);
        const index = findIndexByAnId(idToReplace);

        const replacedTimebox = timeboxToReplace;
        timeboxes[index] = replacedTimebox;
        console.log("PATCH: ", timeboxes);
        return replacedTimebox;
        },
    removeTimebox: async function (idToRemove){
        if (!idToRemove) {
            throw new Error("Cannot remove timebox without an id")
        }
        await wait(1000);
        const index  = findIndexByAnId(idToRemove);
        timeboxes.splice(index,1);
        console.log("DELETE: ", timeboxes);
    }
}

export default FakeTimeboxesAPI;