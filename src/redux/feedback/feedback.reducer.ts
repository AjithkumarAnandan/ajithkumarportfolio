import { createSlice } from "@reduxjs/toolkit";
import { deleteFeedback, getFeedback, putFeedback } from "./feedback.action";

interface DashboardState {
  loading: boolean;
  data: any;
  error: string | null | any;
}

const initialState: DashboardState = {
  loading: false,
  data: [],
  error: null,
};

export const getFeedbackSlice = createSlice({
  name: "dashboard/get",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedback.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getFeedback.rejected, (state, action) => {
        state.data = [];
        state.error = action.payload || { message: action.error } || null;
        state.loading = false;
      });
  },
});

export const putFeedbackSlice = createSlice({
  name: "dashboard/put",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(putFeedback.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(putFeedback.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(putFeedback.rejected, (state, action) => {
        state.data = [];
        state.error = action.payload || { message: action.error } || null;
        state.loading = false;
      });
  },
});

export const deleteFeedbackSlice = createSlice({
  name: "dashboard/delete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteFeedback.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.data = [];
        state.error = action.payload || { message: action.error } || null;
        state.loading = false;
      });
  },
});
