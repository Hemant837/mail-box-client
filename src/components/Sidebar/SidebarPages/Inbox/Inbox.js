import InboxView from "./InboxView";
import { useSelector } from "react-redux";

const Inbox = () => {
  const inboxDatas = useSelector((state) => state.userData.inboxDatas);

  return (
    <div className="mx-4 mt-2 border w-4/6">
      {inboxDatas.map((data) => (
        <InboxView key={data.id} data={data} />
      ))}
    </div>
  );
};

export default Inbox;
