import { HTTP } from "@/utils/http";
import axios from "axios";
interface ProductProps {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: string;
  name?: string;
}

export const getProducts = async (
  url: string
): Promise<{
  data: ProductProps[] | { data: ProductProps[] } | unknown;
  error: string | null;
}> => {
  try {
    const response = await HTTP.doGet<ProductResponse>(url);

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.message
      : "An unexpected error occurred";
    return {
      data: [],
      error: message,
    };
  }
};

// /lib/postProductData.ts
interface ProductResponse extends ProductProps {
  id: number;
}

// interface ProductPost {
//   name: string;
// }

export const postProducts = async (
  url: string,
  payload: Partial<ProductProps>
): Promise<{
  data: ProductResponse | null | unknown;
  error: string | null;
}> => {
  try {
    const response = await HTTP.doPost<ProductResponse>(url, payload);
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "An unexpected error occurred";
    return {
      data: null,
      error: message,
    };
  }
};
