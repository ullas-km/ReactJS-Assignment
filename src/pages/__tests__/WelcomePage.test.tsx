import { render, screen } from "@testing-library/react";
import WelcomePage from "../Dashboard"

describe("WelcomePage", () => {
  test("renders welcome text", () => {
    render(<WelcomePage />);

    expect(
      screen.getByText("Welcome")
    ).toBeInTheDocument();
  });
});