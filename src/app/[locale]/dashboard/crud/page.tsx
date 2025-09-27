import React from "react";
import EditField from "./_internal/EditDashboard";
import { ProductType } from "@/redux/crud/redux.action";
import { Link } from "@/i18n/navigation";
import { getServerSideProducts } from "@/redux/dashboard/getServerSideProducts";
import AddPage from "./_internal/AddList";
import FeedbackList from "./_internal/FeedbackList";

export interface ProductProps {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: string;
  name?: string | undefined;
}

interface PageProps {
  params: { locale: string } | Promise<{ locale: string }>;
}
export interface ProductResponse extends ProductProps {
  id: number;
}

export interface ProductListProps {
  data: ProductProps[];
}

const CRUD = async ({ params }: PageProps) => {
  const { locale } = await params;
  // const { data: products, error: getError } = await getProducts(
  //   "/api/dashboard"
  // );

  const state = await getServerSideProducts();

  const { products, error } = state.dashboard;

  if (error) {
    return (
      <p style={{ color: "red" }}>
        {typeof error === "string" ? error : "Failed to fetch products."}
      </p>
    );
  }

  const productList: ProductType[] = Array.isArray(products)
    ? products
    : Array.isArray((products as { data?: ProductType[] })?.data)
    ? (products as { data: ProductType[] }).data
    : [];

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="font-bold text-3xl text-center mb-6 text-gray-800">
            Products
          </h1>
          <AddPage />

          {productList.length > 0 ? (
            <div className="space-y-4">
              {[...productList]
                .sort((a, b) => Number(a.id) - Number(b.id))
                .map((item) => (
                  <div
                    key={item.id}
                    className="items-center justify-between bg-gray-50 border rounded-xl shadow-sm hover:shadow-md transition p-2"
                  >
                    {/* Product info / edit field */}
                    <EditField
                      item={{
                        ...item,
                        id: item.id.toString(),
                        name: item.name ?? "",
                      }}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>

      {/* Floating dashboard button */}
      {/* <Link
        href="/dashboard"
        locale={locale}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        Dashboard
      </Link> */}
      {/* <FeedbackList /> */}
    </>
  );
};

export default CRUD;
