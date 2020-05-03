import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:5000';


export const login = async (userData) => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/v3/login`;

  try {
    const { status, data: { accessToken, auth, user } } = await axios.post(LOGIN_ENDPOINT, userData);

    if (status === 200 && accessToken) {
      localStorage.setItem('token', accessToken);
      localStorage.setItem('userId', user.id);
      return {
        user,
        isAuthenticated: auth
      };
    }
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export const authenticateViaBankId = async (transactionId) => {
  try {
    const {
      data: {
        providerInfo: {
          noBankIDAuth: {
            completionData
          }
        }
      }
    } = await axios.get(
      `https://testbed-eid.scrive.com/api/v1/transaction/${transactionId}`,
      {
        headers: {
          'Authorization': 'Bearer aa1c2854-6627-48b5-8efb-74ff0bfc5d3d.0440cdff-9602-43b6-9706-a9cb54b9614c'
        }
      }
    );

    localStorage.setItem('userId', completionData.ssn);

  } catch (e) {
    logout();
    window.location.replace('/login');
  }
};

export const getBankIdUrl = async () => {
  try {
    const { data: { accessUrl } } = await axios.post('https://testbed-eid.scrive.com/api/v1/transaction/new', {
        redirectUrl: "http://localhost:8080/dashboard",
        provider: "noBankID",
        method: "auth"
      },
      { headers: {
          'Authorization': 'Bearer aa1c2854-6627-48b5-8efb-74ff0bfc5d3d.0440cdff-9602-43b6-9706-a9cb54b9614c'
        } });

    return accessUrl;
  } catch (e) {
    console.log(e);
  }
};
