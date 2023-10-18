import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isComposing: false,
  },
  reducers: {
    toggle(state) {
      state.isComposing = !state.isComposing;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
