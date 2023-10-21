import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import formatEmail from "./components/Function/Function";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";
import router from "./components/Routes/Routes";
import { userDataActions } from "./store/userData-slice";

// let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const sentEmail = useSelector((state) => state.userData.sentEmail);
  const inboxEmail = useSelector((state) => state.auth.userEmail);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
          dispatch(authActions.setIdToken(idToken));
          dispatch(authActions.setUserEmail(userDetails.data.users[0].email));
          dispatch(authActions.isLogin());
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserLogin();
    }
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
  //           inboxEmail
  //         )}/sent.json`
  //       );

  //       console.log(response.data);
  //       const sentNewData = Object.keys(response.data).map((key) => {
  //         return { firebaseId: key, ...response.data[key] };
  //       });

  //       console.log("sentNewData", sentNewData);
  //       dispatch(userDataActions.replaceSentData(sentNewData));
  //       dispatch(userDataActions.setSentEmail(sentNewData[0].sentEmail));

  //       const newResponse = await axios.get(
  //         `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
  //           sentNewData[0].sentEmail
  //         )}/inbox.json`
  //       );
  //       console.log("newResponse", newResponse.data);
  //       const inboxNewData = Object.keys(newResponse.data).map((key) => {
  //         return { firebaseId: key, ...newResponse.data[key] };
  //       });
  //       console.log("inboxNewData", inboxNewData);

  //       dispatch(userDataActions.replaceInboxData(inboxNewData));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchAllData();
  // }, [inboxEmail, dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
