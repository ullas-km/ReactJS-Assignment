import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";

vi.mock("../routes/AppRoutes", () => ({
  default: () => <div>Mock App Routes</div>,
}));

describe("App", () => {
  it("renders BrowserRouter with AppRoutes", () => {
    render(<App />);

    expect(screen.getByText("Mock App Routes")).toBeInTheDocument();
  });
});