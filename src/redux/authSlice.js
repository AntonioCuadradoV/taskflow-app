
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuthLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setAuthLoading } = authSlice.actions;

export default authSlice.reducer;
