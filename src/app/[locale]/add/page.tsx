import { postProducts } from "@/tanstack/dashboard/getProducts";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function AddPage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Item</h1>

      <form
        action={async (formData) => {
          "use server";
          const name = formData.get("item") as string;

          const { data, error } = await postProducts("/api/add", { name });

          if (error) {
            console.error("Failed to post product:", error, data);
          } else {
            console.log("Product posted:", data);
            redirect("/");
          }
        }}
        className="space-y-4"
      >
        <input
          name="item"
          type="text"
          placeholder="Enter item"
          required
          className="w-full p-2 border rounded"
        />

        {/* {error && <p className="text-red-600 text-sm">{error}</p>} */}

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
