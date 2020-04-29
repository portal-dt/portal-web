import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/v3';
const axiosConfig = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
};

export const getDocumentsByCustomerId = async (customerId) => {
  try {
    const { data: { documents } } = await axios.get(`${BASE_URL}/archive/documents/${customerId}?content=true`, axiosConfig);

    return documents.map(({ documentId, type, openedAt, invoiceDate, invoiceNumber, file }) => ({
      documentId,
      documentNumber: invoiceNumber,
      documentType: type,
      creationDate: invoiceDate,
      openedAt: openedAt,
      document: file
    }));
  } catch (e) {
    console.log(e); // todo
    return [];
  }
};

export const getLatestDocumentsByCustomerId = async (customerId) => {
  try {
    const { data: { documents } } = await axios.get(`${BASE_URL}/archive/documents/latest/${customerId}?content=true`, axiosConfig);

    return documents.map(({ type, openedAt, invoiceDate, dueDate, file, referenceNumber, isDirectDebit, dueDateAmount }) => ({
      documentType: type,
      creationDate: invoiceDate,
      openedAt: openedAt,
      dueDate,
      referenceNumber,
      isDirectDebit,
      dueDateAmount,
      document: file
    }));
  } catch (e) {
    console.log(e); // todo
    return [];
  }
};

export const getDocuments = async () => {
  try {
    const { data: { documents } } = await axios.get(`${BASE_URL}/archive/documents?content=true`, axiosConfig);

    return documents.map(({ documentId, type, openedAt, invoiceDate, invoiceNumber, file, userName, email }) => ({
      documentId,
      documentNumber: invoiceNumber,
      documentType: type,
      creationDate: invoiceDate,
      openedAt,
      document: file,
      customerName: userName,
      email
    }));
  } catch (e) {
    console.log(e); // todo
    return [];
  }
};

export const getCustomers = async () => {
  try {
    const { data: { customers } } = await axios.get(`${BASE_URL}/archive/customers`, axiosConfig);
    return customers;
  } catch (e) {
    console.log(e); // todo
    return [];
  }
};

export const updateUser = async (userId, userData) => {
  try {
    return await axios.put(`http://127.0.0.1:5000/v3/users/${userId}`, userData, axiosConfig);
  } catch (e) {
    console.log(e.response); // todo
    return e.response;
  }
};

export const updateViewedDocument = async (documentId) => {
  try {
    await axios.put(
      `${BASE_URL}/archive/document`,
      { documentId, openedAt: new Date() },
      axiosConfig
    );
    return { documentId, openedAt: new Date() };
  } catch (e) {
    console.log(e); // todo
  }
};

export const getUser = async (isIdentifier = false) => {
  try {
    const userId = localStorage.getItem('userId');
    const { data: { user } } = await axios.get(
      `${BASE_URL}/users/${userId}${isIdentifier ? '?ssn=true' : ''}`,
      axiosConfig
    );
    localStorage.setItem('userId', user.id);
    return user;
  } catch (e) {
    console.log(e); // todo
  }
};