import { ProductResponse } from "@/app/[locale]/dashboard/crud/page";
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
export const editProduct = async (
  url: string,
  payload: { id: number | undefined; newValue: ProductProps }
): Promise<{
  data: ProductResponse | null | unknown;
  error: string | null;
}> => {
  try {
    const {
      id,
      newValue: { name },
    } = payload;
    const response = await HTTP.doPut<ProductResponse>(url, { name, id });
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

export const deleteProduct = async (
  url: string,
  id: number
): Promise<{
  data: ProductResponse | null;
  error: string | null;
}> => {
  try {
    const response = await HTTP.doDelete<ProductResponse>(url, { id });
    return { data: response.data, error: null };
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
