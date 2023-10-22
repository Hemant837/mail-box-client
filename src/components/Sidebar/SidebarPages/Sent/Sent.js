import axios from "axios";
import { Link } from "react-router-dom";
import formatEmail from "../../../Function/Function";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../../../../store/userData-slice";

const Sent = () => {
  const baseURL = "https://mail-box-client-8c444-default-rtdb.firebaseio.com/";
  const currentUserEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();

  const sentDatas = useSelector((state) => state.userData.sentDatas);

  const emailDeleteHandler = async (id) => {
    try {
      const deleteEmail = await axios.delete(
        `${baseURL}/sent/${formatEmail(currentUserEmail)}/${id}.json`
      );
      console.log(deleteEmail);
    } catch (error) {
      console.log(error);
    }
    dispatch(userDataActions.deleteSentEmails(id));
  };

  return (
    <div className="mx-4 mt-2 w-5/6 border rounded-md shadow-md">
      {sentDatas.map((data) => (
        <div
          className="flex items-center justify-between w-11/12 p-2 my-2 mx-2 border rounded-md shadow-md"
          key={data.firebaseId}
        >
          <Link to={`/dashboard/sent/${data.firebaseId}`}>
            <div className="p-4">
              <p className=" font-bold">To: {data.to}</p>
              <p className="text-green-600 font-bold">
                Subject: {data.subject}
              </p>
              <p>{data.message}</p>
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

export default Sent;
