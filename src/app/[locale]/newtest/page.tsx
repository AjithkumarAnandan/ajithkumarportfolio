// app/ssr/page.js
export const dynamic = "force-dynamic";

export default async function SSRPage() {
  const time = new Date().toISOString();

  return (
    <main>
      <h1>SSR Page</h1>
      <p>Request time: {time}</p>
    </main>
  );
}
