import React from "react";

const SentView = (props) => {
  const { data } = props;

  return (
    <div className="mx-2 my-2 border w-3/4 p-4">
      <p className="text-blue-600 font-bold">To: {data.to}</p>
      <p className="text-green-600 font-bold">Subject: {data.subject}</p>
      <p>{data.message}</p>
    </div>
  );
};

export default SentView;
