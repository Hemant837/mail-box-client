import { createSlice } from "@reduxjs/toolkit";

const starredEmailsSlice = createSlice({
  name: "starredEmails",
  initialState: { starredEmailsData: [] },
  reducers: {
    addStarredEmail(state, action) {
      const starredEmailId = action.payload;
      const starredEmail = state.starredEmailsData.find(
        (item) => item.firebaseId === starredEmailId
      );
      if (!starredEmail) {
        state.starredEmailsData.push(action.payload);
      }
    },
    replaceStarredEmail(state, action) {
      state.starredEmailsData = action.payload;
    },
    markedAsStarred(state, action) {
      const starredEmailId = action.payload;
      const starredEmail = state.starredEmailsData.find(
        (item) => item.firebaseId === starredEmailId
      );
      if (starredEmail) {
        starredEmail.starred = true;
      }
    },
  },
});

export const starredEmailsActions = starredEmailsSlice.actions;

export default starredEmailsSlice;
