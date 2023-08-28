import { UploadMediaRequest } from "@/app/model/uploadMediaRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  currentMediaUrl: string | undefined;
  status: string;
};

const initialState: InitialState = {
  currentMediaUrl: undefined,
  status: "",
} as InitialState;

export const uploadMedia = createAsyncThunk(
  "media/upload",
  async (uploadMediaRequest: UploadMediaRequest) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media`, {
      method: "POST",
      body: uploadMediaRequest.formData,
    });
    const data = await response.json();
    console.log(data);
    return {
      fileName: data.fileName,
    };
  }
);

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    resetCurrentMedia(state) {
      state.currentMediaUrl = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadMedia.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.currentMediaUrl = `https://storage.googleapis.com/local-whisper-bucket/${action.payload.fileName}`;
    });

    builder.addCase(uploadMedia.pending, (state, action) => {
      state.status = "loading";
    });
  },
});
