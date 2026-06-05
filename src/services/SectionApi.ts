import axiosInstance from "./axiosInstance";

// GET ALL
export const getSections = async () => {
  const res = await axiosInstance.get("/sections/get-sections");
  return res.data;
};

// ADD
export const addSection = async (section_name: string, class_id: number) => {
  const res = await axiosInstance.post("/sections/post-sections", {
    section_name,
    class_id,
  });

  return res.data;
};

// UPDATE
export const updateSection = async (
  id: number,
  section_name: string,
  class_id: number,
) => {
  const res = await axiosInstance.put(`/sections/put-sections/${id}`, {
    section_name,
    class_id,
  });

  return res.data;
};

// DELETE
export const deleteSection = async (id: number) => {
  const res = await axiosInstance.delete(`/sections/delete-sections/${id}`);

  return res.data;
};
