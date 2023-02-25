import React from "react";

// import Register from "../../feathures/frontend/authentication/Register";

// import Login from "../../feathures/frontend/authentication/Login";

import Login from "../../features/frontend/authentication/Login";
import Register from "../../features/frontend/authentication/Register";

export default [
  {
    label: "Login",
    path: "login",
    showInMenu: true,
    addRoute: true,
    component: <Login />,
    authenticated: "no",
  },
  {
    label: "Register",
    path: "register",
    showInMenu: true,
    addRoute: true,
    component: <Register />,
    authenticated: "no",
  },
];
