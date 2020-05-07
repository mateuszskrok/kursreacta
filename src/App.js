import React from "react";
import LoginForm from "./components/LoginForm";
//import RealTimeClock from "./components/RealTimeClock";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthenticationAPI from "./api/FetchAuthenticationAPI";
import AuthenticatedApp from "./components/AuthenticatedApp"
import AuthenticationContext from "./contexts/AuthenticationContext";

class App extends React.Component{

  state = {
    accessToken: null,
    previousLoginAttemptFailed: false
  }

  isUserLoggedIn(){
    return this.state.accessToken;
  }

  handleLogout = () => {
    this.setState({
      accessToken: null,
      previousLoginAttemptFailed: false})
  }

  handleLoginAttempt = (credentials) => {
    AuthenticationAPI.login(credentials).then(
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
            <AuthenticationContext.Provider value={this.state.accessToken}>
                <AuthenticatedApp onLogout={this.handleLogout} /> 
            </AuthenticationContext.Provider>
            :
            <LoginForm errorMessage={this.state.previousLoginAttemptFailed ? "Nie udało się zalogować" : null} onLoginAttempt={this.handleLoginAttempt}></LoginForm>}
          </ErrorBoundary>
      </div>
    )
  }
}

export default App;