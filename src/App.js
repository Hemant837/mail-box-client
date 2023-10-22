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

          // console.log(userDetails.data);
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

// Use the custom hook for inbox data
useDataFetching(
  `${baseURL}/inbox/${formatEmail(currentUserEmail)}.json`,
  userDataActions.replaceInboxData,
  dispatch
);

 // Use the custom hook for sent data
 useDataFetching(
  `${baseURL}/sent/${formatEmail(currentUserEmail)}.json`,
  userDataActions.replaceSentData,
  dispatch
);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
