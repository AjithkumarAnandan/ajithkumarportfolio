import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/en/dashboard" }),
  keepUnusedDataFor: 60, // default staleTime 1 minute
  refetchOnMountOrArgChange: false, // refetch only if older than 1 minute
  tagTypes: ["crud"],
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => "crud",
      keepUnusedDataFor: 60, // override per endpoint
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
