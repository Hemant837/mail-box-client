import React from "react";
import { useSelector } from "react-redux";
import TextEditor from "./TextEditor";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  const isComposing = useSelector((state) => state.ui.isComposing);

  return (
    <div className="flex">
      <Sidebar />
      {isComposing && <TextEditor />}
      {!isComposing && <Outlet />}
    </div>
  );
};

export default Dashboard;
