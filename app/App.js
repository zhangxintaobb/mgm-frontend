/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./compontents/login/login-page";

const MainRouteSwitch = withRouter(props => {
  console.log("props", props);
  const defaultPage = "login";
  return (
    <div style={{ height: "100vh" }}>
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to={defaultPage} />
      </Switch>
    </div>
  );
});

class App extends Component {
  render() {
    return (
      <Router>
        <MainRouteSwitch />
      </Router>
    );
  }
}

export default App;
