// import { getProducts } from "@/tanstack/dashboard/getProducts";

// import { render, screen } from "@testing-library/react";
// import { renderToPipeableStream, renderToString } from "react-dom/server";
// jest.mock("@/tanstack/dashboard/getProducts"); // mock the module
// import "@testing-library/jest-dom";
// import CRUD from "./page";

// export type Product = {
//   id: number; // unique identifier for the product
//   name: string; // product name
//   price?: number; // optional price
//   description?: string; // optional description
//   image?: string; // optional image URL
//   category?: string; // optional category
// };

// const mockedGetProducts = getProducts as jest.MockedFunction<
//   typeof getProducts
// >;

// describe("getProducts server function", () => {
//   it("returns data when successful", async () => {
//     const mockData: Product[] = [{ id: 1, name: "Product 1" }];
//     mockedGetProducts.mockResolvedValue({
//       data: mockData,
//       error: null,
//     });

//     const { data, error } = await getProducts("/api/dashboard");

//     expect(error).toBeNull();
//     expect(data).toHaveLength(1);
//     expect((data as Product[])![0].name).toBe("Product 1");
//   });

//   it("returns error when fails", async () => {
//     const fetchError = new Error("API failed");
//     mockedGetProducts.mockResolvedValue({
//       data: null,
//       error: fetchError as unknown as string,
//     });

//     const { data, error } = await getProducts("/api/dashboard");

//     expect(data).toBeNull();
//     expect(error).toBe(fetchError);
//   });
// });

// describe("check if h1 text field products", () => {
//   // it("check h1", async () => {
//   //   const html = renderToString(<CRUD />);
//   //   expect(html).toContain("Products");
//   //   // const heading = await screen.findByRole("heading", { level: 1 });
//   //   // expect(heading).toHaveTextContent(/products/i);
//   // });
//   it("shows Products heading", async () => {
//     await render(<CRUD />);
//     const heading = await screen.getByRole("heading", { level: 1 });

//     expect(heading).toBeInTheDocument();
//   });
// });
