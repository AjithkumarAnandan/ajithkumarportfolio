import { PersonGridProps } from "@/app/[locale]/about/_internal/type.grid";
import { HTTP } from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface ProductResponse {
  data: ProductType[];
  success: boolean;
  error: string | null;
  message: string | null;
}

interface ProductType {
  id: number;
  name?: string;
}

interface ProductTypeWithAll {
  data: ProductType[];
}

type MyErrorType = {
  error: any[]; // or a more specific type if you know the structure
  message: string;
};

export const getFeedback = createAsyncThunk<
  ProductTypeWithAll,
  void,
  { rejectValue: MyErrorType }
>("feedback/get", async (_, { rejectWithValue }) => {
  try {
    const url = "/api/dashboard";
    const response = await HTTP.doGet<ProductResponse>(url);
    return { ...response.data };
  } catch (err) {
    const error = err as AxiosError<MyErrorType>;

    if (error.response?.data) {
      return rejectWithValue(error.response.data); // typed error response
    }

    return rejectWithValue({ message: error.message } as MyErrorType);
  }
});

export const putFeedback = createAsyncThunk<
  PersonGridProps,
  PersonGridProps,
  { rejectValue: MyErrorType }
>("feedback/put", async (payload, { rejectWithValue }) => {
  try {
    const url = "/api/dashboard";
    const response = await HTTP.doPut<PersonGridProps>(url, payload);
    return { ...response.data };
  } catch (err) {
    const error = err as AxiosError<MyErrorType>;

    if (error.response?.data) {
      return rejectWithValue(error.response.data); // typed error response
    }

    return rejectWithValue({ message: error.message } as MyErrorType);
  }
});

export const deleteFeedback = createAsyncThunk<
  any,
  void,
  { rejectValue: MyErrorType }
>("feedback/delete", async (payload, { rejectWithValue }) => {
  try {
    const url = "/api/dashboard";
    const response = await HTTP.doDelete<ProductResponse>(url, payload);
    return { ...response.data };
  } catch (err) {
    const error = err as AxiosError<MyErrorType>;

    if (error.response?.data) {
      return rejectWithValue(error.response.data); // typed error response
    }

    return rejectWithValue({ message: error.message } as MyErrorType);
  }
});
