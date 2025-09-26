import React from "react";
import { getServerSideFeedback } from "@/redux/dashboard/getServerSideProducts";

async function FeedbackList() {
  const state = await getServerSideFeedback();
  const {
    data: { data: feedback },
    error,
  } = state.feedback;

  if (error) {
    return <p>Error found {error}</p>;
  }

  return (
    <div className="feedback-item">
      <h1 className="font-bold text-5xl mb-4 flex justify-center">
        Feedback Table
      </h1>
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Comment
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.isArray(feedback) && feedback.length > 0 ? (
            feedback.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {item.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {item.comment}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 text-center text-gray-500">
                No feedback available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackList;
