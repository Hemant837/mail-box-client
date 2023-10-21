import { Link } from "react-router-dom";
import InboxView from "./InboxView";
import { useSelector } from "react-redux";

const Inbox = () => {
  const inboxDatas = useSelector((state) => state.userData.inboxDatas);
  console.log("In Inbox", inboxDatas);

  return (
    <div className="mx-4 mt-2 border w-4/6">
      {inboxDatas.map((data) => (
        <Link to={`/dashboard/inbox/${data.firebaseId}`}>
          <InboxView key={data.firebaseId} data={data} />
        </Link>
      ))}
    </div>
  );
};

export default Inbox;
