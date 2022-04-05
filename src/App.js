import React from "react";
import "./App.css";
import Login from "./pages/loginPage";
import SignUp from "./pages/signUpPage";
import Dashboard from "./pages/dashboardPage";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Routes>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route exact path="/" component={Login} />
    </Routes>
  );
}

const PrivateRoute = ({ children, ...rest }) => {
  const authenticated = localStorage.getItem("authenticated");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
