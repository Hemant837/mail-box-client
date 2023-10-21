import React from "react";

const InboxView = (props) => {
  const { data } = props;
  return (
    <div className="mx-2 my-2 border p-4 flex rounded-md shadow-md justify-between items-center">
      <span className="border rounded-lg w-3 h-3 bg-blue-500"></span>
      <p className="text-black font-bold">From: {data.from} </p>
      <p className="text-green-700 font-bold">Subject: {data.subject}</p>
      <p className="text-black font-semibold">{data.message}</p>
      <button className="font-semibold border p-1.5 rounded-lg hover:border-black">
        X
      </button>
    </div>
  );
};

export default InboxView;
