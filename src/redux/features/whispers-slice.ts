import { AddWhisperRequest } from "@/app/model/addWhisperRequest";
import { Whisper } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: Whisper[];
};

const initialState: InitialState = {
  value: [],
} as InitialState;

const getAllWhispersPrivate = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whisper`, {
    method: "GET",
  });
  const data = (await response.json()) as Whisper[];
  return data;
};

export const getWhispers = createAsyncThunk(
  "whispers/getWhispers",
  async () => {
    return await getAllWhispersPrivate();
  }
);

export const addWhisperSliceFunc = createAsyncThunk(
  "whispers/add",
  async (whisperRequest: AddWhisperRequest) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whisper`, {
      method: "POST",
      body: JSON.stringify(whisperRequest),
    });
    return await response.json();
  }
);

export const deleteWhisper = createAsyncThunk(
  "whispers/delete",
  async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/whisper?id=${id}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  }
);

export const whispersSlice = createSlice({
  name: "whispers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWhispers.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(addWhisperSliceFunc.fulfilled, (state, action) => {
      const addedWhisper = action.payload;
      state.value.unshift(addedWhisper);
    });

    builder.addCase(deleteWhisper.fulfilled, (state, action) => {
      const deletedWhisper = action.payload;
      state.value = state.value.filter((w) => w.id !== deletedWhisper.id);
    });
  },
});
