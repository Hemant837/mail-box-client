import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";
import router from "./components/Routes/Routes";
import {
  sendData,
  fetchAllData,
} from "./store/action-creaters/userData-action";
import { receiverDataActions } from "./store/receiverData-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const receiverData = useSelector((state) => state.receiverData.data);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const sendersData = useSelector((state) => state.receiverData.sendersData);

  const receiverEmail = useSelector(
    (state) => state.receiverData.receiverEmail
  );

  useEffect(() => {
    const idToken = localStorage.getItem("token");
    if (idToken) {
      const fetchUserLogin = async () => {
        try {
          const userDetails = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD6TbjpOY5B_akn4VQ4-DoVY0McCgUsvR4",
            { idToken: idToken }
          );

          console.log(userDetails.data);
          dispatch(authActions.setUserEmail(userDetails.data.users[0].email));
          dispatch(authActions.isLogin());
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserLogin();
    }
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    // dispatch(receiverDataActions.setSenderData(sendersData));
    dispatch(receiverDataActions.setReceiverData(receiverData));
    sendData(receiverEmail, userEmail, receiverData, sendersData, dispatch);
  }, [receiverEmail, userEmail, receiverData, sendersData, dispatch]);

  console.log(receiverEmail);

  useEffect(() => {
    // if (receiverEmail) {
    //   const fetchData = async (userEmail) => {
    //     try {
    //       const userData = await axios.get(
    //         `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
    //           receiverEmail
    //         )}/sent.json`
    //       );
    //       console.log("userData", userData);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   fetchData(userEmail);
    // }
    fetchAllData(userEmail, receiverEmail, receiverData);
  }, [userEmail, receiverEmail, receiverData]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
