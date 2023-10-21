import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import Dashboard from "../Dashboard/Dashboard";
import RootLayout from "../pages/Root";
import Inbox from "../Sidebar/SidebarPages/Inbox/Inbox";
import Starred from "../Sidebar/SidebarPages/Starred";
import Sent from "../Sidebar/SidebarPages/Sent/Sent";
import Important from "../Sidebar/SidebarPages/Important";
import Trash from "../Sidebar/SidebarPages/Trash";

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
        children: [
          {
            path: "/dashboard/inbox",
            element: <Inbox />,
          },
          {
            path: "/dashboard/starred",
            element: <Starred />,
          },
          {
            path: "/dashboard/sent",
            element: <Sent />,
          },
          {
            path: "/dashboard/important",
            element: <Important />,
          },
          {
            path: "/dashboard/trash",
            element: <Trash />,
          },
        ],
      },
    ],
  },
]);

export default router;
