import { useParams } from "react-router";
import { useSelector } from "react-redux";

const SentViewDetails = () => {
  const sentDatas = useSelector((state) => state.userData.sentDatas);
  const { sentId } = useParams();
  const sentItem = sentDatas.find((item) => item.firebaseId === sentId);

  console.log("sentDatas", sentDatas);

  console.log("sentItem", sentItem);
  console.log(sentId);

  if (!sentItem) {
    return <div className="font-semibold text-center">Item not found</div>;
  }

  return (
    <div className="mx-4 mt-2 border w-5/6">
      <div className="mx-4 my-4 p-4 border bg-white rounded-md shadow-md">
        <p className="text-lg font-bold mb-2">To: {sentItem.to}</p>
        <p className="text-green-600 font-bold mb-2">
          Subject: {sentItem.subject}
        </p>
        <p className="text-gray-700">{sentItem.message}</p>
      </div>
    </div>
  );
};

export default SentViewDetails;
