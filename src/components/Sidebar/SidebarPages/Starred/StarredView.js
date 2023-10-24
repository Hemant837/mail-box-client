import React from "react";
import { AiFillStar } from "react-icons/ai";

const StarredView = (props) => {
  const { data } = props;

  return (
    <div className="flex items-center bg-gray-100 justify-start w-11/12 p-2 my-2 mx-2 border rounded-md shadow-md">
      <AiFillStar className=" text-yellow-300" />
      <div className="flex justify-around w-7/12">
        <p className="font-bold">From: {data.from}</p>
        <p className="text-green-700 font-bold">Subject: {data.subject}</p>
        <p>{data.message}</p>
      </div>
    </div>
  );
};

export default StarredView;
