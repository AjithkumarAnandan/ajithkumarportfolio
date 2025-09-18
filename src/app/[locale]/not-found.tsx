"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white px-4">
      <main className="flex flex-row sm:flex-row items-center text-center sm:text-left">
        <h1 className="text-7xl sm:text-8xl  border-r mx-8 border-gray-600 dark:border-gray-600 pb-4 sm:pb-0 sm:pr-6 mb-4 sm:mb-0 sm:mr-6 ">
          404
        </h1>
        <p className="text-lg sm:text-xl max-w-md">
          Oops! The page you are looking for doesn’t exist.
        </p>
      </main>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 mt-8 rounded-full shadow-md transition duration-200 cursor-pointer"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }}
      >
        Go Back
      </button>
    </div>
  );
}
