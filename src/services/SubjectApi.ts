import axiosInstance from "./axiosInstance";

// GET all subjects
export const getSubjects = async () => {
  const res = await axiosInstance.get("/subjects/get-subjects");
  return res.data;
};

// ADD subject
export const addSubject = async (subject_name: string) => {
  const res = await axiosInstance.post("/subjects/post-subjects", {
    subject_name,
  });

  return res.data;
};

// UPDATE subject
export const updateSubject = async (id: number, subject_name: string) => {
  const res = await axiosInstance.put(`/subjects/put-subjects/${id}`, {
    subject_name,
  });

  return res.data;
};

// DELETE subject
export const deleteSubject = async (id: number) => {
  const res = await axiosInstance.delete(`/subjects/delete-subjects/${id}`);

  return res.data;
};
