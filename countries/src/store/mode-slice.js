import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: { colorMode: false },
  reducers: {
    toggle(state) {
      state.colorMode = !state.colorMode;
    },
  },
});

export const modeActions = modeSlice.actions;

export default modeSlice;
