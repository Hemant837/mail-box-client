// import React from "react";
// import axios from "axios";
// import formatEmail from "../../../Function/Function";
// import { useSelector } from "react-redux";

// const InboxView = (props) => {
//   const { data } = props;
//   const baseURL = "https://mail-box-client-8c444-default-rtdb.firebaseio.com/";
//   const currentUserEmail = useSelector((state) => state.auth.userEmail);

//   const emailDeleteHandler = async () => {
//     try {
//       const deleteEmail = await axios.delete(
//         `${baseURL}/inbox/${formatEmail(currentUserEmail)}/${
//           data.firebaseId
//         }.json`
//       );
//       console.log(deleteEmail);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="mx-2 my-2 border p-4 flex rounded-md shadow-md justify-between items-center">
//       <span className="border rounded-lg w-3 h-3 bg-blue-500"></span>
//       <p className="text-black font-bold">From: {data.from} </p>
//       <p className="text-green-700 font-bold">Subject: {data.subject}</p>
//       <p className="text-black font-semibold">{data.message}</p>
//       <button
//         onClick={emailDeleteHandler}
//         className="font-semibold border p-1.5 rounded-lg hover:border-black"
//       >
//         X
//       </button>
//     </div>
//   );
// };

// export default InboxView;
