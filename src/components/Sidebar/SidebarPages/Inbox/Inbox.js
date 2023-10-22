import axios from "axios";
import { Link } from "react-router-dom";
import formatEmail from "../../../Function/Function";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../../../store/userData-slice";

const Inbox = () => {
  const baseURL = "https://mail-box-client-8c444-default-rtdb.firebaseio.com/";
  const currentUserEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();

  const inboxDatas = useSelector((state) => state.userData.inboxDatas);

  const emailDeleteHandler = async (id) => {
    try {
      const deleteEmail = await axios.delete(
        `${baseURL}/inbox/${formatEmail(currentUserEmail)}/${id}.json`
      );
      console.log(deleteEmail);
    } catch (error) {
      console.log(error);
    }
    dispatch(userDataActions.deleteInboxEmails(id));
  };

  const markedReadHandler = async (id) => {
    dispatch(userDataActions.markMessageAsRead(id));
    try {
      const messageIsRead = await axios.patch(
        `${baseURL}/inbox/${formatEmail(currentUserEmail)}/${id}.json`,
        { read: true }
      );
      console.log(messageIsRead);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-4 mt-2 w-5/6 border rounded-md shadow-md">
      {inboxDatas.map((data) => (
        <div
          className="flex justify-between items-center w-9/12 p-2 my-2 mx-2 border rounded-md shadow-md"
          key={data.firebaseId}
        >
          <Link
            to={`/dashboard/inbox/${data.firebaseId}`}
            onClick={() => markedReadHandler(data.firebaseId)}
          >
            <div
              className={`${
                data.read ? "bg-gray-100" : "bg-white font-semibold"
              } mx-2 my-2 border w-full p-4 flex rounded-md shadow-md justify-between items-center`}
            >
              <span
                className={`w-3 h-3 rounded-lg ${
                  data.read ? "bg-gray-200" : "bg-blue-500"
                }`}
              ></span>
              <p className="text-black">From: {data.from} </p>
              <p className="text-green-700">Subject: {data.subject}</p>
              <p className="text-black">{data.message}</p>
            </div>
          </Link>
          <button
            onClick={() => emailDeleteHandler(data.firebaseId)}
            className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
