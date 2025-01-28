import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import configureStore from "redux-mock-store";
import { UserService } from "@/api/services";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { vi } from "vitest";
import { BrowserRouter } from "react-router";
import AdminPanel from "@/pages/admin-panel/AdminPanel";

// Mocking necessary dependencies
vi.mock("jwt-decode", () => ({
  jwtDecode: vi.fn(() => ({ role: "admin" })),
}));

// Mocking UserService with the appropriate methods
vi.mock("@/api/services", () => ({
  UserService: {
    getDetails: vi.fn(),
    getUser: vi.fn(() => ({ id: 1, name: "Test User" })),
  },
}));

vi.mock("@/hooks/redux-hooks", () => ({
  useAppDispatch: vi.fn(),
}));

// Mocking useAppDispatch and useAppSelector
vi.mock("@/hooks/redux-hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(() => ({
    users: [], // Mock the state you expect to get from the selector
  })),
}));

const mockStore = configureStore([]);
const queryClient = new QueryClient();

describe("AdminPanel", () => {
  let store: any;
  let dispatch: any;

  beforeEach(() => {
    store = mockStore({
      users: [],
    });
    dispatch = vi.fn();
    (useAppDispatch as unknown as any).mockReturnValue(dispatch);
  });

  it("renders loading state initially", () => {
    (UserService.getDetails as any).mockResolvedValueOnce({
      kycs: [],
      totalUsers: 0,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AdminPanel />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
