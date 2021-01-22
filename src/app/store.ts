import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AddDispatch = typeof store.dispatch;
