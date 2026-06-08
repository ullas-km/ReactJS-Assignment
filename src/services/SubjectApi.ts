import axiosInstance from "./axiosInstance";

// GET all subjects
export const getSubjects = async () => {
  try {
    const res = await axiosInstance.get("/subjects/get-subjects");
    return res.data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};

// ADD subject
export const addSubject = async (subject_name: string) => {
  try {
    const res = await axiosInstance.post("/subjects/post-subjects", {
      subject_name,
    });

    return res.data;
  } catch (error) {
    console.error("Error adding subject:", error);
    throw error;
  }
};

// UPDATE subject
export const updateSubject = async (id: number, subject_name: string) => {
  try {
    const res = await axiosInstance.put(`/subjects/put-subjects/${id}`, {
      subject_name,
    });

    return res.data;
  } catch (error) {
    console.error("Error updating subject:", error);
    throw error;
  }
};

// DELETE subject
export const deleteSubject = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/subjects/delete-subjects/${id}`);

    return res.data;
  } catch (error) {
    console.error("Error deleting subject:", error);
    throw error;
  }
};
