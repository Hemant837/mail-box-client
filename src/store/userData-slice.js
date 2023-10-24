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
      if (action.payload.length > 0) {
        state.inboxDatas = action.payload;
      } else {
        // Handle the case when there is no data
        // You can set the state to an empty array or take another appropriate action.
        state.inboxDatas = [];
      }
    },

    setSentDatas(state, action) {
      state.sentDatas.push(action.payload);
    },

    setInboxDatas(state, action) {
      if (action.payload) {
        state.inboxDatas.push(action.payload);
      }
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
