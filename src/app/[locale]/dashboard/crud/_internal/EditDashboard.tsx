"use client";

// import { deleteProduct, editProduct } from "@/tanstack/dashboard/editDelete";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AppDispatch } from "@/redux/store";
import { deleteProduct, putProducts } from "@/redux/crud/redux.action";
import { useDispatch } from "react-redux";

type Product = {
  id: string;
  name: string;
};

interface EditFieldProps<T extends { id: string | number; name: string }> {
  item: T;
}

export default function EditField({ item }: EditFieldProps<Product>) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState<string>(item.name);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  async function handleEdit(
    id: number | undefined,
    newValue: { name: string }
  ) {
    try {
      const numericId = typeof id === "string" ? parseInt(id) : id;

      const resultAction = await dispatch(
        putProducts({
          payload: { id: numericId, newValue },
        })
      );

      if (putProducts.rejected.match(resultAction)) {
        console.error(
          "Edit failed:",
          resultAction.payload || resultAction.error.message
        );
        toast.error("Edit failed");
        return;
      }
      if (putProducts.fulfilled.match(resultAction)) {
        toast.success("Successfully Updated");
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Unexpected error occurred");
    }
  }

  async function handleDelete(id: string): Promise<void> {
    try {
      const numericId = typeof id === "string" ? parseInt(id) : id;

      const resultAction = await dispatch(deleteProduct({ id: numericId }));

      if (deleteProduct.rejected.match(resultAction)) {
        console.error(
          "Edit failed:",
          resultAction.payload || resultAction.error.message
        );
        toast.error("Edit failed");
        return;
      }
      if (deleteProduct.fulfilled.match(resultAction)) {
        toast.success("Successfully Deleted");
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Unexpected error occurred");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleEdit(Number(item.id), { name: text });
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition relative">
      {editing ? (
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => setEditing(false)}
            autoFocus
            className="w-full border-b focus:outline-none focus:border-blue-500"
          />
        </form>
      ) : (
        <>
          <span
            tabIndex={0}
            onClick={() => setEditing(true)}
            className="flex-1 cursor-pointer text-gray-800"
          >
            {item.name}
          </span>
          <button
            onClick={() => handleDelete(item.id)}
            className="absolute -right-0 -top-2 ml-4 text-red-500 hover:text-red-700 font-bold"
          >
            ✕
          </button>
        </>
      )}
    </div>
  );
}
