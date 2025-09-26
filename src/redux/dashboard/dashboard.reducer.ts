import { createSlice } from "@reduxjs/toolkit";
import { getFeedback, postDashboard } from "./dashboard.action";

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

export const postDashboardSlice = createSlice({
  name: "dashboard/post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postDashboard.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(postDashboard.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(postDashboard.rejected, (state, action) => {
        state.data = [];
        state.error = action.payload || { message: action.error } || null;
        state.loading = false;
      });
  },
});

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
