import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:5000';


export const login = async (userData) => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/v3/login`;

  try {
    const { status, data: { accessToken, user } } = await axios.post(LOGIN_ENDPOINT, userData);

    if (status === 200 && accessToken) {
      localStorage.setItem('token', accessToken);
      localStorage.setItem('userId', user.id);
      return user;
    }
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export const getEligibility = async (userData) => {
  const ELIGIBILITY_ENDPOINT = `${SERVER_URL}/v3/eligibility`;

  try {
    const { data } = await axios.post(ELIGIBILITY_ENDPOINT, userData);
    return data;
  } catch (error) {
    throw error;
  }
};
