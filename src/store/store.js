import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import authSlice from "./auth-slice";
import receiverDataSlice from "./receiverData-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    receiverData: receiverDataSlice.reducer,
  },
});

export default store;
