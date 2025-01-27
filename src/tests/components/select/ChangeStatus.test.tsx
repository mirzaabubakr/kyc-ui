import { it, expect, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ChangeStatus from "@/components/select/ChangeStatus";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

const cell = {
  row: {
    original: {
      id: "1",
      status: "pending",
    },
  },
};

const mockStore = configureStore({
  reducer: {},
});

const queryClient = new QueryClient();

describe("<ChangeStatus />", () => {
  it("It Should Render Select when Cell Prop is Provided", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <ChangeStatus cell={cell} />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    );
    const spanText = screen.getByText("pending");
    if (spanText) {
      expect(spanText).toBeInTheDocument();
    }
  });

  test("changes status on select", () => {
    render(
      <Provider store={mockStore}>
        <QueryClientProvider client={queryClient}>
          <ChangeStatus cell={cell} />
        </QueryClientProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText("pending"));
    fireEvent.click(screen.getByText("Approved"));
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });
});
