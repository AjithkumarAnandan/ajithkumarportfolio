import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  dashboardDeleteSlice,
  dashboardPutSlice,
  dashboardSlice,
} from "./crud/redux.reducer";
import { postDashboardSlice } from "./dashboard/dashboard.reducer";
import {
  deleteFeedbackSlice,
  getFeedbackSlice,
  putFeedbackSlice,
} from "./feedback/feedback.reducer";
export const reduxstore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      dashboard: dashboardSlice.reducer,
      feedback: getFeedbackSlice.reducer,
      // [productsApi.reducerPath]: productsApi.reducer, // ✅ add api reducer
    },
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(productsApi.middleware), // ✅ add api middleware
    preloadedState,
  });
};

export const reduxclientstore = configureStore({
  reducer: {
    dashboardUpdate: dashboardPutSlice.reducer,
    dashboardDelete: dashboardDeleteSlice.reducer,
    feedback: combineReducers({
      postFeedback: postDashboardSlice.reducer,
      putFeedback: putFeedbackSlice.reducer,
      deleteFeedback: deleteFeedbackSlice.reducer,
    }),

    // [productsApi.reducerPath]: productsApi.reducer, // ✅ same here
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(productsApi.middleware),
});

// Types
export type AppStore = ReturnType<typeof reduxstore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
