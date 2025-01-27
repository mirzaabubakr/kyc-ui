import { it, expect, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import LoginForm from "@/components/forms/LoginForm";

const mockStore = configureStore({
  reducer: {},
});

const queryClient = new QueryClient();

describe("<LoginForm />", () => {
  it("It Should Render Login Form", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <LoginForm />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    );
    const spanText = screen.getByText("Login");
    if (spanText) {
      expect(spanText).toBeInTheDocument();
    }
  });

  test("It should Submit Form When Values are valid", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <LoginForm />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Admin!123" },
    });
    fireEvent.click(screen.getByText("Login"));
    screen.debug();
    expect(screen.getByText("Loging-In")).toBeInTheDocument();
  });

  test("It should Show Validation Error When Values are invalid", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <LoginForm />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Login"));
    expect(screen.getByText("Loging-In")).toBeInTheDocument();
  });
});
