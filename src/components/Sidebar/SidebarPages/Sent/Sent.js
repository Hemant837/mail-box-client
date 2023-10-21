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
        <div className="flex items-center">
          <Link to={`/dashboard/sent/${data.firebaseId}`}>
            <div className="mx-2 my-2 border p-4 flex rounded-md shadow-md justify-between items-center">
              <p className="text-blue-600 font-bold">To: {data.to}</p>
              <p className="text-green-600 font-bold">
                Subject: {data.subject}
              </p>
              <p>{data.message}</p>
            </div>
          </Link>
          <button
            onClick={() => emailDeleteHandler(data.firebaseId)}
            className="font-semibold border p-1.5 rounded-lg hover:border-black"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sent;
