import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "receiverData",
  initialState: {
    sentDatas: [],
    sentQuantity: 0,
    inboxQuantity: 0,
    sentEmail: "",
    inboxDatas: [],
  },
  reducers: {
    replaceSentData(state, action) {
      state.sentDatas = action.payload;
    },
    replaceInboxData(state, action) {
      state.inboxDatas = action.payload;
    },
    setSentDatas(state, action) {
      state.sentDatas.push(action.payload);
      state.sentQuantity++;
    },

    setInboxDatas(state, action) {
      state.inboxDatas.push(action.payload);
      state.inboxQuantity++;
    },

    setSentEmail(state, action) {
      state.sentEmail = action.payload;
    },
  },
});

export const userDataActions = userDataSlice.actions;

export default userDataSlice;