import axiosInstance from "./axiosInstance";

// GET all classes
export const getClasses = async () => {
  const res = await axiosInstance.get("/classes/get-classes");
  return res.data;
};

// ADD class
export const addClass = async (class_name: number) => {
  const res = await axiosInstance.post("/classes/post-classes", {
    class_name,
  });

  return res.data;
};

// UPDATE class
export const updateClass = async (id: number, class_name: string) => {
  const res = await axiosInstance.put(`/classes/put-classes/${id}`, {
    class_name,
  });

  return res.data;
};

// DELETE class
export const deleteClass = async (id: number) => {
  const res = await axiosInstance.delete(`/classes/delete-classes/${id}`);
  return res.data;
};

// GET class stats
export const getClassStats = async () => {
  const res = await axiosInstance.get("/classes/class-stats");
  return res.data;
};

