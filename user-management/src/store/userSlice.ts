import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface User {
  id: number;
  name: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [
    { id: 1, name: 'Вера' },
    { id: 2, name: 'Катя' },
    { id: 3, name: 'Иван' },
  ],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const { id, name } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.name = name;
      }
    },
  },
});

export const { updateUserName } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export const selectUserById = (id: number) => (state: RootState) =>
  state.users.users.find((user) => user.id === id);

export default usersSlice.reducer;
