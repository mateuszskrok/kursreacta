import React from "react";
import { v4 as uuidv4 } from 'uuid'; 

class TimeboxCreator extends React.Component{

    constructor(props){
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
        this.state={
            creatorActive: false
        }
    }
    handleCancel = (event) => {
        event.preventDefault(); 
        this.setState({creatorActive: false});
    }
    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.onCreate({
            id: uuidv4(), 
            title: this.titleInput.current.value, 
            totalTimeInMinutes: this.totalTimeInMinutesInput.current.value
            });
            this.setState({creatorActive: false});
            this.titleInput.current.value = "";
            this.totalTimeInMinutesInput.current.value = "";
    }

    handleActivateCreator = () => {
        this.setState({creatorActive: true});
    }
    render(){
        return (
            <>
            {this.state.creatorActive ?
            <form onSubmit={this.handleSubmit} className="TimeboxCreator">
                <label>Co robisz?
                <input
                    ref={this.titleInput}
                    type="text"
                />
                </label><br />
                <label>Ile minut? 
                <input 
                    ref={this.totalTimeInMinutesInput}
                    type="number"
                    defaultValue={25}
                    
                />
                </label><br />
                <button onClick={this.handleCancel}>
                        Anuluj
                </button>
                <button>
                        Dodaj Timebox
                </button>

            </form> :
            <div className="TimeboxCreator">
                <button class="plusButton" onClick={this.handleActivateCreator}>
                    +
                </button>
            </div>}
            </>
        )
    }
}
export default TimeboxCreator;