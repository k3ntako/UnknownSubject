import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import SetupPage from "./pages/Setup";
import StartPage from "./pages/Start";

export default (props) => {
  return <Switch>
    <Route key="root" path="/" exact render={() => <Redirect to="/join"/> }/>
    <Route key="create" path="/create" exact component={StartPage} />
    <Route key="join" path="/join" exact component={StartPage} />
    <Route key="setup" path="/room/:roomId/setup" exact component={SetupPage} />
  </Switch>
}
