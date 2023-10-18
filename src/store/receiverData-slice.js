import { createSlice } from "@reduxjs/toolkit";

const receiverDataSlice = createSlice({
  name: "receiverData",
  initialState: { data: [], totalQuantity: 0, receiverEmail: "" },
  reducers: {
    setReceiverData(state, action) {
      state.data.push(action.payload);
      state.totalQuantity++;
    },

    setReceiverEmail(state, action) {
      state.receiverEmail = action.payload;
    },
  },
});

export const receiverDataActions = receiverDataSlice.actions;

export default receiverDataSlice;
