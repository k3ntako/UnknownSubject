import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/Home";
import JoinPage from "./pages/Join";

export default (props) => {
  return <Switch>
    <Route key="root" path="/" exact render={() => <Redirect to="/join"/> }/>
    <Route key="join" path="/join" exact component={JoinPage} />
    <Route key="home" path="/home" exact component={HomePage} />
  </Switch>
}
