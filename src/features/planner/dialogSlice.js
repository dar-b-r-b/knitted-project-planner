import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: { id: null, isOpen: false },
  reducers: {
    openDialog: (state, action) => {
      state.isOpen = true;
      state.id = action.payload;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});
export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
