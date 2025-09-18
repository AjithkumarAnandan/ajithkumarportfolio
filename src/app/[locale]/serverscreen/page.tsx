// app/posts/page.tsx or app/posts/PostsPage.tsx

// import { getFetchData } from "@/lib/serverscreen";
import { getFetchData } from "@/tanstack/dashboard/serverscreen";
import React from "react";

interface PostProps {
  id?: number;
  name?: string;
  title?: string;
  body?: string;
}

// export const dynamic = "force-dynamic";
const PostsPage = async () => {
  const url: string = "https://jsonplaceholder.typicode.com/posts";
  const options: { cache: string } = { cache: "no-store" };
  const { data, error } = await getFetchData(url, options);

  //   if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error as string}</p>;

  return (
    <div>
      <h1>Client-side Fetched Posts with React Query</h1>
      <ul>
        {data.map((post: PostProps) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
