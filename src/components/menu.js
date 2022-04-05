import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";

const AppMenu = () => {
  const [current, setCurrent] = useState("dashboard");

  const locationsToShowMenu = ["/dashboard", "/create", "/profile", "/drink"];
  

  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  console.log(location.pathname);

/*   if (!locationsToShowMenu.includes(location.pathname)) {
    return null;
  } */

  return (
    <Menu selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/dashboard" onClick={() => navigate("/dashboard")}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="/create" onClick={() => navigate("/create")}>
        Create Drink
      </Menu.Item>
      <Menu.Item key="/profile" onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;
