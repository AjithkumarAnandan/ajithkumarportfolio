"use client";
import { postProducts } from "@/tanstack/dashboard/getProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  get(name: string): FormDataEntryValue | null;
}

interface PostProductsResponse {
  data: unknown;
  error: unknown;
}

export default function AddPage() {
  const [errors, setErrors] = useState<{ name: string } | null>({ name: "" });
  const router = useRouter();
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Item</h1>

      <form
        action={async (formData: FormData): Promise<void> => {
          const name = formData.get("item") as string;
          if (!name) {
            setErrors({ name: "Name field required" });
            return;
          }
          setErrors({ name: "" });
          const { data, error }: PostProductsResponse = await postProducts(
            "/api/dashboard/crud",
            {
              name,
            }
          );

          if (error) {
            console.log("Failed to post product:", error, data);
          } else {
            console.log("Product posted:", data);
            router.refresh();
          }
        }}
        className="space-y-4"
      >
        <input
          name="item"
          type="text"
          placeholder="Enter item"
          className="w-full p-2 border rounded"
        />

        {errors && <p className="text-red-600 text-sm">{errors.name}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
