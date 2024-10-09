import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'loginSilce',
  initialState: {
    a: 1
  },
  reducers: {
    changeState(state, actions) {
      state.a = actions.payload;
    }
  }
});

export const { changeState } = loginSlice.actions;

export const { reducer: loginReducer } = loginSlice;
