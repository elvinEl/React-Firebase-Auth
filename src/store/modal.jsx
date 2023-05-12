import { createSlice } from "@reduxjs/toolkit";

const modal = createSlice({
  name: "modal",
  initialState: {
    open: false,
    data: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.open = action.payload.name;
      state.data = action.payload.data || false;
    },
    closeModal: (state) => {
      state.open = false;
      state.data = false;
    },
  },
});

export const { openModal, closeModal } = modal.actions;

export default modal.reducer;
