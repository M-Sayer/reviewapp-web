import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    accessToken: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setToken } = loginSlice.actions;
export const selectToken = state => state.login.accessToken;

export default loginSlice.reducer;
