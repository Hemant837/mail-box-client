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
  const baseURL = "https://mail-box-client-8c444-default-rtdb.firebaseio.com/";

  const currentUserEmail = useSelector((state) => state.auth.userEmail);
  // const sentEmail = useSelector((state) => state.userData.sentEmail);

  const dispatch = useDispatch();

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

  // console.log(currentUserEmail);

  // for fetching sentDatas and inboxDatas
  useEffect(() => {
    const fetchAllDatas = async () => {
      try {
        const fetchSentData = await axios.get(
          `${baseURL}/sent/${formatEmail(currentUserEmail)}.json`
        );

        // console.log("fetchSentData", Object.values(fetchSentData.data));

        const newSentDatas = Object.keys(fetchSentData.data).map((key) => {
          return { firebaseId: key, ...fetchSentData.data[key] };
        });

        // console.log("newSentDatas", newSentDatas);

        dispatch(
          userDataActions.replaceSentData(newSentDatas)
        );

        dispatch(userDataActions.setSentEmail(newSentDatas[0].to));

        const fetchInboxData = await axios.get(
          `${baseURL}/inbox/${formatEmail(currentUserEmail)}.json`
        );

        // console.log("fetchInboxData", fetchInboxData.data);

        const newInboxDatas = Object.keys(fetchInboxData.data).map((key) => {
          return { firebaseId: key, ...fetchInboxData.data[key] };
        });

        // console.log("newInboxDatas", newInboxDatas);

        dispatch(userDataActions.replaceInboxData(newInboxDatas));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllDatas();
  }, [currentUserEmail, dispatch]);

  // if (sentEmail) {
  //   console.log("sentEmail", sentEmail);
  // }

  // for fetching inboxDatas

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
