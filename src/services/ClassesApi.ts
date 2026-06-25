import axiosInstance from "./axiosInstance";

// GET all classes
export const getClasses = async () => {
  try {
    const res = await axiosInstance.get("/classes/get-classes");
    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

// ADD class
export const addClass = async (class_name: number) => {
  try {
    const res = await axiosInstance.post("/classes/post-classes", {
      class_name,
    });

    return res.data;
  } catch (error) {
    console.error("Error adding class:", error);
    throw error;
  }
};

// UPDATE class
export const updateClass = async (id: number, class_name: string) => {
  try {
    const res = await axiosInstance.put(`/classes/put-classes/${id}`, {
      class_name,
    });

    return res.data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};

// DELETE class
export const deleteClass = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/classes/delete-classes/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};

// GET class stats
export const getClassStats = async () => {
  try {
    const res = await axiosInstance.get("/classes/class-stats");
    return res.data;
  } catch (error) {
    console.error("Error fetching class stats:", error);
    throw error;
  }
};
