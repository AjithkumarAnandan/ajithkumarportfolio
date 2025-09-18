import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const config = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // Ensure token is valid
      "cache-control": "no-cache",
    },
  };
};

const baseURL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
export class HTTP {
  static async doGet<T>(url: string): Promise<AxiosResponse<T>> {
    return await axios.get(`${baseURL}${url}`, config());
  }
  static async doPost<T>(
    url: string,
    value: unknown
  ): Promise<AxiosResponse<T>> {
    return axios.post<T>(`${baseURL}${url}`, value, config());
  }

  static async doPut<T>(
    url: string,
    value: unknown
  ): Promise<AxiosResponse<T>> {
    return axios.put<T>(`${baseURL}${url}`, value, config());
  }

  static async doDelete<T>(
    url: string,
    value: unknown
  ): Promise<AxiosResponse<T>> {
    // return axios.delete<T>(`${baseURL}${url}`, value, config());
    return axios.delete<T>(`${baseURL}${url}`, {
      ...config(),
      data: value,
    });
  }
}

export const secretkey = "key";
