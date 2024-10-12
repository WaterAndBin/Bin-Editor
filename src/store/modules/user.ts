import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    name: 'hallo,world',
    asd: 'asdasdasd'
  },
  reducers: {
    changeName(state, actions) {
      console.log(state.name);
      console.log(actions);
    }
  }
});

export const { changeName } = userSlice.actions;

export const { reducer: userReducer } = userSlice;
