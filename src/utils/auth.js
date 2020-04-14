import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:5000';


export const login = async (userData) => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/v3/login`;

  try {
    const { status, data: { accessToken, auth, user } } = await axios.post(LOGIN_ENDPOINT, userData);

    if (status === 200 && accessToken) {
      localStorage.setItem('token', accessToken);
      return {
        user,
        isAuthenticated: auth
      };
    }
  } catch (error) {
    throw error;
  }
};

export const logout = () => localStorage.removeItem('token');
