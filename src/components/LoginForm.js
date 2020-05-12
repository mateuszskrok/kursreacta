import React from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";

class LoginForm extends React.Component{

    constructor(props){
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.context.onLoginAttempt({
            email: this.emailInput.current.value,
            password: this.passwordInput.current.value
        });
        this.emailInput.current.value = "";
        this.passwordInput.current.value = "";

    }

    render(){
    return (
        <form onSubmit={this.handleSubmit} className="LoginForm">
            {this.props.errorMessage ?
            <div class="LoginForm__error-message">{this.props.errorMessage}</div> : null}
            <label>E-mail
            <input
                type="text"
                ref={this.emailInput}
                defaultValue="bob@example.com"
            />
            </label><br />
            <label>Password 
            <input 
                type="password"
                ref={this.passwordInput}
                defaultValue="secret"
            />
            </label><br />
            <button>
                Zaloguj
            </button>
    
        </form>
    )
    }
    
}

LoginForm.contextType = AuthenticationContext;

export default LoginForm;