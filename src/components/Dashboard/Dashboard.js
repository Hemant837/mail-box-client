import React from "react";
import { useSelector } from "react-redux";
import Compose from "./Compose";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  const isComposing = useSelector((state) => state.ui.isComposing);

  return (
    <div className="flex">
      <Sidebar />
      {isComposing && <Compose />}
      {!isComposing && <Outlet />}
    </div>
  );
};

export default Dashboard;
