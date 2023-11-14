import { createSlice } from "@reduxjs/toolkit";

const trashEmailsSlice = createSlice({
  name: "Trash",
  initialState: { trashEmails: [] },
  reducers: {
    addTrashEmails(state, action) {
      state.trashEmails.push(action.payload);
    },
    replaceEmails(state, action) {
      state.trashEmails = action.payload;
    },
  },
});

export const trashEmailActions = trashEmailsSlice.actions;

export default trashEmailsSlice;
