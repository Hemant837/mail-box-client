import { createSlice } from "@reduxjs/toolkit";

const receiverDataSlice = createSlice({
  name: "receiverData",
  initialState: {
    data: [],
    sentQuantity: 0,
    inboxQuantity: 0,
    receiverEmail: "",
    sendersData: [],
  },
  reducers: {
    setReceiverData(state, action) {
      state.data.push(action.payload);
      state.sentQuantity++;
    },

    setSenderData(state, action) {
      state.sendersData.push(action.payload);
      state.inboxQuantity++;
    },

    setReceiverEmail(state, action) {
      state.receiverEmail = action.payload;
    },
  },
});

export const receiverDataActions = receiverDataSlice.actions;

export default receiverDataSlice;
