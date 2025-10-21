import { postProducts } from "@/tanstack/dashboard/getProducts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// The server action handles form submission directly on the server
async function addProduct(formData:FormData) {
  "use server";

  const name = formData.get("item") as string;

  if (!name) {
    // You could throw an error or redirect with a message
    throw new Error("Name field required");
  }

  const { data, error } = await postProducts("/api/dashboard/crud", { name });

  if (error) {
    console.error("Failed to post product:", error);
    throw new Error("Failed to post product");
  }

  // Revalidate dashboard or product list page
  revalidatePath("/en/dashboard/crud");

  // Redirect after success
  redirect("/en/dashboard/crud");
}

export default async function AddPage() {
  
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Item</h1>

      <form action={addProduct} className="space-y-4">
        <input
          name="item"
          type="text"
          placeholder="Enter item"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
