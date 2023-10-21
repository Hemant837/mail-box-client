import { useParams } from "react-router";
import { useSelector } from "react-redux";

const InboxViewDetails = () => {
  const inboxDatas = useSelector((state) => state.userData.inboxDatas);
  const { inboxId } = useParams();
  const inboxItem = inboxDatas.find((item) => item.firebaseId === inboxId);

  if (!inboxItem) {
    return <div>Item not found</div>;
  }

  return (
    <div className="mx-4 mt-2 border w-5/6">
      <div className="mx-4 my-4 p-4 border bg-white rounded-md shadow-md">
        <p className="text-lg font-bold mb-2">From: {inboxItem.from}</p>
        <p className="text-green-600 font-bold mb-2">
          Subject: {inboxItem.subject}
        </p>
        <p className="text-gray-700">{inboxItem.message}</p>
      </div>
    </div>
  );
};

export default InboxViewDetails;
