import axiosInstance from "../services/axiosInstance";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentsApi";

jest.mock("../services/axiosInstance");

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("studentsApi", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // GET
  test("getStudents returns students list", async () => {

    const mockData = [
      {
        student_id: 1,
        name: "John",
      },
    ];

    mockedAxios.get.mockResolvedValue({
      data: mockData,
    });

    const result = await getStudents();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "/students/get-students"
    );

    expect(result).toEqual(mockData);
  });

  // ADD
  test("addStudent creates student", async () => {

    const mockResponse = {
      data: {
        message: "Student added",
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await addStudent(
      "John",
      "john@test.com",
      "9999999999",
      1,
      2
    );

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/students/post-students",
      {
        name: "John",
        email: "john@test.com",
        phone: "9999999999",
        class_id: 1,
        section_id: 2,
      }
    );

    expect(result).toEqual(mockResponse.data);
  });

  // UPDATE
  test("updateStudent updates student", async () => {

    const mockResponse = {
      data: {
        message: "Updated",
      },
    };

    mockedAxios.put.mockResolvedValue(mockResponse);

    const result = await updateStudent(
      1,
      1,
      2,
      "John",
      "john@test.com",
      "9999999999"
    );

    expect(mockedAxios.put).toHaveBeenCalledWith(
      "/students/put-students/1",
      {
        class_id: 1,
        section_id: 2,
        name: "John",
        email: "john@test.com",
        phone: "9999999999",
      }
    );

    expect(result).toEqual(mockResponse.data);
  });

  // DELETE
  test("deleteStudent deletes student", async () => {

    const mockResponse = {
      data: {
        message: "Deleted",
      },
    };

    mockedAxios.delete.mockResolvedValue(mockResponse);

    const result = await deleteStudent(1);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      "/students/delete-students/1"
    );

    expect(result).toEqual(mockResponse.data);
  });

});