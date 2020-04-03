import React from "react";
import TimeboxList from "./components/TimeboxList";
import EditableTimebox from "./components/EditableTimebox";

function App(){
    return (
      <div className="App">
          <TimeboxList/>
          <EditableTimebox/>
      </div>
    )
}

export default App;