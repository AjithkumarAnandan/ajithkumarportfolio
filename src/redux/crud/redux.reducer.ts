import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteProduct,
  DeleteProductsArgs,
  getFetchProducts,
  ProductType,
  putProducts,
} from "./redux.action";
// Define slice state
import { PutProductsArgs } from "./redux.action"; // Make sure this import exists and is correct
// Define product type (adjust fields to match your API response)

// Define slice state
interface DashboardState {
  loading: boolean;
  products: ProductType[];
  error: string | null;
}

const initialState: DashboardState = {
  loading: true,
  products: [],
  error: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFetchProducts.pending, (state) => {
        state.loading = true;
        state.products = [];
        state.error = null;
      })
      .addCase(
        getFetchProducts.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.error = null;
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(getFetchProducts.rejected, (state, action) => {
        state.products = [];
        state.error = action.error.message || "Failed to fetch products.";
        state.loading = false;
      });
  },
});

interface DashboardPutState {
  loading: boolean;
  products: PutProductsArgs | string | null | undefined;
  error: string | null;
}

const initialStatePut: DashboardPutState = {
  loading: true,
  products: null,
  error: null,
};

export const dashboardPutSlice = createSlice({
  name: "dashboard/put",
  initialState: initialStatePut,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(putProducts.pending, (state) => {
        state.loading = true;
        state.products = "";
        state.error = null;
      })
      .addCase(putProducts.fulfilled, (state: DashboardPutState, action) => {
        state.error = null;
        state.products = action.payload ?? null;
        state.loading = false;
      })
      .addCase(putProducts.rejected, (state, action) => {
        state.products = "";
        state.error = action.error.message || "Failed to fetch products.";
        state.loading = false;
      });
  },
});

interface DashboardDeleteState {
  loading: boolean;
  products: DeleteProductsArgs | string | null | undefined;
  error: string | null;
}

const initialStateDelete: DashboardDeleteState = {
  loading: true,
  products: null,
  error: null,
};
export const dashboardDeleteSlice = createSlice({
  name: "dashboard/delete",
  initialState: initialStateDelete,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.products = "";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.error = null;
        state.products = action.payload ?? "";
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.products = "";
        state.error = action.error.message || "Failed to fetch products.";
        state.loading = false;
      });
  },
});
