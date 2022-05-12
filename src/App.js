import React, { useEffect, useState } from "react";
import "./App.less";
import { toast } from "react-toastify";
import Login from "./pages/loginPage";
import SignUp from "./pages/signUpPage";
import Dashboard from "./pages/dashboardPage";
import DrinkPage from "./pages/DrinkPage";
import CreateDrink from "./pages/createDrinkPage";
import Profile from "./pages/ProfilePage"
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./components/menu";
import callApi from "./api";

const PageContent = styled.div`
  margin-top: 2em;
`;

function App() {

  const [drinks, setDrinks] = useState(null)

  useEffect(() => {
    callApi("http://localhost:8090/api/drinks", {
      method: "GET",
    }).then((res) => {
      setDrinks(res)
    }).catch(() => {
      toast.error("Data fetcing failed. Try again later.")
    })
  }, []);
  return (
    <div className="App">
      <Router>
        <Menu></Menu>
        <PageContent>
          <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard drinks={drinks} />
                </PrivateRoute>
              }
            />
             <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            {drinks && drinks.map((drink) => 
              <Route path={`/drink/${drink.id}`} element={<DrinkPage drink={drink} />}/>
            )}
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreateDrink />
                </PrivateRoute>
              }
            />
            <Route exact path="/" element={<Login />} />
          </Routes>
        </PageContent>
      </Router>
    </div>
  );
}

const PrivateRoute = ({ children }) => {
  const authenticated = sessionStorage.getItem("authenticated");
  return authenticated ? children : <Navigate to="/login" />;
};

export default App;
