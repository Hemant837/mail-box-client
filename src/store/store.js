import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import authSlice from "./auth-slice";
import userDataSlice from "./userData-slice";
import starredEmailsSlice from "./starredEmails-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    userData: userDataSlice.reducer,
    starredEmails: starredEmailsSlice.reducer,
  },
});

export default store;
