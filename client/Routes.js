import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import SetupPage from "./pages/Setup";
import JoinPage from "./pages/Join";

export default (props) => {
  return <Switch>
    <Route key="root" path="/" exact render={() => <Redirect to="/join"/> }/>
    <Route key="create" path="/create" exact component={JoinPage} />
    <Route key="join" path="/join" exact component={JoinPage} />
    <Route key="setup" path="/setup" exact component={SetupPage} />
  </Switch>
}
