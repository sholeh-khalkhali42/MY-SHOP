import "@testing-library/jest-dom/vitest"; // 👈 حتما بالاتر از همه
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import configureStore from "redux-mock-store";
import ProductsPage from "./ProductsPage";

const mockStore = configureStore([]);

vi.mock("./productsSlice", () => ({
  fetchProducts: vi.fn(() => ({ type: "products/fetch" })),
  selectAllProducts: (state) => state.products.items,
}));

vi.mock("../cart/cartSlice", () => ({
  addToCart: vi.fn((product) => ({ type: "cart/add", payload: product })),
}));

describe("ProductsPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: {
        loading: false,
        items: [
          {
            id: 1,
            title: "Test Product 1",
            price: 20,
            category: "electronics",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 2,
            title: "Another Product",
            price: 50,
            category: "clothing",
            image: "https://via.placeholder.com/150",
          },
        ],
      },
      cart: { items: [] },
    });
  });

  it("renders without crashing and shows featured products", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
  });

  it("shows products and allows searching", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>
      </Provider>
    );

    // چون slick چند تا clone می‌سازه، باید از getAllByText استفاده کنیم
    expect(screen.getAllByText(/Test Product 1/i).length).toBeGreaterThan(0);

    const searchInput = screen.getByPlaceholderText(/Search products/i);
    fireEvent.change(searchInput, { target: { value: "Another" } });
    fireEvent.submit(searchInput);

    expect(screen.getAllByText(/Another Product/i).length).toBeGreaterThan(0);
  });

  it("dispatches addToCart when Add to Cart clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getAllByText(/Add to Cart/i)[0];
    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions.some((a) => a.type === "cart/add")).toBe(true);
  });
});
