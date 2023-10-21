import React from "react";

const InboxView = (props) => {
  const { data } = props;

  return (
    <div className="mx-2 my-2 border w-3/4 p-4">
      <p className="text-blue-600 font-bold">From: {data.inboxEmail}</p>
      <p className="text-green-600 font-bold">Subject: {data.inboxSubject}</p>
      <p>{data.inboxData}</p>
    </div>
  );
};

export default InboxView;
