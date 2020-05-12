import React from "react";
import LoginForm from "./components/LoginForm";
//import RealTimeClock from "./components/RealTimeClock";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthenticationAPI from "./api/FetchAuthenticationAPI";
import AuthenticationContext from "./contexts/AuthenticationContext";
const AuthenticatedApp = React.lazy(() => import("./components/AuthenticatedApp"));

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
            <AuthenticationContext.Provider 
              value={{
                accessToken: this.state.accessToken,
                onLogout: this.handleLogout,
              }}>
              <React.Suspense fallback="Ładuję aplikację...">
               <AuthenticatedApp/> 
              </React.Suspense>
            </AuthenticationContext.Provider>
            :
            <AuthenticationContext.Provider 
            value={{
              onLoginAttempt: this.handleLoginAttempt
            }}>
            <LoginForm 
              errorMessage={this.state.previousLoginAttemptFailed ? "Nie udało się zalogować" : null} 
              >
            </LoginForm>
            </AuthenticationContext.Provider>
            }
          </ErrorBoundary>
      </div>
    )
  }
}

export default App;