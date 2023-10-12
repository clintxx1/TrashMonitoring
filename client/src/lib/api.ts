import axios from "./axios";

export const register = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/register`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
