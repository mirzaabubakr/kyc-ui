import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import KYCForm from "@/components/forms/KYCForm";

// Mock the Redux hook
vi.mock("@/hooks/redux-hooks", () => ({
  useAppDispatch: vi.fn(),
}));

// Mock the action and Redux state management
vi.mock("@/actions/addDetails", () => ({
  addDetailsAction: vi.fn(() => ({
    data: { name: "John Doe", gender: "male" },
    error: {},
  })),
}));

vi.mock("@/states/reducers/authSlice", () => ({
  setUserDetails: vi.fn(),
}));

describe("KYCForm", () => {
  beforeEach(() => {
    // Clear previous calls before each test
    vi.clearAllMocks();
  });

  it("should render the form correctly", () => {
    render(<KYCForm setOpen={vi.fn()} />);

    // Check if file input, gender select, and submit button are in the document
    expect(screen.getByLabelText(/upload file/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Gender/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should display file input value when a file is selected", async () => {
    render(<KYCForm setOpen={vi.fn()} />);

    const fileInput = screen.getByLabelText(/upload file/i) as HTMLInputElement;
    const file = new File(["test"], "test-file.png", { type: "image/png" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => expect(fileInput.files![0].name).toBe("test-file.png"));
  });

  it("should display error messages if any form field has errors", () => {
    vi.mock("@/actions/addDetails", () => ({
      addDetailsAction: vi.fn(() => ({
        data: null,
        error: {
          document: ["File is required"],
          gender: ["Gender is required"],
        },
      })),
    }));

    render(<KYCForm setOpen={vi.fn()} />);

    // Trigger the submit without filling the form
    fireEvent.click(screen.getByText("Submit"));

    // Check for error messages
    expect(screen.getByText(/file is required/i)).toBeInTheDocument();
    expect(screen.getByText(/gender is required/i)).toBeInTheDocument();
  });
});
