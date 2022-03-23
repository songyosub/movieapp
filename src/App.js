import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { routes } from "./Router";

import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route exact={route.exact} path={route.path} key={route.title}>
              <Layout>{route.component}</Layout>
            </Route>
          ))}
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
