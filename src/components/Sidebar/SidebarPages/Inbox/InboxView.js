import React from "react";

const InboxView = (props) => {
  const { data } = props;
  console.log("In InboxView", data); // fine
  return (
    <div className="mx-2 my-2 border p-4 flex rounded-md shadow-md justify-between items-center bg-blue-400">
      <span className="border rounded-lg w-3 h-3 bg-blue-500"></span>
      <p className="text-white font-bold">From: {data.from} </p>
      <p className="text-green-600 font-bold">Subject: {data.subject}</p>
      <p className="text-white font-semibold">{data.message}</p>
    </div>
  );
};

export default InboxView;
