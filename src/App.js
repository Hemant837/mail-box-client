import { RouterProvider } from "react-router-dom";

import { useEffect } from "react";
import axios from "axios";
import formatEmail from "./components/Function/Function";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";
import router from "./components/Routes/Routes";

function App() {
  const dispatch = useDispatch();
  const receiverData = useSelector((state) => state.receiverData.data);
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
    if (receiverEmail) {
      const sendData = async () => {
        try {
          const sendEmailData = axios.put(
            `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
              receiverEmail
            )}/emailData.json`,
            receiverData
          );
          console.log(sendEmailData);
        } catch (error) {
          console.log(error);
        }
      };
      sendData();
    }
  }, [receiverEmail, receiverData]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
