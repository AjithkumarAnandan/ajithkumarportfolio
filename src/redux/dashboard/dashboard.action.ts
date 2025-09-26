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

interface FeedbackProps {
  comment: string;
  customername: string;
  email: string;
}

type MyErrorType = {
  error: any[]; // or a more specific type if you know the structure
  message: string;
};

export const postDashboard = createAsyncThunk<
  ProductTypeWithAll, // ✅ Return type
  FeedbackProps, // ✅ Argument type
  { rejectValue: MyErrorType } // ✅ Custom error type
>("dashboard", async (payload, { rejectWithValue }) => {
  try {
    const url = "/api/dashboard";
    const { customername: name, email, comment } = await payload;
    const response = await HTTP.doPost<ProductResponse>(url, {
      name,
      email,
      comment,
    });

    // ✅ Return only product array
    return { ...response.data };
  } catch (err) {
    const error = err as AxiosError<MyErrorType>;

    if (error.response?.data) {
      return rejectWithValue(error.response.data); // typed error response
    }

    return rejectWithValue({ message: error.message } as MyErrorType);
  }
});
