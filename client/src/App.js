import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import Navbar from "./components/layout/Navbar";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Profile from "./components/Profile";
import store from "./store";
import { loadUser } from "./actions/auth";
import "./App.css";
import Routes from "./components/routing/Routes";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
