import { configureStore } from "@reduxjs/toolkit";
import { whispersSlice } from "./features/whispers-slice";
import { mediaSlice } from "./features/media-slice";
import { whispCommentSlice } from "./features/whisp-comment";

export const store = configureStore({
  reducer: {
    whisper: whispersSlice.reducer,
    media: mediaSlice.reducer,
    whispComment: whispCommentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
