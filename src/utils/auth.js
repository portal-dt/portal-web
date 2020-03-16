import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:3000';


export const login = async (userData) => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/login`;

  try {
    const { status, data: { token } } = await axios.post(LOGIN_ENDPOINT, userData);

    if (status === 200 && token) {
      localStorage.setItem("access_token", token);
      // localStorage.setItem("expire_at", expireAt);
    }
  } catch (error) {
    throw error;
  }
};
