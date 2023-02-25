import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },

    removeUser: () => {
      return { _id: "", role: "" };
    },
  },
});

export const { addUser, removeUser, updateUser } = authSlice.actions;
export const selectUser = (state) => state.auth;

export default authSlice.reducer;
