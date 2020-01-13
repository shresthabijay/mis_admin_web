import { axiosInstance } from "./axiosInterceptor";

export const uploadFile = payload => {
  return axiosInstance.post("upload", payload);
};

export const doLogin = payload => {
  return axiosInstance.post("login", payload);
};

export const addStream = payload => {
  return axiosInstance.post("stream", payload);
};

export const updateStream = (id, payload) => {
  return axiosInstance.put(`stream/${id}`, payload);
};

export const deleteStream = id => {
  return axiosInstance.delete(`stream/${id}`);
};

export const getStreams = () => {
  return axiosInstance.get("stream");
};

export const addCourse = payload => {
  return axiosInstance.post("course", payload);
};

export const updateCourse = (id, payload) => {
  return axiosInstance.put(`course/${id}`, payload);
};

export const deleteCourse = id => {
  return axiosInstance.delete(`course/${id}`);
};


export const getCourses = () => {
  return axiosInstance.get("course");
};

export const getUsers = () => {
  return axiosInstance.get("user");
};

export const getStores = () => { }

export const addUser = payload => {
  return axiosInstance.post("user", payload);
};
export const addStore = payload => {
  return axiosInstance.post("store", payload);
};
export const getRoles = () => {
  return axiosInstance.get("view_user_role");
};

export const assignRoles = payload => {
  return axiosInstance.post("assign_role", payload);
};

export const deleteUser = user_id => {
  return axiosInstance.delete("user/" + user_id);
};
export const deleteStore = id => {
  return axiosInstance.delete("store/" + id);
};

export const resetUser = id => {
  return axiosInstance.post("reset_password", { user_id: id });
};

export const getMyStores = () => {
  return axiosInstance.get("store");
};

export const getStoreSupplier = store_id => {
  return axiosInstance.get("supplier/" + store_id);
};

export const getStoreProduct = store_id => {
  return axiosInstance.get("product/" + store_id);
};

export const addSupplier = payload => {
  return axiosInstance.post("supplier", payload);
};

export const addProduct = payload => {
  return axiosInstance.post("product", payload);
};
