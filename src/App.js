import React from "react";
import LoginForm from "./components/LoginForm";
import TimeboxList from "./components/TimeboxList";
import EditableTimebox from "./components/EditableTimebox";
//import RealTimeClock from "./components/RealTimeClock";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthenticationAPI from "./api/FetchAuthenticationAPI";
import FetchAuthenticationAPI from "./api/FetchAuthenticationAPI";
import jwt from "jsonwebtoken";

class App extends React.Component{

  state = {
    accessToken: null,
    previousLoginAttemptFailed: false
  }

  isUserLoggedIn(){
    return this.state.accessToken;
  }

  getUserEmail(){
    const decoded = jwt.decode(this.state.accessToken)
    return decoded.email
  }

  handleLogout = () => {
    this.setState({
      accessToken: null,
      previousLoginAttemptFailed: false})
  }

  handleLoginAttempt = (credentials) => {
    FetchAuthenticationAPI.login(credentials).then(
      ({accessToken}) => this.setState({
        accessToken,
        previousLoginAttemptFailed: false
      })
    ).catch(
      () => this.setState({previousLoginAttemptFailed: true})
    )
  }

  render(){
    return (
      <div className="App">
          <ErrorBoundary message="Coś nie działa w całej aplikacji">
            {this.isUserLoggedIn() ?
              <>
              <header className="header"> Witaj {this.getUserEmail()}
                <a onClick={this.handleLogout} href="#" className="header__logout-link">Wyloguj się</a>
              </header>
              <TimeboxList accessToken={this.state.accessToken}/>
              <EditableTimebox/>
              </> :
            <LoginForm errorMessage={this.state.previousLoginAttemptFailed ? "Nie udało się zalogować" : null} onLoginAttempt={this.handleLoginAttempt}></LoginForm>}
          </ErrorBoundary>
      </div>
    )
  }
}

export default App;