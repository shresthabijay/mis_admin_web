import { axiosInstance } from "./axiosInterceptor";

export const uploadFile = payload => {
  return axiosInstance.post("upload", payload);
};

export const doLogin = payload => {
  return axiosInstance.post("login", payload);
};

//streams

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


//course

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

//teachers

export const addTeacher = payload => {
  return axiosInstance.post("teacher", payload);
};

export const updateTeacher = (id, payload) => {
  return axiosInstance.put(`teacher/${id}`, payload);
};

export const deleteTeacher = id => {
  return axiosInstance.delete(`teacher/${id}`);
};

export const getTeachers = () => {
  return axiosInstance.get("teacher");
};

//users

export const addUser = payload => {
  return axiosInstance.post("user", payload);
};

export const updateUser = (id, payload) => {
  return axiosInstance.put(`user/${id}`, payload);
};

export const deleteUser = id => {
  return axiosInstance.delete(`user/${id}`);
};

export const getUsers = () => {
  return axiosInstance.get("user");
};

//reset user password

export const resetUserPassword = (payload) => {
  return axiosInstance.post("reset_password", payload);
}

// roles

export const getAllAvailableRoles = () => {
  return axiosInstance.get('roles')
}
