import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import InboxView from "./InboxView";

const Inbox = () => {
  const inboxDatas = useSelector((state) => state.userData.inboxDatas);

  return (
    <div className="mx-4 mt-2 w-5/6 border rounded-md shadow-md">
      {inboxDatas.map((data) => (
        <Link to={`/dashboard/inbox/${data.firebaseId}`}>
          <InboxView key={data.firebaseId} data={data} />
        </Link>
      ))}
    </div>
  );
};

export default Inbox;
