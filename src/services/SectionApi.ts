import axiosInstance from "./axiosInstance";

// GET ALL
export const getSections = async () => {
  try {
    const res = await axiosInstance.get("/sections/get-sections");
    return res.data;
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }
};

// ADD
export const addSection = async (section_name: string, class_id: number) => {
  try {
    const res = await axiosInstance.post("/sections/post-sections", {
      section_name,
      class_id,
    });

    return res.data;
  } catch (error) {
    console.error("Error adding section:", error);
    throw error;
  }
};
// GET SECTIONS BY CLASS
export const getSectionsByClass = async (classId: number) => {
  try {
    const res = await axiosInstance.get(
      `/sections/get-classes/${classId}/sections`
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching sections by class:", error);
    throw error;
  }
};

// UPDATE
export const updateSection = async (
  id: number,
  section_name: string,
  class_id: number,
) => {
  try {
    const res = await axiosInstance.put(`/sections/put-sections/${id}`, {
      section_name,
      class_id,
    });

    return res.data;
  } catch (error) {
    console.error("Error updating section:", error);
    throw error;
  }
};

// DELETE
export const deleteSection = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/sections/delete-sections/${id}`);

    return res.data;
  } catch (error) {
    console.error("Error deleting section:", error);
    throw error;
  }
};
