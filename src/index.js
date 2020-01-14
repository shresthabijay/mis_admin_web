import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./Views/Login/Login";
import "./styles/index.scss";
import Dashboard from "./Views/Admin/Dashboard/Dashboard";

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/admin" component={Dashboard} />
      </BrowserRouter>
    </React.Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
