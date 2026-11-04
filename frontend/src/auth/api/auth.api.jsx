import axios from "axios";

export const login = async ({ email, password }) => {
  const res = await axios.post("/api/v1/auth/login", {
    email,
    password,
  }, {
    withCredentials: true,
  });
  return res.data;
};


export const register = async ({name, email, password }) => {
  const res = await axios.post("/api/v1/auth/register", {
    name,
    email,
    password,
  }, {
    withCredentials: true,
  });
  return res.data;
};
export const loginWithGoogle = async (credential) => {
  const { data } = await axios.post("/api/v1/auth/google-login", {
    credential,
  });

  return data;
};
