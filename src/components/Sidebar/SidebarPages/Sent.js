import { useSelector } from "react-redux";

const Sent = () => {
  const receiverData = useSelector((state) => state.receiverData.data);
  const receiverEmail = useSelector(
    (state) => state.receiverData.receiverEmail
  );
  return (
    <div className="mx-4 mt-2 border w-4/6">
      {receiverData.map((data) => (
        <div key={data.id} className="mx-2 my-2 border w-3/4">
          <p>To: {receiverEmail}</p>
          {/* <p>Sender's Email: {data.sendersEmail}</p> */}
          <p>Subject: {data.receiverSubject}</p>
          <p>{data.receiverData}</p>
        </div>
      ))}
    </div>
  );
};

export default Sent;
