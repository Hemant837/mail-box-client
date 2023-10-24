import { useSelector } from "react-redux";
import StarredView from "./StarredView";

const Starred = () => {
  const starredEmails = useSelector(
    (state) => state.starredEmails.starredEmailsData
  );

  return (
    <div className="mx-4 mt-2 w-5/6 border rounded-md shadow-md">
      {starredEmails.map((data) => {
        return <StarredView data={data} key={data.firebaseId} />;
      })}
    </div>
  );
};

export default Starred;
