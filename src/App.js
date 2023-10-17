import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/pages/Authentication/Login";
import Signup from "./components/pages/Authentication/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import RootLayout from "./components/pages/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
