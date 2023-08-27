import { AddWhispCommentRequest } from "@/app/model/addWhispCommentRequest";
import { WhispComment } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: WhispComment[];
};

const initialState: InitialState = {
  value: [],
} as InitialState;

export const getWhispComments = createAsyncThunk(
  "whispComment/getWhispComments",
  async (whispId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/whisper-comment?id=${whispId}`,
      {
        method: "GET",
      }
    );
    const data = (await response.json()) as WhispComment[];
    return data;
  }
);

export const addWhispCommentSliceFunc = createAsyncThunk(
  "whispComment/addWhispComment",
  async (whispComment: AddWhispCommentRequest) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/whisper-comment`,
      {
        method: "POST",
        body: JSON.stringify(whispComment),
      }
    );
    return await response.json();
  }
);

export const deleteWhispComment = createAsyncThunk(
  "whispComment/deleteWhispComment",
  async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/whisper-comment?id=${id}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  }
);

export const whispCommentSlice = createSlice({
  name: "whispComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWhispComments.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(addWhispCommentSliceFunc.fulfilled, (state, action) => {
      const addedWhisper = action.payload;
      state.value.unshift(addedWhisper);
    });

    builder.addCase(deleteWhispComment.fulfilled, (state, action) => {
      const deletedWhisper = action.payload;
      state.value = state.value.filter((w) => w.id !== deletedWhisper.id);
    });
  },
});
