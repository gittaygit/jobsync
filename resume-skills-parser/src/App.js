import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Parser from "./pages/Parser";

function App() {
  return (
    <>
      <HashRouter basename="/">
        <Switch>
          <Route path="/" exact component={Parser} />
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
