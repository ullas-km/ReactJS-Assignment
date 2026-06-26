import axiosInstance from "./axiosInstance";

export const changePassword = async (
  user_id: number,
  currentPassword: string,
  newPassword: string
) => {
  const res = await axiosInstance.put("/users/change-password", {
    user_id,
    currentPassword,
    newPassword,
  });
  return res.data;
};