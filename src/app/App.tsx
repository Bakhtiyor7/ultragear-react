import { Box, Typography, Container, Stack, Button } from "@mui/material";
import React, { useState } from "react";
import "../css/App.css";
import "../css/navbar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { RestaurantPage } from "./screens/RestaurantPage/indes";
import { CommunityPage } from "./screens/CommunityPage";
import { OrdersPage } from "./screens/OrdersPage/indes";
import { MemberPage } from "./screens/MemberPage/indes";
import { HelpPage } from "./screens/HelpPage/indes";
import { LoginPage } from "./screens/LoginPage/indes";
import { HomePage } from "./screens/Homepage/indes";
import { NavbarHome } from "./components/header";
import { NavbarRestaurant } from "./components/header/restaurant";
import { NavbarOthers } from "./components/header/others";

function App() {
  const [path, setPath] = useState();
  const main_path = window.location.pathname;

  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome setPath={setPath} />
      ) : main_path.includes("/restaurant") ? (
        <NavbarRestaurant />
      ) : (
        <NavbarOthers />
      )}

      {/* <nav>
            <ul>
              <li>
                <Link to="/restaurant">RestaurantPage</Link>
              </li>
              <li>
                <Link to="/community">CommunityPage</Link>
              </li>
              <li>
                <Link to="/orders">OrdersPage</Link>
              </li>
              <li>
                <Link to="/member-page">MemberPage</Link>
              </li>
              <li>
                <Link to="/help">HelpPage</Link>
              </li>
              <li>
                <Link to="/login">LoginPage</Link>
              </li>
              <li>
                <Link to="/">Homepage</Link>
              </li>
            </ul>
          </nav> */}

      <Switch>
        <Route path="/restaurant">
          <RestaurantPage />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

function Home() {
  return <h2>Home</h2>;
}
