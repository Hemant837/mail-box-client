import SentView from "./SentView";
import { useSelector } from "react-redux";

const Sent = () => {
  const sentDatas = useSelector((state) => state.userData.sentDatas);
  return (
    <div className="mx-4 mt-2 border w-4/6">
      {sentDatas.map((data) => (
        <SentView key={data.firebaseId} data={data} />
      ))}
    </div>
  );
};

export default Sent;
