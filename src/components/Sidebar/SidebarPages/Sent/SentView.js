import React from "react";

const SentView = (props) => {
  const { data } = props;

  return (
    <div className="mx-2 my-2 border w-3/4 p-4">
      <p className="text-blue-600 font-bold">To: {data.sentEmail}</p>
      <p className="text-green-600 font-bold">Subject: {data.sentSubject}</p>
      <p>{data.sentData}</p>
    </div>
  );
};

export default SentView;
