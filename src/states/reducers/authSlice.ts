import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser, setUserDetails } = authSlice.actions;
export default authSlice.reducer;
