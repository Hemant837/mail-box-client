import React, { useState } from "react";
import TextEditor from "./TextEditor";

const Dashboard = () => {
  const [isComposing, setIsComposing] = useState(false);

  const startComposing = () => {
    setIsComposing(true);
  };

  const cancelComposing = () => {
    setIsComposing(false);
  };

  return (
    <div className="flex ">
      <div className="mt-2 w-64 h-max border">
        {/* Compose Button */}
        <button
          className="mt-2 mx-auto border rounded-md block font-semibold p-3 text-black hover:shadow-md"
          onClick={startComposing}
        >
          Compose
        </button>
        <nav className="font-semibold">
          <ul>
            <li className="hover:shadow-md rounded">
              <a className="text-center block p-3">Inbox</a>
            </li>
            <li className="hover:shadow-md rounded">
              <a className="text-center block p-3">Starred</a>
            </li>
            <li className="hover:shadow-md rounded">
              <a className="text-center block p-3">Sent</a>
            </li>
            <li className="hover:shadow-md rounded">
              <a className="text-center block p-3">Important</a>
            </li>
            <li className="hover:shadow-md rounded">
              <a className="text-center block p-3">Trash</a>
            </li>
          </ul>
        </nav>
      </div>
      {isComposing && <TextEditor onCancel={cancelComposing} />}
    </div>
  );
};

export default Dashboard;
