import { render, screen, waitFor } from "@testing-library/react";
import ProductDetailPage from "./ProductDetailPage";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { vi } from "vitest";

// ✅ ۱. Mock useParams برای اینکه productId مشخص داشته باشیم
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ productId: "1" }),
    useNavigate: () => vi.fn(),
    useLocation: () => ({ state: {} }),
  };
});

// ✅ ۲. Mock fetch برای جلوگیری از تماس واقعی API
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 1,
          title: "Test Product",
          category: "electronics",
          price: 99.99,
          description: "A great product for testing",
          image: "https://via.placeholder.com/150",
        }),
    })
  );
});

afterAll(() => {
  vi.restoreAllMocks();
});

const mockStore = configureStore([]);

describe("ProductDetailPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] },
    });
  });

  test("renders product details correctly", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductDetailPage />
        </BrowserRouter>
      </Provider>
    );

    // ✅ صبر کن تا fetch کامل بشه و Loading حذف بشه
    await waitFor(() =>
      expect(screen.getByText(/Test Product/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/\$99.99/i)).toBeInTheDocument();
    expect(screen.getByText(/ELECTRONICS/i)).toBeInTheDocument();
    expect(screen.getByText(/A great product for testing/i)).toBeInTheDocument();
  });
});
