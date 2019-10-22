import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

// Pages
import StartPage from "./pages/Start";
import SetupPage from "./pages/Setup";
import GamePage from "./pages/Game";
import DonePage from "./pages/Done";

export default (props) => {
  return <Switch>
    <Route key="root"   path="/" exact render={() => <Redirect to="/join"/> }/>
    <Route key="create" path="/create" exact component={StartPage} />
    <Route key="join"   path="/join" exact component={StartPage} />
    <Route key="setup"  path="/room/:roomId/setup" exact component={SetupPage} />
    <Route key="game"   path="/room/:roomId/game" exact component={GamePage} />
    <Route key="done"   path="/room/:roomId/done" exact component={DonePage} />
  </Switch>
}
