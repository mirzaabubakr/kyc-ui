import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUserStatusById: (state: any, action) => {
      const { id, status } = action.payload;
      const user = state.users.kycs.find((user: any) => user.id === id);
      if (user) {
        user.status = status;
      }
    },
  },
});

export const { setUsers, updateUserStatusById } = usersSlice.actions;
export default usersSlice.reducer;
