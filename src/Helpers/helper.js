import { notification } from "antd";

export const getDetailsFromLocalStorage = () => {
  const data = localStorage.getItem("login_details");
  if (data) return JSON.parse(data);
  return { name: null };
};

export const displayAllError = err => {
  const keys = Object.keys(err);
  keys.forEach(item => {
    notification.error({
      message: err[item],
      duration: 5
    });
  });
};
