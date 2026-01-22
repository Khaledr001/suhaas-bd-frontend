import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  status: "ACTIVE" | "INACTIVE";
  joinedAt: string;
}

interface UsersState {
  list: User[];
  isLoading: boolean;
}

const initialState: UsersState = {
  list: [
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "ADMIN",
      status: "ACTIVE",
      joinedAt: "2023-01-01",
    },
    {
      id: "2",
      name: "John Doe",
      email: "john@example.com",
      role: "USER",
      status: "ACTIVE",
      joinedAt: "2023-02-15",
    },
    {
      id: "3",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "USER",
      status: "INACTIVE",
      joinedAt: "2023-03-10",
    },
  ],
  isLoading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.list.push(action.payload);
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<User> & { id: string }>,
    ) => {
      const index = state.list.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((u) => u.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
