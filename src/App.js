import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import formatEmail from "./components/Function/Function";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth-slice";
import router from "./components/Routes/Routes";
import { userDataActions } from "./store/userData-slice";
import useDataFetching from "./components/Hooks/dataFetching";

function App() {
  const baseURL = "https://mail-box-client-8c444-default-rtdb.firebaseio.com/";

  const currentUserEmail = useSelector((state) => state.auth.userEmail);
  // console.log(currentUserEmail);
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

          dispatch(authActions.setIdToken(idToken));
          dispatch(authActions.setUserEmail(userDetails.data.users[0].email));
          dispatch(authActions.isLogin());
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserLogin();
    }
  }, [currentUserEmail, dispatch]);

  useDataFetching(
    `${baseURL}/${formatEmail(currentUserEmail)}/inbox.json`,
    userDataActions.replaceInboxData,
    dispatch,
    800
  );

  // for fetching sentDatas
  useEffect(() => {
    const fetchAllDatas = async () => {
      try {
        const fetchSentData = await axios.get(
          `${baseURL}/${formatEmail(currentUserEmail)}/sent.json`
        );

        const newSentDatas = Object.keys(fetchSentData.data).map((key) => {
          return { firebaseId: key, ...fetchSentData.data[key] };
        });

        dispatch(userDataActions.replaceSentData(newSentDatas));

        dispatch(userDataActions.setSentEmail(newSentDatas[0].to));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllDatas();
  }, [currentUserEmail, dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
