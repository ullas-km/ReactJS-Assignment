// MonthlyAttendanceReport.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MonthlyAttendanceReport from "../pages/MonthlyAttendanceReport";
import { getClasses } from "../services/ClassesApi";
import { getSectionsByClass } from "../services/SectionApi";
import { getStudentsByClassSection } from "../services/studentsApi";
import { getMonthlyReport } from "../services/attendanceApi";
import { vi } from "vitest";

vi.mock("../services/ClassesApi");
vi.mock("../services/SectionApi");
vi.mock("../services/studentsApi");
vi.mock("../services/attendanceApi");

describe("MonthlyAttendanceReport", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders classes dropdown and loads classes", async () => {
    (getClasses as vi.Mock).mockResolvedValue([
      { class_id: 1, class_name: "Class A" },
      { class_id: 2, class_name: "Class B" },
    ]);

    render(<MonthlyAttendanceReport />);

    await waitFor(() => {
      expect(screen.getByText("Class A")).toBeInTheDocument();
      expect(screen.getByText("Class B")).toBeInTheDocument();
    });
  });

  it("loads sections when class is selected", async () => {
    (getClasses as vi.Mock).mockResolvedValue([{ class_id: 1, class_name: "Class A" }]);
    (getSectionsByClass as vi.Mock).mockResolvedValue([
      { section_id: 10, section_name: "Section X" },
    ]);

    render(<MonthlyAttendanceReport />);

    await waitFor(() => screen.getByText("Class A"));

    // First select is Class
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "1" } });

    await waitFor(() => {
      expect(screen.getByText("Section X")).toBeInTheDocument();
    });
  });

  it("loads students when section is selected", async () => {
    (getClasses as vi.Mock).mockResolvedValue([{ class_id: 1, class_name: "Class A" }]);
    (getSectionsByClass as vi.Mock).mockResolvedValue([{ section_id: 10, section_name: "Section X" }]);
    (getStudentsByClassSection as vi.Mock).mockResolvedValue([
      { student_id: 100, name: "John Doe" },
    ]);

    render(<MonthlyAttendanceReport />);

    await waitFor(() => screen.getByText("Class A"));
    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], { target: { value: "1" } }); // Class
    await waitFor(() => screen.getByText("Section X"));

    fireEvent.change(selects[1], { target: { value: "10" } }); // Section
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("generates report when all fields are selected", async () => {
    (getClasses as vi.Mock).mockResolvedValue([{ class_id: 1, class_name: "Class A" }]);
    (getSectionsByClass as vi.Mock).mockResolvedValue([{ section_id: 10, section_name: "Section X" }]);
    (getStudentsByClassSection as vi.Mock).mockResolvedValue([{ student_id: 100, name: "John Doe" }]);
    (getMonthlyReport as vi.Mock).mockResolvedValue({
      total: 20,
      present: 15,
      percentage: 75,
    });

    render(<MonthlyAttendanceReport />);

    await waitFor(() => screen.getByText("Class A"));
    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], { target: { value: "1" } }); // Class
    await waitFor(() => screen.getByText("Section X"));

    fireEvent.change(selects[1], { target: { value: "10" } }); // Section
    await waitFor(() => screen.getByText("John Doe"));

    fireEvent.change(selects[2], { target: { value: "100" } }); // Student

    fireEvent.change(screen.getByPlaceholderText("Month (1-12)"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByPlaceholderText("Year"), {
      target: { value: "2026" },
    });

    fireEvent.click(screen.getByText("Generate Report"));

    await waitFor(() => {
      expect(screen.getByText("20")).toBeInTheDocument();
      expect(screen.getByText("15")).toBeInTheDocument();
      expect(screen.getByText("75.00%")).toBeInTheDocument();
      expect(screen.getByText("✅ Good Standing")).toBeInTheDocument();
    });
  });
});
