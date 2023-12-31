import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import formatEmail from "../../../Function/Function";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../../../store/userData-slice";
import { starredEmailsActions } from "../../../../store/starredEmails-slice";
import { AiOutlineDelete, AiOutlineStar, AiFillStar } from "react-icons/ai";

const Inbox = () => {
  const currentUserEmail = useSelector((state) => state.auth.userEmail);
  const baseURL = `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
    currentUserEmail
  )}`;
  const dispatch = useDispatch();
  const inboxDatas = useSelector((state) => state.userData.inboxDatas);

  const emailDeleteHandler = async (id) => {
    try {
      await axios.delete(`${baseURL}/inbox/${id}.json`);
      dispatch(userDataActions.deleteInboxEmails(id));
    } catch (error) {
      console.log(error);
    }
  };

  const markedReadHandler = async (id) => {
    dispatch(userDataActions.markMessageAsRead(id));
    try {
      await axios.patch(`${baseURL}/inbox/${id}.json`, { read: true });
    } catch (error) {
      console.log(error);
    }
  };

  const addToStarredHandler = async (data) => {
    const starredData = { ...data, starred: true };
    try {
      await axios.post(`${baseURL}/starred.json`, starredData);
      await axios.patch(`${baseURL}/inbox/${data.firebaseId}.json`, {
        starred: true,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(starredEmailsActions.addStarredEmail(starredData));
  };

  return (
    <div className="mx-4 mt-2 w-5/6 border rounded-md shadow-md">
      {inboxDatas.map((data) => (
        <div
          className={`flex justify-between font-bold items-center w-9/12 p-2 my-2 mx-2 border rounded-md shadow-md bg-${
            data.read ? "gray-100 font-normal" : "white"
          }`}
          key={data.firebaseId}
        >
          <div className="flex items-center w-full">
            <span
              className={`w-3 h-3 border rounded-lg mr-1 bg-${
                data.read ? "gray-400" : "blue-500"
              }`}
            ></span>
            {data.starred ? (
              <AiFillStar className="text-yellow-400 cursor-pointer" />
            ) : (
              <AiOutlineStar
                className="text-yellow-400 cursor-pointer"
                onClick={() => addToStarredHandler(data)}
              />
            )}

            <Link
              to={`/dashboard/inbox/${data.firebaseId}`}
              onClick={() => markedReadHandler(data.firebaseId)}
            >
              <div className="mx-2 my-2 flex justify-between items-center w-full">
                <p className="text-black">From: {data.from}</p>
                <p className="text-green-700">Subject: {data.subject}</p>
                <p className="text-black">{data.message}</p>
              </div>
            </Link>
          </div>
          <AiOutlineDelete
            onClick={() => emailDeleteHandler(data.firebaseId)}
            className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-600"
          />
        </div>
      ))}
    </div>
  );
};

export default Inbox;
