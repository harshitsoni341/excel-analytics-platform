import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    login: (state, action) => { state.user = action.payload },
    logout: (state) => { state.user = null },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
