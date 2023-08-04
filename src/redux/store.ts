import { configureStore } from "@reduxjs/toolkit";
import { whispersSlice } from "./features/whispers-slice";

export const store = configureStore({
  reducer: {
    whisper: whispersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
