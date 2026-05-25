import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import TeachersSummary from "../components/TeachersSummary";

import * as teacherApi from "../services/TeacherApi";

jest.mock("../services/TeacherApi");

describe("TeachersSummary", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders teacher stats", async () => {

    (teacherApi.getTeacherStats as jest.Mock)
      .mockResolvedValue({
        total: 25,
        active: 20,
      });

    render(<TeachersSummary />);

    expect(
      screen.getByText("Teachers Dashboard")
    ).toBeInTheDocument();

    await waitFor(() => {

      expect(
        screen.getByText("25")
      ).toBeInTheDocument();

      expect(
        screen.getByText("20")
      ).toBeInTheDocument();

    });
  });

}); 