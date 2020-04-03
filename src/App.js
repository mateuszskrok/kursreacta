import React from "react";
import { TimeboxList, EditableTimebox } from "./components/remaining-components"

function App(){
    return (
      <div className="App">
          <TimeboxList/>
          <EditableTimebox/>
      </div>
    )
}

export default App;