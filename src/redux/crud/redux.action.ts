import { HTTP } from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export interface ProductResponse {
  data: ProductType[];
  success: boolean;
  error: string | null;
  message: string | null;
}

export interface ProductType {
  id: number;
  name?: string;
  price?: number;
}

export const getFetchProducts = createAsyncThunk<
  ProductType[], // ✅ Return type
  void, // ✅ Argument type
  { rejectValue: string } // ✅ Custom error type
>("dashboard", async (_, { rejectWithValue }) => {
  try {
    const url = "/api/dashboard/crud";
    const response = await HTTP.doGet<ProductResponse>(url);

    // ✅ Return only product array
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    if (error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message);
  }
});

interface PostProductsArgs {
  name: string | undefined | null;
}

export type PutProductsArgs = ProductType[];
export type DeleteProductsArgs = ProductType[];

export const putProducts = createAsyncThunk<
  PutProductsArgs, // ✅ Return type
  { payload: { id?: number; newValue: PostProductsArgs } }, // ✅ Argument type
  { rejectValue: string } // ✅ Custom error type
>("dashboard/put", async ({ payload }, { rejectWithValue }) => {
  try {
    const url = "/api/dashboard/edit";
    const {
      id,
      newValue: { name },
    } = payload;
    const response = await HTTP.doPut<ProductResponse>(url, { name, id });

    // ✅ Return only product array
    return response.data.data ?? "";
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    if (error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message);
  }
});

//Delete Product
export const deleteProduct = createAsyncThunk<
  DeleteProductsArgs, // ✅ Return type
  { id: number | string }, // ✅ Argument type
  { rejectValue: string } // ✅ Custom error type
>("dashboard/put", async ({ id }, { rejectWithValue }) => {
  try {
    const url = "/api/dashboard/delete";

    const response = await HTTP.doDelete<ProductResponse>(url, { id });

    // ✅ Return only product array
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    if (error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message);
  }
});
