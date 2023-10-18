// import formatEmail from "../components/Function/Function";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";

// const sendData = () => {
//     const dispatch = useDispatch()
//   const receiverEmail = useSelector(
//     (state) => state.receiverData.receiverEmail
//   );
//   return async (dispatch) => {
//     const sendData = () => {
//       try {
//         const sendEmailData = axios.put(
//           `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
//             receiverEmail
//           )}/emailData.json`,
//           receiverData
//         );
//         console.log(sendEmailData);
//       } catch (error) {
//         console.log(error);
//       }
//       dispatch()
//     };
//     sendData();
//   };
// };

// export default sendData;
