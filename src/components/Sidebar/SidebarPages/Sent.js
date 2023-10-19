import { useSelector } from "react-redux";

const Sent = () => {
  const sentDatas = useSelector((state) => state.userData.sentDatas);
  const sentEmail = useSelector(
    (state) => state.userData.sentEmail
  );
  return (
    <div className="mx-4 mt-2 border w-4/6">
      {sentDatas.map((data) => (
        <div key={data.id} className="mx-2 my-2 border w-3/4">
          <p>To: {sentEmail}</p>
          <p>Subject: {data.sentSubject}</p>
          <p>{data.sentData}</p>
        </div>
      ))}
    </div>
  );
};

export default Sent;
