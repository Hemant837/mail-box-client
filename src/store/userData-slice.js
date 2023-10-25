import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
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
    },

    setInboxDatas(state, action) {
      state.inboxDatas.push(action.payload);
    },

    deleteInboxEmails(state, action) {
      state.inboxDatas = state.inboxDatas.filter(
        (email) => email.firebaseId !== action.payload
      );
    },

    deleteSentEmails(state, action) {
      state.sentDatas = state.sentDatas.filter(
        (email) => email.firebaseId !== action.payload
      );
    },

    setSentEmail(state, action) {
      state.sentEmail = action.payload;
    },

    markMessageAsRead(state, action) {
      const messageId = action.payload;
      const message = state.inboxDatas.find(
        (item) => item.firebaseId === messageId
      );
      if (message) {
        message.read = true;
      }
    },
  },
});

export const userDataActions = userDataSlice.actions;

export default userDataSlice;
