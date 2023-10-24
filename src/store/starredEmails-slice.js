import { createSlice } from "@reduxjs/toolkit";

const starredEmailsSlice = createSlice({
  name: "starredEmails",
  initialState: { starredEmailsData: [] },
  reducers: {
    addStarredEmail(state, action) {
      state.starredEmailsData.push(action.payload);
    },
  },
});

export const starredEmailsActions = starredEmailsSlice.actions;

export default starredEmailsSlice;
